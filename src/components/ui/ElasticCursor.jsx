import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

function useTicker(callback, paused) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

function useInstance(create) {
  const ref = useRef(null);
  if (ref.current === null) ref.current = create();
  return ref.current;
}

function getScale(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;

const CURSOR_DIAMETER = 50;
const WRAP_PADDING = 8;
const WRAP_RADIUS = 12;
const WRAP_EASE = 0.2;
const TARGET_PULL = 0.35;
const TARGET_EASE = 0.25;
const TARGET_MAX_PULL = 12;
const CURSOR_PARALLAX = 0.12;
const CURSOR_MAX_LEAD = 10;

const wrapsTarget = true;
const movesTarget = true;

function measure(el) {
  const r = el.getBoundingClientRect();
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
    cx: r.left + r.width / 2,
    cy: r.top + r.height / 2,
  };
}

export default function ElasticCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const jellyRef = useRef(null);
  const dotRef = useRef(null);

  const [cursorMoved, setCursorMoved] = useState(false);
  const cursorMovedRef = useRef(false);
  const isHiddenRef = useRef(false);

  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const pointer = useInstance(() => ({ x: 0, y: 0 }));
  const jelly = useInstance(() => ({
    x: 0,
    y: 0,
    w: CURSOR_DIAMETER,
    h: CURSOR_DIAMETER,
    r: CURSOR_DIAMETER / 2,
    sx: 1,
    sy: 1,
  }));
  const active = useInstance(() => ({
    el: null,
    base: null,
    offX: 0,
    offY: 0,
  }));
  const set = useInstance(() => ({}));

  useLayoutEffect(() => {
    const jellyEl = jellyRef.current;
    const dotEl = dotRef.current;
    if (!jellyEl || !dotEl) return;
    gsap.set(jellyEl, { xPercent: -50, yPercent: -50 });
    gsap.set(dotEl, { xPercent: -50, yPercent: -50 });
    set.x = gsap.quickSetter(jellyEl, "x", "px");
    set.y = gsap.quickSetter(jellyEl, "y", "px");
    set.r = gsap.quickSetter(jellyEl, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyEl, "scaleX");
    set.sy = gsap.quickSetter(jellyEl, "scaleY");
    set.width = gsap.quickSetter(jellyEl, "width", "px");
    set.height = gsap.quickSetter(jellyEl, "height", "px");
    set.radius = gsap.quickSetter(jellyEl, "borderRadius", "px");
    set.opacity = gsap.quickSetter(jellyEl, "opacity");
    set.dotX = gsap.quickSetter(dotEl, "x", "px");
    set.dotY = gsap.quickSetter(dotEl, "y", "px");
    set.dotOpacity = gsap.quickSetter(dotEl, "opacity");
  }, [isMobile]);

  const render = useCallback(() => {
    if (!set.x) return;

    set.dotX(pointer.x);
    set.dotY(pointer.y);

    const el = active.el;
    const wrapping = !!el && wrapsTarget;
    const moveTarget = !!el && movesTarget;
    const hidden = isHiddenRef.current;

    if (moveTarget && el && active.base) {
      const b = active.base;
      const pullX = clamp(
        (pointer.x - b.cx) * TARGET_PULL,
        -TARGET_MAX_PULL,
        TARGET_MAX_PULL,
      );
      const pullY = clamp(
        (pointer.y - b.cy) * TARGET_PULL,
        -TARGET_MAX_PULL,
        TARGET_MAX_PULL,
      );
      active.offX = lerp(active.offX, pullX, TARGET_EASE);
      active.offY = lerp(active.offY, pullY, TARGET_EASE);
      gsap.set(el, { x: active.offX, y: active.offY });
    }

    if (wrapping && active.base) {
      const b = active.base;
      const leadX = clamp(
        (pointer.x - b.cx) * CURSOR_PARALLAX,
        -CURSOR_MAX_LEAD,
        CURSOR_MAX_LEAD,
      );
      const leadY = clamp(
        (pointer.y - b.cy) * CURSOR_PARALLAX,
        -CURSOR_MAX_LEAD,
        CURSOR_MAX_LEAD,
      );
      const tx = b.cx + active.offX + leadX;
      const ty = b.cy + active.offY + leadY;
      jelly.x = lerp(jelly.x, tx, WRAP_EASE);
      jelly.y = lerp(jelly.y, ty, WRAP_EASE);
      jelly.w = lerp(jelly.w, b.width + WRAP_PADDING * 2, WRAP_EASE);
      jelly.h = lerp(jelly.h, b.height + WRAP_PADDING * 2, WRAP_EASE);
      jelly.r = lerp(jelly.r, WRAP_RADIUS, WRAP_EASE);
      jelly.sx = lerp(jelly.sx, 1, 0.3);
      jelly.sy = lerp(jelly.sy, 1, 0.3);
      set.x(jelly.x);
      set.y(jelly.y);
      set.width(jelly.w);
      set.height(jelly.h);
      set.radius(jelly.r);
      set.sx(jelly.sx);
      set.sy(jelly.sy);
      set.r(0);
      set.opacity(hidden ? 0 : 1);
      set.dotOpacity(0);
    } else {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);
      jelly.x = pos.x;
      jelly.y = pos.y;
      jelly.w = lerp(jelly.w, CURSOR_DIAMETER + scale * 300, 0.4);
      jelly.h = lerp(jelly.h, CURSOR_DIAMETER, 0.4);
      jelly.r = lerp(jelly.r, CURSOR_DIAMETER / 2, 0.4);
      jelly.sx = 1 + scale;
      jelly.sy = 1 - scale * 2;
      set.x(pos.x);
      set.y(pos.y);
      set.width(jelly.w);
      set.height(jelly.h);
      set.radius(jelly.r);
      set.r(rotation);
      set.sx(jelly.sx);
      set.sy(jelly.sy);
      set.opacity(hidden ? 0 : 1);
      set.dotOpacity(hidden ? 0 : 1);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!cursorMovedRef.current) {
        cursorMovedRef.current = true;
        setCursorMoved(true);
      }
      gsap.to(pos, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (e.clientX - pos.x) * 1.2;
          vel.y = (e.clientY - pos.y) * 1.2;
        },
      });

      const hide = !!e.target?.closest?.('[data-no-custom-cursor="true"]');
      isHiddenRef.current = hide;

      if (!hide) {
        document.body.style.cursor = "none";
      } else {
        document.body.style.cursor = "auto";
      }
    };
    window.addEventListener("mousemove", onMove);
    // ensure body cursor is none when active
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.style.cursor = "auto";
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const acquire = (el) => {
      gsap.killTweensOf(el);
      active.el = el;
      active.base = measure(el);
      active.offX = 0;
      active.offY = 0;
      jelly.x = pos.x;
      jelly.y = pos.y;
      if (movesTarget) el.style.willChange = "transform";
    };

    const release = () => {
      const el = active.el;
      if (el && movesTarget) {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.35)",
          clearProps: "transform",
          onComplete: () => {
            el.style.willChange = "";
          },
        });
      }
      active.el = null;
      active.base = null;
      active.offX = 0;
      active.offY = 0;
    };

    const onOver = (e) => {
      const target = e.target;
      if (target?.closest?.('[data-no-custom-cursor="true"]')) {
        if (active.el) release();
        return;
      }
      const t = target?.closest?.(".cursor-can-hover");
      if (t === active.el) return;
      if (active.el) release();
      if (t) acquire(t);
    };
    const onLeave = () => {
      if (active.el) release();
    };
    const onScroll = () => {
      if (!active.el || !active.base) return;
      const r = active.el.getBoundingClientRect();
      active.base.left = r.left - active.offX;
      active.base.top = r.top - active.offY;
      active.base.width = r.width;
      active.base.height = r.height;
      active.base.cx = active.base.left + r.width / 2;
      active.base.cy = active.base.top + r.height / 2;
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (active.el) release();
    };
  }, [isMobile]);

  useTicker(render, !cursorMoved || isMobile);
  if (isMobile) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className="jelly-blob"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          border: "1.5px solid rgba(255, 255, 255, 1)",
          pointerEvents: "none",
          willChange: "transform",
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
          borderRadius: CURSOR_DIAMETER / 2,
          boxSizing: "border-box",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      ></div>
      <div
        ref={dotRef}
        style={{
          width: "0.5rem",
          height: "0.5rem",
          backgroundColor: "white",
          borderRadius: "9999px",
          position: "fixed",
          left: 0,
          top: 0,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0,
          zIndex: 10000,
          mixBlendMode: "difference",
        }}
      ></div>
    </>
  );
}
