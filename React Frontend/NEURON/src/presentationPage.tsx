import React, { useEffect, useState } from "react";
import "./inputStyles.css";
import { useNavigate } from "react-router-dom";

const PresentationPage: React.FC = () => { 
  const navigate = useNavigate();   
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="presentationPage">
      <header>
        <h1>NEURON</h1>
        <p><i>{greeting}, Welcome to Neuron</i></p>
      </header>

      <div className="center-button">        
        <button onClick={() => navigate("/signup")}>Explore Neuron</button>       
      </div>

      <section className="cards-container">
        <div className="card">
          <img src="src/images/brain 1.jpg" alt="AI-Powered Insights" />
          <h2>AI-Powered Insights</h2>
          <p>Harness cutting-edge AI to analyze MRI scans with unparalleled accuracy, offering early detection and precise results.</p>
        </div>

        <div className="card">
          <img src="src/images/brain 2.jpg" alt="Interactive Dashboard" />
          <h2>Interactive Dashboard</h2>
          <p>Gain comprehensive insights with an intuitive and user-friendly interface designed for seamless navigation.</p>
        </div>

        <div className="card">
          <img src="src/images/brain 3.jpg" alt="Real-Time Diagnostics" />
          <h2>Real-Time Diagnostics</h2>
          <p>Leverage cutting-edge AI for instant analysis and results, empowering timely and informed medical decisions.</p>
        </div>
      </section>
    </div>
  );
};

export default PresentationPage;
