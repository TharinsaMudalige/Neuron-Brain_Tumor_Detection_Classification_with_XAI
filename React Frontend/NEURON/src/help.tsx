import React,{useState} from "react";
import "./helpStyles.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const HelpPage: React.FC = () => {
    const [feedback, setFeedback] = useState({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/submit-feedback", feedback);
            alert("Feedback submitted successfully!");
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback.");
        }
    };

    return (
        <div className="helppage">
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

            <div className="container">
                <h2>🛠️ How It Works</h2>
        
                <div className="content-box">
                    <ul>
                        <li>
                            <strong>🚀 Navigate to the Upload Page</strong>
                            <ul>
                                <li>Click on the <strong>“Upload MRI Scan”</strong> tab in the navigation bar.</li>
                            </ul>
                        </li>
    
                        <li>
                            <strong>📤 Upload Your MRI Scan</strong>
                            <ul>
                                <li>Click on the <strong>Browse</strong> button or <em>Drag & Drop</em> your MRI scan into the upload area.</li>
                                <li><strong>Supported formats:</strong> PNG, JPEG.</li>
                            </ul>
                        </li>
    
                        <li>
                            <strong>🧠 Start Segmentation & Classification</strong>
                            <ul>
                                <li>Click the <strong>Upload</strong> button to begin processing.</li>
                                <li>The system will analyze the image and classify the tumor type.</li>
                            </ul>
                        </li>
    
                        <li>
                            <strong>📊 View Your Results</strong>
                            <ul>
                                <li>After processing, you’ll be redirected to the <strong>Result Visualization Page</strong>.</li>
                                <li>Here, you’ll see:</li>
                                <ul className="nested-list">
                                    <li>🎯 <strong>Segmentation Mask:</strong> Highlights the tumor region.</li>
                                    <li>🏷️ <strong>Classification Type:</strong> (e.g., Benign/Malignant).</li>
                                </ul>
                            </ul>
                        </li>
    
                        <li>
                            <strong>🔍 Explainable AI (XAI) Insights</strong>
                            <ul>
                                <li>AI-generated heatmaps will highlight the key areas influencing the classification.</li>
                                <li>Gain insights into why the AI model made its decision.</li>
                            </ul>
                        </li>
                    </ul>
                </div>    

                <h3>Your Valuable Feedback makes Neuron more strong!</h3>
                <div className="feedback-form">
                    <p><strong>Thank you for choosing Neuron</strong><br />Please complete this document to help us improve future sessions.</p>

                    <label>1. How clear were the instructions for uploading your MRI scan?</label>
                    <textarea name="q1" value={feedback.q1} onChange={handleChange}></textarea>

                    <label>2. Were you satisfied with the segmentation and classification process? If not, what could be improved?</label>
                    <textarea name="q2" value={feedback.q2} onChange={handleChange}></textarea>

                    <label>3. Did the result visualization (e.g., segmentation mask and classification type) meet your expectations?</label>
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <React.Fragment key={num}>
                                <input type="radio" id={`rating-${num}`} name="q3" value={num} onChange={handleChange} />
                                <label htmlFor={`rating-${num}`}>{num}</label>
                            </React.Fragment>
                        ))}
                    </div>

                    <label>4. Were the Explainable AI (XAI) insights (e.g., heatmaps) easy to understand and helpful?</label>
                    <div className="radio-group">
                        <input type="radio" id="yes" name="q4" value="Yes" onChange={handleChange} />
                        <label htmlFor="yes">Yes</label>
                        <input type="radio" id="no" name="q4" value="No" onChange={handleChange} />
                        <label htmlFor="no">No</label>
                    </div>

                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            </div>

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

export default HelpPage;
