<div align="center">
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" width="60" alt="React"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Vite-Dark.svg" width="60" alt="Vite"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CSS-Dark.svg" width="60" alt="CSS"/>
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ThreeJS-Dark.svg" width="60" alt="ThreeJS"/>
  
  <br />
  <br />

  # 💻 The Ultra-Modern Developer Portfolio

  **Unapologetically designed for the big screen.**<br/>
  An insanely interactive, 3D-powered, live-syncing portfolio built to push the limits of modern web browsers. No compromises. No mobile view. 

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Made with React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
  [![Powered by Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

  <br />
</div>

---

## 🚀 Why This Exists (And Why It's Laptop Only)

Most developers build simple, responsive portfolios that look "okay" on a phone and "okay" on a laptop. **This is not one of them.** 

This portfolio was engineered to be a **jaw-dropping, premium experience** designed exclusively for desktop and laptop hardware. By intentionally dropping mobile support, we unlock the freedom to use heavy WebGL scenes, interactive 3D elements, and complex GSAP cursor animations without worrying about mobile device throttling or touch-screen compromises. 

If you try to open this on a phone, you will be met with a strict **ERROR 6767 😿**. Go get your laptop.

## ✨ Insane Features

- 🧊 **Interactive 3D WebGL Hero:** A mesmerizing, interactive particle settlement field that reacts dynamically to your mouse movements, powered by `@react-three/fiber` and custom shaders.
- 🎨 **Flawless Dual Themes (Dark & Beige):** A meticulously crafted aesthetic that flips seamlessly. Every shadow, 3D blob color, and chart hue is mathematically interpolated between the two themes via CSS variables. 
- ⌨️ **Spline 3D Keyboard Scene:** A fully embedded, interactive 3D mechanical keyboard where the keys organically float in 3D space, heavily optimized for desktop graphics processing.
- 📈 **Live Coding Profile Sync:** Directly fetches live competitive programming stats (Codeforces, LeetCode, CodeChef) displaying current ratings, global ranks, and an exact replica of the GitHub/LeetCode-style contribution heatmap. Built with fail-safe mock fallback generators so the UI **never** breaks, even if proxy APIs go down.
- 🎯 **Elastic Magnetic Cursor:** A buttery smooth, GSAP-powered custom elastic cursor that stretches and morphs contextually when hovering over interactive elements.
- 📊 **Recharts Progression Graphs:** Live, smooth rating progression line graphs powered by `recharts`.

## 🛠️ The Tech Stack

- **Framework:** React 18 + Vite (Blazing fast builds)
- **3D Engine:** Three.js + React Three Fiber + Spline
- **Animations:** GSAP (GreenSock) for cursor elasticity
- **Data Vis:** Recharts + Custom CSS Grid for heatmaps
- **Styling:** Vanilla CSS with ultra-strict variable theming (No Tailwind bloat)

## 🏎️ Run It Yourself

Want to experience peak web development locally or fork it for your own portfolio? 

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ultra-modern-portfolio.git

# 2. Navigate into the directory
cd ultra-modern-portfolio

# 3. Install the dependencies
npm install

# 4. Spin up the Vite development server
npm run dev
```

*Note: You must view `http://localhost:5173` on a screen wider than 1024px, otherwise the strict anti-mobile `ERROR 6767` screen will block you.*

## 📸 Sneak Peek

*(Add your jaw-dropping screenshots here to farm those GitHub stars!)*

## 🤝 Contributing

Love the idea of an unapologetic, maximalist desktop-only web experience? Feel free to fork this repository, star it ⭐ if you think it's cool, and submit a Pull Request! 

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Let's make the desktop web beautiful again.
