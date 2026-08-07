import { useState } from "react";
import Navigation from "./Navigation";
import HeroScene from "./components/Hero/HeroScene";
import WorkSection from "./components/Work/WorkSection";
import KeyboardSection from "./components/Keyboard/KeyboardSection";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import ElasticCursor from "./components/ui/ElasticCursor";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <ElasticCursor />
        <Navigation />
        <main>
          <HeroScene />
          <WorkSection />
          <KeyboardSection />
          <Services />
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
