import { useState } from "react";
import Navigation from "./Navigation";
import HeroScene from "./components/Hero/HeroScene";
import WorkSection from "./components/Work/WorkSection";
import KeyboardSection from "./components/Keyboard/KeyboardSection";
import CodingProfiles from "./components/CodingProfiles/CodingProfiles";
import Experience from "./components/Experience/Experience";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import ElasticCursor from "./components/ui/ElasticCursor";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <>
        <div className="mobile-error">
          <h1><strong>ERROR 6767 😿</strong></h1>
          <p>made only for LAPTOP view</p>
        </div>
        <div className="app-container">
          <ElasticCursor />
          <Navigation />
          <main>
            <HeroScene />
            <WorkSection />
            <KeyboardSection />
            <CodingProfiles />
            <Experience />
            <Services />
            <Footer />
          </main>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
