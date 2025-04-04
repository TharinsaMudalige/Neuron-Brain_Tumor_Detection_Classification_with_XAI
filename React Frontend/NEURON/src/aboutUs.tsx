import React from "react";
import "./aboutUsStyles.css";
import { NavLink } from "react-router-dom";
const AboutUsPage: React.FC = () => {
    return (

        <div className="aboutuspage">
            {/* Navigation Bar */}
            <nav>
                <div className="logo">NEURON</div>
                <ul className="nav-links">
                  <li><NavLink to="/homePage" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                  <li><NavLink to="/inputPage" className={({ isActive }) => isActive ? "active" : ""}>Upload MRI Scan</NavLink></li>
                  <li><NavLink to="/aboutUs" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink></li>
                  <li><NavLink to="/help" className={({ isActive }) => isActive ? "active" : ""}>Help</NavLink></li>
                  <li><NavLink to="/account" className={({ isActive }) => isActive ? "active" : ""}>Account</NavLink></li>
                </ul>
            </nav>    
    
            <main>
                <h1>MEET THE TEAM!</h1>
                <section className="team-container">
                    <div className="card">
                        <img src="src/images/venuki.png" alt="Venuki Mudalige"/>
                        <h2>Venuki Mudalige</h2>
                        <p>Artificial Intelligence and Data Science Undergraduate</p>
                    </div>
                    <div className="card">
                        <img src="thisarani.jpg" alt="Thisarani Jayaweera"/>
                        <h2>Thisarani Jayaweera</h2>
                        <p>Artificial Intelligence and Data Science Undergraduate</p>
                    </div>
                    <div className="card">
                        <img src="vimesh.jpg" alt="Vimesh Herath"/>
                        <h2>Vimesh Herath</h2>
                        <p>Artificial Intelligence and Data Science Undergraduate</p>
                    </div>
                    <div className="card">
                        <img src="sadeesh.jpg" alt="Sadeesh De Silva"/>
                        <h2>Sadeesh De Silva</h2>
                        <p>Artificial Intelligence and Data Science Undergraduate</p>
                    </div>
                </section>
            </main>
    
            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        <h2>NEURON</h2>
                        <p>A system that can segment and classify brain tumors more accurately</p>
                    </div>
    
                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Explore</h4>
                            <ul>
                                <li><a href="/homePage">Home</a></li>
                                <li><a href="/inputPage">Upload MRI Scan</a></li>
                                <li><a href="/contact">Contact Us</a></li>                        
                            </ul>
                        </div>
    
                        <div className="footer-section2">
                            <h3></h3>
                            <ul>
                                <li><a href="/aboutUs">About Us</a></li>
                                <li><a href="#">FAQs</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUsPage;
