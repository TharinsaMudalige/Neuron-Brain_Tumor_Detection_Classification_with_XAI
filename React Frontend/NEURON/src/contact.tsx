import React from "react";
import "./contactStyles.css";
import { NavLink } from "react-router-dom";
const ContactPage: React.FC = () => {
    return (
        
        <div className="contactpage">
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

            <section className="contact-section">
                <h2>GET IN TOUCH!</h2>
                <div className="contact-container">
                    <div className="contact-text">
                        <h3>We are here to help!</h3>
                        <p>Let us know how we can best serve you. Use the following information to contact us about NEURON. 
                        It’s an honor to support you through this journey towards better health.</p>
                    </div>

                    <div className="contact-info">
                        <div className="contact-item">
                            <img src="src/images/phone icon.png" alt="Phone Icon" className="icon"/>
                            <div className="details">
                                <p><strong>Venuki Mudalige</strong></p>
                                <p style={{ marginTop: "-10px" }}>+94 778861775</p>
                                <p><strong>Thisarani Jayaweera</strong></p>
                                <p style={{ marginTop: "-10px" }}>+94 74 113 2082</p>
                            </div>
                            <div className="details-2">
                                <p><strong>Vimesh Herath</strong></p>
                                <p style={{ marginTop: "-10px" }}>+94 77 634 4555</p>
                                <p><strong>Sadeesh De Silva</strong></p>
                                <p style={{ marginTop: "-10px" }}>+94 76 148 0001</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <img src="src/images/email icon.png" alt="Email Icon" className="icon"/>
                            <div className="details">
                                <p><strong>Venuki Mudalige</strong></p>
                                <p style={{ marginTop: "-10px" }}>venuki.20232784@iit.ac.lk</p>
                                <p><strong>Thisarani Jayaweera</strong></p>
                                <p style={{ marginTop: "-10px" }}>thisarani.20232802@iit.ac.lk</p>
                            </div>
                            <div className="details-2">
                                <p><strong>Vimesh Herath</strong></p>
                                <p style={{ marginTop: "-10px" }}>vimesh.20233171@iit.ac.lk</p>
                                <p><strong>Sadeesh De Silva</strong></p>
                                <p style={{ marginTop: "-10px" }}>nammuni.20232513@iit.ac.lk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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

export default ContactPage;
