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

const navItems = [
  { name: "Home", icon: <FiHome />, href: "#" },
  { name: "Resume", icon: <FiBookOpen />, href: "#" },
  { name: "Projects", icon: <FiLayout />, href: "#" },
  { name: "LinkedIn", icon: <FiLinkedin />, href: "#" },
  { name: "LeetCode", icon: <SiLeetcode />, href: "#" },
  { name: "Codeforces", icon: <SiCodeforces />, href: "#" },
  { name: "CodeChef", icon: <SiCodechef />, href: "#" },
  { name: "GitHub", icon: <FiGithub />, href: "#" },
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
