import React, { useRef, memo } from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiGlobe,
  FiServer,
  FiCpu,
  FiGitCommit,
  FiPackage,
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { staggerContainer, fadeUp } from "../../utils/animations";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: "Globe", title: "Full-Stack Web Apps" },
  { icon: "Brain", title: "AI/ML & Agentic Systems" },
  { icon: "Workflow", title: "Algorithm Visualizers" },
  { icon: "Code", title: "DSA & Competitive Programming" },
  { icon: "Server", title: "REST API Design" },
  { icon: "Package", title: "Open-Source Tooling" },
];

const iconMap = {
  Code: FiCode,
  Globe: FiGlobe,
  Server: FiServer,
  Brain: FiCpu,
  Workflow: FiGitCommit,
  Package: FiPackage,
};

const Services = () => {
  const topRow = [...services, ...services, ...services];
  const bottomRow = [
    ...services.slice().reverse(),
    ...services.slice().reverse(),
    ...services.slice().reverse(),
  ];

  const containerRef = useRef(null);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(topRowRef.current, {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: 35,
      });

      gsap.set(bottomRowRef.current, { xPercent: -50 });
      gsap.to(bottomRowRef.current, {
        xPercent: 0,
        ease: "none",
        repeat: -1,
        duration: 35,
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="services" ref={containerRef} className="services-section">
      <motion.div
        className="services-container"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp}>
          <div className="services-header">
            <h2 className="services-title">
              What I <span className="services-title-accent">Build</span>
            </h2>
            <p className="services-subtitle">
              The kind of problems I like solving — from full-stack products
              to AI systems and algorithmic tools.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="services-scroll-container"
        >
          <div ref={topRowRef} className="services-row">
            {topRow.map((service, index) => {
              const Icon = iconMap[service.icon] || FiCode;
              return (
                <div key={`top-${index}`} className="service-card">
                  <div className="service-icon-wrapper">
                    <Icon className="service-icon" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
              );
            })}
          </div>

          <div ref={bottomRowRef} className="services-row">
            {bottomRow.map((service, index) => {
              const Icon = iconMap[service.icon] || FiCode;
              return (
                <div key={`bottom-${index}`} className="service-card">
                  <div className="service-icon-wrapper">
                    <Icon className="service-icon" />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Services);
