import React from "react";
import "./homePageStyles.css";
import { NavLink,useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();  

    return (
        <div className="homepage">
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

            <h1>TUMORS, COMMON SYMPTOMS AND <br/> WHAT WE OFFER</h1>

            {/* Brain Tumor Information */}
            <section className="info-section">
                <div className="info-box">
                    <h3>WHAT IS A BRAIN TUMOR?</h3>
                    <p>A brain tumor is an abnormal growth of cells within the brain. Tumors can develop from different types of brain cells, 
                    and they can be classified as either benign (non-cancerous) or malignant (cancerous). Brain tumors may arise from the brain 
                    tissue itself or spread from other parts of the body (secondary or metastatic).</p>
                </div>
            </section>

            {/* Brain Tumor Types */}
            <section className="grid-container">
                <div className="box">
                    <img src="src/images/brain tumour.jpg" className="img1" alt="Brain Diagram"/>
                </div>
                <div className="box light-blue">
                    <h3 style={{ textAlign: "center" }}>TYPES OF BRAIN TUMOURS</h3>
                    <ul>
                        <li><b>Primary Brain Tumors:</b> These originate within the brain.</li>
                        <li><b>Glioma</b></li>
                        <li><b>Pituitary</b></li>
                        <li><b>Meningioma</b></li>
                    </ul>
                </div>
            </section>

            {/* Symptoms Section */}
            <section className="grid-container">
                <div className="box light-gray">
                    <h3>SYMPTOMS</h3>
                    <ul>
                        <li><b>Headaches:</b> Often worse in the morning or progressively worsens.</li>
                        <li><b>Seizures:</b> Uncontrolled electrical activity in the brain.</li>
                        <li><b>Cognitive Changes:</b> Memory problems, confusion, difficulty concentrating.</li>
                        <li><b>Vision Problems:</b> Blurry or double vision.</li>
                        <li><b>Motor Function Issues:</b> Weakness or paralysis in parts of the body.</li>
                        <li><b>Nausea and Vomiting:</b> Persistent and unexplained.</li>
                    </ul>
                </div>
                <div className="box">
                    <img src="src/images/symptoms.jpeg" className="img2" alt="Woman with Headache"/>
                </div>
            </section>

            {/* Brain Tumor Identification */}
            <section className="info-section">
                <div className="info-box">
                    <h3>BRAIN TUMOUR IDENTIFICATION</h3>
                    <p>Use our advanced AI model to identify and classify brain tumors with high precision.</p>
                    <button className="scan-btn" onClick={() => navigate("/inputPage")}>UPLOAD MRI SCAN</button>
                </div>
            </section>

            {/* Expert Consultation */}
            <section className="info-section">
                <div className="info-box">
                    <h3>CONSULT WITH EXPERTS</h3>
                    <p>Connect with top Neuro surgeons and radiologists in Sri Lanka for further analysis.</p>
                    <a href="https://www.doc.lk/search?doctor=&hospital=0&specialization=13&date=" target="_blank"><button className="consult-btn">FIND A NEURO SURGEON</button></a>
                    <br/>
                    <a href="https://www.doc.lk/search?doctor=&hospital=0&specialization=91&date=" target="_blank"><button className="consult-btn2">FIND A RADIOLOGIST</button></a>
                </div>
            </section>

            {/* Medical Reports */}
            <section className="info-section">
                <div className="info-box">
                    <h3>YOUR MEDICAL REPORTS</h3>
                    <p>You can download your medical reports after the classification.</p>
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

export default HomePage;
