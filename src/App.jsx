import { useState } from "react";
import Navigation from "./Navigation";
import HeroScene from "./components/Hero/HeroScene";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <HeroScene />
      <Navigation />
    </div>
  );
}

export default App;
