import { useState } from "react";
import Navigation from "./Navigation";
import HeroScene from "./components/Hero/HeroScene";
import WorkSection from "./components/Work/WorkSection";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <HeroScene />
      <WorkSection />
      <Services />
      <Footer />
      <Navigation />
    </div>
  );
}

export default App;
