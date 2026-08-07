import React, { lazy, Suspense } from "react";
import resumePdf from "../../assets/arpit-raj-resume-101 (1) (1).pdf";
import "./Hero.css";

const WebGLScene = lazy(() => import("./WebGLScene"));

export default function HeroScene() {
  const handleInitialize = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-gradient" />
      <div className="hero-canvas-container">
        <Suspense fallback={null}>
          <WebGLScene />
        </Suspense>
      </div>

      <div className="hero-content-left">
        <h1 className="hero-title">
          Arpit
          <br />
          Sharma
        </h1>
        <p className="hero-subtitle">
          Software Engineer with full-stack experience, a DSA enthusiast, and an
          aspiring Data Analytics & Data Science practitioner.
          <br />
        </p>
      </div>

      <div className="hero-content-right">
        <p className="hero-education">
          LNMIIT, Jaipur<br />
          B.Tech ECE
        </p>
        <p className="hero-meta">Software Engineer</p>
        <div className="hero-buttons">
          <button
            onClick={handleInitialize}
            className="hero-button"
            aria-label="Scroll to next section"
          >
            View my work
          </button>
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
            style={{ textDecoration: 'none' }}
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
