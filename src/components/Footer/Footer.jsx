import { memo } from "react";
import { FiMail, FiLinkedin, FiGithub, FiCode } from "react-icons/fi";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, hoverScale } from "../../utils/animations";
import "./Footer.css";

const Footer = () => {
  const socialLinks = [
    {
      platform: "LinkedIn",
      handle: "arpit-raj-614240318",
      action: "Connect",
      icon: <FiLinkedin strokeWidth={1.5} className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/arpit-raj-614240318",
      isPrimary: true,
    },
    {
      platform: "GitHub",
      handle: "arpit-raj-001",
      action: "Browse",
      icon: <FiGithub strokeWidth={1.5} className="w-6 h-6" />,
      href: "https://github.com/arpit-raj-001",
      isPrimary: false,
    },
    {
      platform: "LeetCode",
      handle: "Arpit-raj",
      action: "View Profile",
      icon: <SiLeetcode strokeWidth={1.5} className="w-6 h-6" />,
      href: "https://leetcode.com/u/Arpit-raj/",
      isPrimary: false,
    },
    {
      platform: "Codeforces",
      handle: "aadzz",
      action: "View Profile",
      icon: <SiCodeforces strokeWidth={1.5} className="w-6 h-6" />,
      href: "https://codeforces.com/profile/aadzz",
      isPrimary: false,
    },
  ];

  return (
    <section id="contact" className="footer-section">
      <div className="footer-inner-bg">
        <div className="footer-content">
          <div className="footer-grid">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              className="footer-editorial"
            >
              <motion.h2 variants={fadeUp} className="footer-title">
                Let's build
                <br />
                something
                <span className="footer-title-sub">worth shipping</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="footer-contact-info">
                <a
                  href="mailto:arpit1206477417@gmail.com"
                  className="footer-contact-link"
                >
                  arpit1206477417@gmail.com
                </a>
                <span className="footer-contact-divider">•</span>
                <a href="tel:+917909058218" className="footer-contact-link">
                  +91 7909058218
                </a>
              </motion.div>

              <motion.p variants={fadeUp} className="footer-subtitle">
                Whether it's a project, an internship opportunity, or a complex
                engineering problem , i am always in
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="footer-social-wrapper"
            >
              <div className="footer-social-outline" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="footer-social-card"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={fadeUp}
                    whileHover={hoverScale}
                    whileTap={{ scale: 0.98 }}
                    className="social-link group"
                  >
                    <div className="social-info">
                      <span className="social-icon">{link.icon}</span>
                      <div>
                        <h3 className="social-platform">{link.platform}</h3>
                        <p className="social-handle">{link.handle}</p>
                      </div>
                    </div>

                    <div className="social-action-wrapper">
                      {link.isPrimary && (
                        <span className="social-action">{link.action}</span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Footer);
