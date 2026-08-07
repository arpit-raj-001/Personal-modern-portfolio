import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    date: "August 2024 - 2028",
    title: "LNMIIT Jaipur",
    role: "B.Tech in Electronics and Communication Engineering (ECE)",
    description: "Secured admission after achieving a 97 percentile in JEE Mains. Building a strong foundation in core engineering principles while aggressively pursuing full-stack development and competitive programming."
  },
  {
    date: "August 2025 - January 2026",
    title: "LNMIIT Jaipur",
    role: "Teaching Assistant",
    description: "Mentored a batch of 240 first-year students, simplifying complex programming concepts. Conducted doubt-clearing sessions focused on optimal coding practices and intermediate Data Structures and Algorithms (DSA)."
  },
  {
    date: "January 2026 - March 2026",
    title: "Mentox Technologies Pvt Ltd",
    role: "UI/UX Designer & Frontend Developer",
    description: "Spearheaded the design and frontend architecture for company web platforms. Translated wireframes into highly interactive, responsive, and visually striking user interfaces using modern web technologies."
  },
  {
    date: "May 2026 - July 2026",
    title: "Mentox Technologies Pvt Ltd",
    role: "Summer SDE Intern",
    description: "Worked as a Full Stack Developer. Engineered and deployed their flagship workshop platform, handling both the complex backend logic and the seamless frontend user experience."
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Glow line animation fills down as you scroll
    gsap.to('.timeline-glow', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.experience-timeline',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true
      }
    });

    // Cards alternating animation
    const cards = gsap.utils.toArray('.timeline-item');
    cards.forEach((card, i) => {
      const isLeft = i % 2 === 0;
      gsap.from(card.querySelector('.timeline-card'), {
        x: isLeft ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      gsap.from(card.querySelector('.timeline-dot'), {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section className="experience-section" id="experience" ref={containerRef}>
      <div className="experience-container">
        <h2 className="section-title">Experience</h2>
        
        <div className="experience-timeline">
          <div className="timeline-line">
            <div className="timeline-glow"></div>
          </div>
          
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="exp-date">{exp.date}</span>
                <h3 className="exp-title">{exp.title}</h3>
                <h4 className="exp-role">{exp.role}</h4>
                <p className="exp-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
