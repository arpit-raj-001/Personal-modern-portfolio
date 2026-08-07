import React, { useEffect, useRef } from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "./WorkSection.css";

function getImageUrl(name) {
  return new URL(`../../assets/${name}`, import.meta.url).href;
}

const projectData = [
  {
    title: "Medisync",
    desc: "an AI-powered healthcare platform that streamlines patient care, appointments, and medical records through a secure, connected ecosystem",
    img: "1_medisync.png",
  },
  {
    title: "Blind assistant IOT",
    desc: "A multifunctional IoT platform powered by ESP8266, integrating Morse communication, Braille conversion, alarm automation, and wireless control into a single connected system.",
    img: "2_blind_assistant.png",
  },
  {
    title: "AI resume analyzer",
    desc: "An AI-powered resume analyzer that evaluates ATS compatibility, highlights improvements, and delivers actionable feedback to optimize job applications",
    img: "3_resume_analyzer.png",
  },
  {
    title: "Research paper",
    desc: "A transformer-based semantic communication system that preserves meaning across noisy channels using channel-aware encoding and AI-driven semantic reconstruction",
    img: "4_research_paper.png",
  },
  {
    title: "autonomous driving model",
    desc: "An ML-powered autonomous driving system that leverages computer vision and sensor intelligence for autonomous driving.",
    img: "5_autonomous driving.png",
  },
  {
    title: "Multimodal semantic",
    desc: "An AI-powered surveillance system that interprets live camera feeds and generates real-time semantic alerts for critical events and anomalies",
    img: "6_multimodal_semantic.png",
  },
  {
    title: "bank churn model",
    desc: "A machine learning model that predicts customer churn, enabling banks to identify at-risk customers and improve retention strategies",
    img: "7_bank_churn_model.png",
  },
  {
    title: "football analyzer",
    desc: "An AI-powered match analysis system that uses computer vision to track gameplay, detect key events, and generate tactical insights from footage",
    img: "8_football_analyzer.png",
  },
  {
    title: "Aadz",
    desc: "A personal collection of 3 part novel written for Aadzz to admire the moments i never cherished , part time author hehe",
    img: "9_aadzz.png",
  },
  {
    title: "Bhaar-sheet",
    desc: "A pattern-driven DSA roadmap that organizes LeetCode problems into intuitive learning paths, helping students master algorithms through structured pattern recognition and deeper conceptual understanding",
    img: "10_bhaarsheet.png",
  },
  {
    title: "Comp fundamentals",
    desc: "A comprehensive placement guide covering SQL, Operating Systems, and Computer Networks with structured notes, interview concepts, and curated practice for engineering students",
    img: "11_comp_fundamentals.png",
  },
  {
    title: "placement tracker",
    desc: "A centralized platform to track applications, assessments, interviews, deadlines, and offers throughout the campus placement journey",
    img: "12_placement_tracker.png",
  },
  {
    title: "turbotype",
    desc: "A fast, distraction-free typing platform that helps users improve speed, accuracy, and consistency through real-time practice and performance analytics",
    img: "13_turbotype.png",
  },
  {
    title: "procurement agent",
    desc: "An AI-powered procurement agent that automates vendor discovery, quotation analysis, approval workflows, and purchase order generation for enterprise procurement",
    img: "14_procurement_agent.png",
  },
  {
    title: "on screen translator",
    desc: "An AI-powered screen translator that captures on-screen text and delivers instant multilingual translations using OCR and contextual language understanding",
    img: "20_translator.png",
  },
  {
    title: "workshop website",
    desc: "A centralized platform for discovering, managing, and participating in technical workshops with seamless registration, scheduling, and event updates.",
    img: "16_workshop_website.png",
  },
  {
    title: "personal WP bot",
    desc: "An AI-powered WhatsApp assistant that delivers personalized conversations, automates routine tasks, and provides intelligent, context-aware assistance in real time.",
    img: "17_WP_bot.png",
  },
  {
    title: "token optimization pipeline",
    desc: "An intelligent token optimization pipeline that compresses and refines LLM context to reduce inference cost while preserving semantic accuracy and response quality",
    img: "18_token_optimization.png",
  },
  {
    title: "red black visualizer",
    desc: "An interactive visualizer for Red-Black Trees that demonstrates insertions, deletions, rotations, and balancing operations through real-time animations",
    img: "19_red_black_tree.png",
  },
  {
    title: "HR analytics",
    desc: "A workforce analytics platform that leverages machine learning to predict employee attrition, evaluate performance trends, and enable data-driven HR decision-making",
    img: "15_HR_analytics.png",
  },
  {
    title: "heat mitigation",
    desc: "A data-driven platform that analyzes urban heat patterns and recommends sustainable strategies to reduce heat islands and improve city resilience",
    img: "21_urban_heat.png",
  },
  {
    title: "cryptex file share",
    desc: "A secure file-sharing platform that enables encrypted, privacy-focused file transfers with seamless access control and protected data exchange",
    img: "22_cryptex.png",
  },
];

const projectMedia = projectData.map((data, i) => [
  data.title,
  i % 3 === 0 ? "portrait" : i % 2 === 0 ? "square" : "landscape",
  data.desc,
  data.img,
]);

export default function WorkSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const $ = (selector) => section.querySelector(selector);
    const $$ = (selector) => Array.from(section.querySelectorAll(selector));
    const clamp = (value, min = 0, max = 1) =>
      Math.max(min, Math.min(max, value));

    const stage = $(".work-stage");
    const cards = $$(".work-project");
    const letterCopies = [14, 18, 18, 17];

    // Setup Letters
    const letters = ["W", "O", "R", "K"];
    const letterLayer = $(".work-letter-layer");
    letterLayer.innerHTML = letters
      .map((letter, row) => {
        const letterY = ((row + 1) / 5 - 0.5) * 2;
        const top = `calc(50% + 0.1em + ${(row - 1.5) * 0.85}em)`;
        const before = letterCopies
          .slice(0, row)
          .reduce((sum, count) => sum + count, 0);
        const copies = Array.from({ length: letterCopies[row] }, (_, slot) => {
          const foreground =
            (row === 0 || row === 3) && (before + slot) % 5 === 1;
          return `<span${foreground ? ' class="is-foreground"' : ""} data-letter="${letter}" data-row="${row}" data-slot="${slot}">${letter}</span>`;
        }).join("");
        return `<div class="work-letter-row" style="--letter-y:${letterY};--letter-top:${top}">${copies}</div>`;
      })
      .join("");

    const stackGroupMap = new Map();
    const stackTimelineOrder = new Map([
      ["triple-craft", -1],
      ["pair-4-11", 0],
      ["pair-9-10", 1],
      ["triple-12-14", 2],
      ["grid-remaining", 3],
    ]);

    const cardGroups = cards
      .reduce((groups, card, index) => {
        const stackGroup = card.dataset.stackGroup;
        if (stackGroup) {
          if (!stackGroupMap.has(stackGroup)) {
            const group = [];
            stackGroupMap.set(stackGroup, group);
            groups.push(group);
          }
          stackGroupMap.get(stackGroup).push(index);
        } else {
          groups.push([index]);
        }
        return groups;
      }, [])
      .sort((groupA, groupB) => {
        const rank = (group) => {
          const firstCard = cards[group[0]];
          const stackGroup = firstCard.dataset.stackGroup;
          if (group[0] < 6) return group[0];
          if (stackGroup) return 6 + stackTimelineOrder.get(stackGroup);
          return 100 + group[0];
        };
        return rank(groupA) - rank(groupB);
      });

    const maskInner = $(".work-mask-inner");
    const maskOuter = $(".work-mask-outer");
    const maskGridClip = $(".work-mask-grid-clip");
    const rowFrequencies = [1, 1.18, 0.93, 1.12];
    const glyphs = $$("[data-letter]").map((element) => ({
      element,
      row: Number(element.dataset.row || 0),
      slot: Number(element.dataset.slot || 0),
    }));
    const visibleCards = new Set();
    let raf = 0;
    let openStackGroup = "";
    let horizontalStackExpanded = false;
    let lastWorkProgress = 0;

    const setOpenStackGroup = (nextGroup) => {
      if (nextGroup === openStackGroup) return;
      (stackGroupMap.get(openStackGroup) || []).forEach((index) =>
        cards[index].classList.remove("is-stack-open"),
      );
      (stackGroupMap.get(nextGroup) || []).forEach((index) =>
        cards[index].classList.add("is-stack-open"),
      );
      openStackGroup = nextGroup;
    };

    const easeIn = (value) => value ** 5;

    const maskLines = $(".work-mask-lines");
    if (maskLines) {
      maskLines.innerHTML =
        Array.from(
          { length: 13 },
          (_, index) => `<path d="M ${index * 100} 0 V 1000"></path>`,
        ).join("") +
        Array.from(
          { length: 11 },
          (_, index) => `<path d="M 0 ${index * 100} H 1200"></path>`,
        ).join("");
    }

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const inView = rect.bottom > 0 && rect.top < viewport;
      stage.classList.toggle("is-active", inView);

      if (!inView) {
        visibleCards.forEach((index) => {
          cards[index].style.opacity = "0";
          cards[index].style.visibility = "hidden";
        });
        visibleCards.clear();
        setOpenStackGroup("");
        return;
      }

      const holdDistance =
        (viewport *
          (Number(section.style.getPropertyValue("--work-hold-vh")) || 60)) /
        100;
      const progress = clamp(
        (viewport * 0.25 - rect.top) /
          Math.max(1, rect.height - viewport * 0.5 - holdDistance),
      );
      const workDirection = progress - lastWorkProgress;
      const intro = clamp(progress / 0.075);
      const outro = clamp((progress - 0.95) / 0.05);
      const open = easeIn(intro) * (1 - easeIn(outro));
      const state = open;
      const sceneOpen = intro ** 4 * (1 - outro ** 4);
      const stageTop = stage.getBoundingClientRect().top;
      const letterPinY = -stageTop * (1 - sceneOpen);

      stage.classList.toggle("mask-open", open > 0.999);
      stage.style.setProperty("--work-progress", String(progress));
      stage.style.setProperty("--work-state", String(state));
      stage.style.setProperty("--mask-open", String(open));
      stage.style.setProperty("--scene-open", String(sceneOpen));
      stage.style.setProperty("--letter-pin-y", `${letterPinY}px`);

      const timelineTime = progress * 10.25;
      const letterTween = clamp((timelineTime - 0.75) / 9.5);
      const letterEased = 1 - (1 - letterTween) ** 2;
      const diagonalSpeed = Math.hypot(window.innerWidth, viewport) * 4;
      const animationProgress = letterEased * 10000;

      glyphs.forEach(({ element, row, slot }) => {
        const cycle = diagonalSpeed * rowFrequencies[row];
        const phase =
          ((animationProgress % cycle) / cycle + slot / letterCopies[row]) % 1;
        element.style.setProperty(
          "--letter-progress",
          String(phase / 0.7 - 0.15),
        );
      });

      const stageWidth = stage.clientWidth || window.innerWidth;
      const outerWidth =
        stageWidth > 987
          ? Math.min(stageWidth / 6, 314)
          : stageWidth / (stageWidth <= 576 ? 2 : 3);
      const outerWidthSvg = (outerWidth / stageWidth) * 1200;
      const outerLeft = (1200 - outerWidthSvg) / 2;
      const outerRight = outerLeft + outerWidthSvg;
      const outerTop = 100;
      const outerBottom = 900;
      const outerRadiusX = outerWidthSvg / 2;
      const outerRadiusY =
        (outerRadiusX * (stageWidth / 1200)) / (viewport / 1000);
      const insetX = ((stageWidth > 767 ? 16 : 8) / stageWidth) * 1200;
      const insetY = ((stageWidth > 767 ? 16 : 8) / viewport) * 1000;
      const rectangle = "M -1 0 L 1201 0 L 1201 1000 L -1 1000 Z";
      const capsule = (left, right, top, bottom, radiusX, radiusY) =>
        `M ${left} ${top + radiusY} A ${radiusX} ${radiusY} 0 0 1 ${right} ${top + radiusY} L ${right} ${bottom - radiusY} A ${radiusX} ${radiusY} 0 0 1 ${left} ${bottom - radiusY} Z`;

      const outerCapsule = capsule(
        outerLeft,
        outerRight,
        outerTop,
        outerBottom,
        outerRadiusX,
        outerRadiusY,
      );
      const innerCapsule = capsule(
        outerLeft + insetX,
        outerRight - insetX,
        outerTop + insetY,
        outerBottom - insetY,
        Math.max(1, outerRadiusX - insetX),
        Math.max(1, outerRadiusY - insetY),
      );
      const outerPath = `${rectangle} ${outerCapsule}`;
      const innerPath = `${rectangle} ${innerCapsule}`;

      if (maskOuter && maskInner && maskGridClip) {
        maskOuter.setAttribute("d", outerPath);
        maskInner.setAttribute("d", innerPath);
        maskGridClip.setAttribute("d", outerPath);
      }

      const maxScale = stageWidth / Math.max(1, outerWidth / 2);
      const maskScale = 1 + (maxScale - 1) * open;
      stage.style.setProperty("--mask-scale", String(maskScale));

      const galleryStart = 0.085;
      const galleryEnd = 0.95;
      const regularEnd = 0.64;
      const regularGroupCount = Math.max(1, cardGroups.length - 1);

      const groupTimings = cardGroups.map((group, groupIndex) => {
        const horizontal =
          cards[group[0]].dataset.stackGroup === "grid-remaining";
        return horizontal
          ? { centre: 0.76, halfTravel: 0.16 }
          : {
              centre:
                galleryStart +
                ((groupIndex + 0.5) / regularGroupCount) *
                  (regularEnd - galleryStart),
              halfTravel:
                ((regularEnd - galleryStart) / regularGroupCount) * 1.02,
            };
      });

      const nearest = groupTimings.reduce(
        (best, timing, index) =>
          Math.abs(timing.centre - progress) <
          Math.abs(groupTimings[best].centre - progress)
            ? index
            : best,
        0,
      );
      const keepHorizontalAtEnd =
        horizontalStackExpanded && progress > galleryEnd;
      const nextActive =
        progress < galleryStart ||
        (progress > galleryEnd && !keepHorizontalAtEnd)
          ? -1
          : nearest;
      const nextVisible = new Set();
      let nextOpenStackGroup = "";

      if (nextActive >= 0) {
        const firstGroup = Math.max(0, nearest - 1);
        const lastGroup = Math.min(cardGroups.length - 1, nearest + 1);
        for (
          let groupIndex = firstGroup;
          groupIndex <= lastGroup;
          groupIndex++
        ) {
          const stackGroup =
            cards[cardGroups[groupIndex][0]].dataset.stackGroup;
          const isHorizontalStack = stackGroup === "grid-remaining";
          const { centre, halfTravel } = groupTimings[groupIndex];
          const cardProgress = clamp((centre - progress) / halfTravel, -1, 1);
          if (isHorizontalStack) {
            if (workDirection >= 0 && cardProgress < 0.35)
              horizontalStackExpanded = true;
            if (workDirection < 0 && cardProgress >= 0)
              horizontalStackExpanded = false;
          }
          const visible = isHorizontalStack
            ? horizontalStackExpanded
              ? progress < 0.95
              : Math.abs(cardProgress) < 0.99
            : Math.abs(cardProgress) < 0.92;
          const stackOpenRange =
            stackGroup === "triple-craft" || stackGroup === "triple-12-14"
              ? 0.58
              : 0.22;
          if (
            stackGroup &&
            groupIndex === nearest &&
            (isHorizontalStack
              ? horizontalStackExpanded
              : Math.abs(cardProgress) < stackOpenRange)
          )
            nextOpenStackGroup = stackGroup;
          cardGroups[groupIndex].forEach((index) => {
            const card = cards[index];
            card.style.setProperty("--card-progress", String(cardProgress));
            if (isHorizontalStack) {
              const horizontalProgress = clamp(-cardProgress / 0.82);
              card.style.setProperty(
                "--stack-scroll-x",
                `${horizontalProgress * -245}vw`,
              );
            }
            card.style.opacity = visible ? "1" : "0";
            card.style.visibility = visible ? "visible" : "hidden";
            const hoverCardVisible =
              visible && card.classList.contains("work-project-hoverable");
            card.style.pointerEvents =
              hoverCardVisible || Math.abs(cardProgress) < 0.35
                ? "auto"
                : "none";
            if (visible) nextVisible.add(index);
          });
        }
      }
      setOpenStackGroup(nextOpenStackGroup);
      visibleCards.forEach((index) => {
        if (!nextVisible.has(index)) {
          cards[index].style.opacity = "0";
          cards[index].style.visibility = "hidden";
          cards[index].style.pointerEvents = "none";
        }
      });
      visibleCards.clear();
      nextVisible.forEach((index) => visibleCards.add(index));
      lastWorkProgress = progress;
    };

    const requestUpdate = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    // Trigger initial calculation
    setTimeout(() => {
      requestUpdate();
    }, 100);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const stackDefinitions = [
    { id: "triple-craft", indexes: [3, 4, 5] },
    { id: "pair-4-11", indexes: [13, 6] },
    { id: "pair-9-10", indexes: [11, 12] },
    { id: "triple-12-14", indexes: [14, 15, 16] },
    { id: "grid-remaining", indexes: [7, 8, 9, 10, 17, 18, 19, 20, 21] },
  ];

  const skipToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const skipToBottom = () => {
    if (sectionRef.current) {
      const bottom = sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="work-showcase"
      id="work"
      style={{
        height: `calc(${projectMedia.length * 65}lvh + 60lvh)`,
        "--work-hold-vh": "60",
      }}
    >
      <div className="work-outer">
        <div className="work-stage">
          <div className="work-skip-buttons" aria-hidden="true">
            <button onClick={skipToTop} title="Skip to Hero Section" className="skip-btn">
              <FiArrowUp className="skip-icon" />
            </button>
            <button onClick={skipToBottom} title="Skip to Next Section" className="skip-btn">
              <FiArrowDown className="skip-icon" />
            </button>
          </div>
          <div className="work-points" aria-hidden="true"></div>
          <div className="work-letter-scene">
            <div className="work-letter-layer" aria-hidden="true"></div>
            <div className="work-project-scene">
              {projectMedia.map(([title, shape, description, img], index) => {
                const stackDefinition = stackDefinitions.find(({ indexes }) =>
                  indexes.includes(index),
                );
                const stackIndex = stackDefinition
                  ? stackDefinition.indexes.indexOf(index)
                  : -1;
                const stackCount = stackDefinition?.indexes.length || 0;
                const size =
                  index < 3
                    ? 0.87
                    : stackCount === 9
                      ? 1
                      : stackIndex >= 0
                        ? 0.78
                        : 0.5 + ((index * 37) % 50) / 100;
                const y =
                  stackIndex >= 0
                    ? 0
                    : (0.5 + ((index * 53) % 50) / 100) * (index % 2 ? -1 : 1);

                const stacked = stackIndex >= 0 ? " work-project-stack" : "";
                const gridStack =
                  stackCount === 9 ? " work-project-stack-grid" : "";

                const stackRest =
                  stackCount === 9
                    ? Array.from({ length: 9 }, (_, position) => {
                        const displayOrder = [3, 4, 0, 5, 1, 6, 2, 7, 8];
                        const displayPosition = displayOrder.indexOf(position);
                        const angles = [-6, -3, 3, 5, -2, 2, -5, 4, 0];
                        return {
                          x: `${(position - 4) * 1.5}%`,
                          y: `${((position % 2) * 2 - 1) * 1.5}%`,
                          angle: `${angles[position]}deg`,
                          z: 20 - displayPosition,
                          openX: `${displayPosition * 32}vw`,
                          openXMobile: `${displayPosition * 42}vw`,
                          openY: "0lvh",
                          openYMobile: "0lvh",
                          openAngle: "0deg",
                        };
                      })
                    : stackCount === 2
                      ? [
                          {
                            x: "-7%",
                            y: "2%",
                            angle: "-5deg",
                            openX: "32vw",
                            openXMobile: "42vw",
                            openY: "0lvh",
                            openYMobile: "0lvh",
                            openAngle: "0deg",
                          },
                          {
                            x: "7%",
                            y: "-1%",
                            angle: "4deg",
                            openX: "0vw",
                            openXMobile: "0vw",
                            openY: "0lvh",
                            openYMobile: "0lvh",
                            openAngle: "0deg",
                          },
                        ]
                      : [
                          {
                            x: "-11%",
                            y: "3%",
                            angle: "-6deg",
                            openX: "64vw",
                            openXMobile: "84vw",
                            openY: "0lvh",
                            openYMobile: "0lvh",
                            openAngle: "0deg",
                          },
                          {
                            x: "-1%",
                            y: "-6%",
                            angle: "6deg",
                            openX: "32vw",
                            openXMobile: "42vw",
                            openY: "0lvh",
                            openYMobile: "0lvh",
                            openAngle: "0deg",
                          },
                          {
                            x: "11%",
                            y: "2%",
                            angle: "0deg",
                            openX: "0vw",
                            openXMobile: "0vw",
                            openY: "0lvh",
                            openYMobile: "0lvh",
                            openAngle: "0deg",
                          },
                        ];

                const stack = stackIndex >= 0 ? stackRest[stackIndex] : null;
                const stackStyle = stack
                  ? {
                      "--stack-index": stackIndex,
                      "--stack-z": stack.z ?? stackIndex,
                      "--stack-x": stack.x,
                      "--stack-y": stack.y,
                      "--stack-angle": stack.angle,
                      "--stack-open-x": stack.openX,
                      "--stack-open-x-mobile": stack.openXMobile,
                      "--stack-open-y": stack.openY,
                      "--stack-open-y-mobile": stack.openYMobile,
                      "--stack-open-angle": stack.openAngle,
                    }
                  : {};

                const stackData = stackDefinition
                  ? stackDefinition.id
                  : undefined;

                return (
                  <article
                    key={index}
                    className={`work-project work-project-${shape}${stacked}${gridStack}`}
                    data-stack-group={stackData}
                    style={{
                      "--card-size": size,
                      "--card-y": y,
                      ...stackStyle,
                    }}
                  >
                    <div className="work-project-inner">
                      <div className="work-project-media">
                        <h3>{title}</h3>
                        <p>{description}</p>
                        {img && (
                          <img
                            src={getImageUrl(img)}
                            alt={title}
                            className="work-project-image"
                          />
                        )}
                      </div>
                      <footer>
                        <span>
                          #{String(index + 1).padStart(4, "0")}/
                          {String(projectMedia.length).padStart(2, "0")}
                        </span>
                      </footer>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="work-mask" aria-hidden="true">
            <svg viewBox="0 0 1200 1000" preserveAspectRatio="none">
              <defs>
                <clipPath id="work-grid-clip">
                  <path
                    className="work-mask-grid-clip"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </clipPath>
              </defs>
              <path className="work-mask-inner" fillRule="evenodd"></path>
              <path className="work-mask-outer" fillRule="evenodd"></path>
              <g
                className="work-mask-lines"
                clipPath="url(#work-grid-clip)"
              ></g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
