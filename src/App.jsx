import { useState } from "react";
import Navigation from "./Navigation";
import HeroScene from "./components/Hero/HeroScene";
import WorkSection from "./components/Work/WorkSection";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <HeroScene />
      <WorkSection />
      <Navigation />
    </div>
  );
}

export default App;
