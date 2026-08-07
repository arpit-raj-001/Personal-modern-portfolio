import React, { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "../../data/skills";
import { useTheme } from "../../contexts/ThemeContext";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import "./KeyboardSection.css";

gsap.registerPlugin(ScrollTrigger);

const STATES = {
  hero: {
    scale: { x: 0.01, y: 0.01, z: 0.01 },
    position: { x: 0, y: 500, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
  },
  keyboard: {
    scale: { x: 0.25, y: 0.25, z: 0.25 },
    position: { x: 0, y: -40, z: 0 },
    rotation: { x: 0, y: Math.PI / 12, z: 0 },
  },
  services: {
    scale: { x: 0.25, y: 0.25, z: 0.25 },
    position: { x: 0, y: -40, z: 0 },
    rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
  },
};

const getKeyboardState = (section, isMobile) => {
  const baseTransform = STATES[section] || STATES.keyboard;
  const width = window.innerWidth;
  const targetScale = isMobile ? width / 390 : width / 1280;
  const minScale = 0.5;
  const maxScale = isMobile ? 0.6 : 1.15;
  const scaleOffset = Math.min(Math.max(targetScale, minScale), maxScale);

  let scale = {
    x: Math.abs(baseTransform.scale.x * scaleOffset),
    y: Math.abs(baseTransform.scale.y * scaleOffset),
    z: Math.abs(baseTransform.scale.z * scaleOffset),
  };
  let position = { ...baseTransform.position };
  let rotation = { ...baseTransform.rotation };

  if (isMobile) {
    scale = {
      x: 0.3 * scaleOffset,
      y: 0.3 * scaleOffset,
      z: 0.3 * scaleOffset,
    };
    if (section === "keyboard") {
      rotation.y = Math.PI / 6;
    }
  }

  return { scale, position, rotation };
};

const KeyboardScene = () => {
  const isMobile = window.innerWidth < 768;
  const { theme } = useTheme();
  const splineContainer = useRef(null);
  const [splineApp, setSplineApp] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const bongoAnimationRef = useRef(null);
  const keycapAnimationsRef = useRef(null);

  const handleMouseHover = (e) => {
    if (!splineApp || selectedSkill?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (!selectedSkill || selectedSkill.name !== e.target.name) {
        const skill = Object.values(SKILLS).find(
          (s) => s.name === e.target.name,
        );
        if (skill) {
          setSelectedSkill(skill);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!splineApp) return;
    const skill = Object.values(SKILLS).find((s) => s.name === e.target.name);
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  const handleKeyUp = () => {
    if (!splineApp) return;
    setSelectedSkill(null);
    splineApp.setVariable("heading", "");
    splineApp.setVariable("desc", "");
  };

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  const setupScrollAnimations = () => {
    if (!splineApp) return [];
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return [];

    const createSectionTimeline = (
      triggerId,
      targetSection,
      prevSection,
      start,
      end,
    ) => {
      return gsap.timeline({
        scrollTrigger: {
          trigger: triggerId,
          start,
          end,
          scrub: true,
          onEnter: () => {
            setActiveSection(targetSection);
            const state = getKeyboardState(targetSection, isMobile);
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
          },
          onLeaveBack: () => {
            setActiveSection(prevSection);
            const state = getKeyboardState(prevSection, isMobile);
            gsap.to(kbd.scale, { ...state.scale, duration: 1 });
            gsap.to(kbd.position, { ...state.position, duration: 1 });
            gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
          },
        },
      });
    };

    const heroState = getKeyboardState("hero", isMobile);
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    return [
      createSectionTimeline(
        "#keyboard-trigger",
        "keyboard",
        "hero",
        "top 80%",
        "bottom bottom",
      ),
      createSectionTimeline(
        "#keyboard-trigger",
        "services",
        "keyboard",
        "top -80%",
        "bottom bottom",
      ),
    ];
  };

  const getBongoAnimation = () => {
    const framesParent = splineApp?.findObjectByName("bongo-cat");
    const frame1 = splineApp?.findObjectByName("frame-1");
    const frame2 = splineApp?.findObjectByName("frame-2");

    if (!frame1 || !frame2 || !framesParent)
      return { start: () => {}, stop: () => {} };

    let interval;
    return {
      start: () => {
        let i = 0;
        framesParent.visible = true;
        interval = setInterval(() => {
          frame1.visible = i % 2 !== 0;
          frame2.visible = i % 2 === 0;
          i++;
        }, 100);
      },
      stop: () => {
        clearInterval(interval);
        framesParent.visible = false;
        frame1.visible = false;
        frame2.visible = false;
      },
    };
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };
    let floatTweens = [];
    let settleTweens = [];

    return {
      start: () => {
        settleTweens.forEach((t) => t.kill());
        floatTweens.forEach((t) => t.kill());
        Object.values(SKILLS)
          .sort(() => Math.random() - 0.5)
          .forEach((skill, idx) => {
            const keycap = splineApp.findObjectByName(skill.name);
            if (keycap) {
              floatTweens.push(
                gsap.to(keycap.position, {
                  y: Math.random() * 200 + 200,
                  duration: Math.random() * 2 + 2,
                  delay: idx * 0.6,
                  repeat: -1,
                  yoyo: true,
                  ease: "elastic.out(1,0.3)",
                }),
              );
            }
          });
      },
      stop: () => {
        floatTweens.forEach((t) => t.kill());
        Object.values(SKILLS).forEach((skill) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (keycap) {
            settleTweens.push(
              gsap.to(keycap.position, {
                y: 0,
                duration: 4,
                ease: "elastic.out(1,0.7)",
              }),
            );
          }
        });
      },
    };
  };

  useEffect(() => {
    if (!splineApp) return;

    splineApp.addEventListener("mouseHover", handleMouseHover);
    splineApp.addEventListener("keyDown", handleKeyDown);
    splineApp.addEventListener("keyUp", handleKeyUp);
    const timelines = setupScrollAnimations();
    bongoAnimationRef.current = getBongoAnimation();
    keycapAnimationsRef.current = getKeycapsAnimation();

    return () => {
      bongoAnimationRef.current?.stop();
      keycapAnimationsRef.current?.stop();
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, [splineApp]);

  useEffect(() => {
    if (!splineApp) return;
    const manageAnimations = async () => {
      if (activeSection === "services") {
        setTimeout(() => {
          bongoAnimationRef.current?.start();
        }, 300);
      } else {
        setTimeout(() => {
          bongoAnimationRef.current?.stop();
        }, 200);
      }
    };
    manageAnimations();
  }, [activeSection, splineApp]);

  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (kbd) {
      const currentState = getKeyboardState("keyboard", isMobile);
      gsap.fromTo(
        kbd.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        { ...currentState.scale, duration: 1.5, ease: "elastic.out(1, 0.6)" },
      );

      const allObjects = splineApp.getAllObjects();
      const keycaps = allObjects.filter((obj) => obj.name === "keycap");

      keycaps.forEach((keycap, idx) => {
        setTimeout(
          () => {
            keycap.visible = true;
            gsap.fromTo(
              keycap.position,
              { y: 200 },
              { y: 0, duration: 0.5, ease: "bounce.out" },
            );
          },
          900 + idx * 70,
        );
      });
    }
  }, [splineApp]);

  useEffect(() => {
    if (!splineApp) return;

    const setVisibility = (dDark, dLight, mDark, mLight) => {
      const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
      const textDesktopLight = splineApp.findObjectByName("text-desktop");
      const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
      const textMobileLight = splineApp.findObjectByName("text-mobile");

      if (textDesktopDark) textDesktopDark.visible = dDark;
      if (textDesktopLight) textDesktopLight.visible = dLight;
      if (textMobileDark) textMobileDark.visible = mDark;
      if (textMobileLight) textMobileLight.visible = mLight;
    };

    if (activeSection !== "keyboard" && activeSection !== "services") {
      setVisibility(false, false, false, false);
    } else if (theme === "dark") {
      isMobile
        ? setVisibility(false, false, false, true)
        : setVisibility(false, true, false, false);
    } else {
      // beige
      isMobile
        ? setVisibility(false, false, true, false)
        : setVisibility(true, false, false, false);
    }
  }, [theme, splineApp, isMobile, activeSection]);

  return (
    <div className="keyboard-scene-container">
      <div className="keyboard-ui-overlay">
        <h2
          className={`keyboard-heading ${activeSection === "keyboard" || activeSection === "services" ? "is-visible" : ""}`}
        >
          TECH STACK
        </h2>
        <p
          className={`keyboard-hint ${activeSection === "keyboard" || activeSection === "services" ? "is-visible" : ""}`}
        >
          (try pressing keysss)
        </p>
      </div>
      <Suspense
        fallback={<div className="keyboard-loader">Loading 3D Scene...</div>}
      >
        <Spline
          className="spline-canvas"
          ref={splineContainer}
          onLoad={(app) => setSplineApp(app)}
          scene="/assets/skills-keyboard.spline"
        />
      </Suspense>
    </div>
  );
};

export default function KeyboardSection() {
  return (
    <section id="keyboard-trigger" className="keyboard-section">
      <KeyboardScene />
    </section>
  );
}
