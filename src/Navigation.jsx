import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FiHome,
  FiBookOpen,
  FiLayout,
  FiLinkedin,
  FiGithub,
} from "react-icons/fi";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import "./Navigation.css";
import resumePdf from "./assets/arpit-raj-resume-101 (1) (1).pdf";

const navItems = [
  { name: "Home", icon: <FiHome />, href: "#" },
  { name: "Resume", icon: <FiBookOpen />, href: resumePdf, target: "_blank" },
  { name: "Projects", icon: <FiLayout />, href: "#" },
  { name: "LinkedIn", icon: <FiLinkedin />, href: "https://www.linkedin.com/in/arpit-raj-614240318", target: "_blank" },
  { name: "LeetCode", icon: <SiLeetcode />, href: "https://leetcode.com/u/Arpit-raj/", target: "_blank" },
  { name: "Codeforces", icon: <SiCodeforces />, href: "https://codeforces.com/profile/aadzz", target: "_blank" },
  { name: "CodeChef", icon: <SiCodechef />, href: "https://www.codechef.com/users/arpit_9921", target: "_blank" },
  { name: "GitHub", icon: <FiGithub />, href: "https://github.com/arpit-raj-001", target: "_blank" },
];

export default function Navigation() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="nav-container">
      <motion.nav
        className="nav-bar"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {navItems.map((item) => (
          <IconContainer key={item.name} item={item} mouseX={mouseX} />
        ))}
      </motion.nav>
    </div>
  );
}

function IconContainer({ item, mouseX }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const iconSizeTransform = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      target={item.target}
      rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
      className="nav-link-wrapper"
      style={{ display: "block", textDecoration: "none" }}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="nav-item-animated"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.8 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: 2, x: "-50%", scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="nav-tooltip"
            >
              {item.name}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            width: iconSize,
            height: iconSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: iconSize,
            color: hovered ? "#ffffff" : "#a3a3a3",
          }}
        >
          {item.icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
