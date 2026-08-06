import { useState } from "react";
import Navigation from "./Navigation";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: "2rem 0" }}>
          Portfolio
        </h1>
        <p style={{ color: "#a3a3a3" }}>
          testing my website , work in progress , meow
        </p>
      </main>
      <Navigation />
    </div>
  );
}

export default App;
