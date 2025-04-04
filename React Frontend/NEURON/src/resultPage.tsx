import React from "react";
import "./resultStyles.css";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

const ResultPage: React.FC = () => {
    const location = useLocation();
    const uploadedImage = location.state?.uploadedImage || "";
    const segmentedImage = location.state?.segmentedImage || "";
    const classificationResult = location.state?.classificationResult || "Unknown";
    const xaiResults = location.state?.xaiResults || {};

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.text("Brain Tumor Classification Report", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.text(`Tumor Type: ${classificationResult}`, 20, 35);

        if (uploadedImage) {
            doc.text("Original MRI Scan:", 20, 50);
            doc.addImage(uploadedImage, "PNG", 20, 55, 70, 70);
        }

        if (segmentedImage) {
            doc.text("Segmentation Result:", 120, 50);
            doc.addImage(segmentedImage, "PNG", 120, 55, 70, 70);
        }

        if (xaiResults.gradcam) {
            doc.text("Grad-CAM Analysis:", 20, 130);
            doc.addImage(xaiResults.gradcam, "PNG", 20, 135, 70, 70);
        }

        if (xaiResults.lime) {
            doc.text("LIME Explanation:", 120, 130);
            doc.addImage(xaiResults.lime, "PNG", 120, 135, 70, 70);
        }

        if (xaiResults.shap) {
            doc.text("SHAP Explanation:", 20, 210);  
            doc.addImage(xaiResults.shap, "PNG", 20, 215, 70, 70);
        }

        doc.save("Brain_Tumor_Report.pdf");
    };

    return (
        <div className="resultpage">
            {/* Navigation Bar */}
            <nav>
                <div className="logo">NEURON</div>
                <ul className="nav-links">
                    <li><a href="/homePage">Home</a></li>
                    <li><a href="/inputPage">Upload MRI Scan</a></li>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/help">Help</a></li>
                    <li><a href="/account">Account</a></li>
                </ul>
            </nav>

            {/* MRI Results Section */}
            <div className="container">
                <div className="row">
                    <div className="box">
                        <h3>Your MRI Scan</h3>
                        <img src={uploadedImage} alt="MRI Scan" />
                    </div>
                    <div className="box">
                        <h3>Segmentation Result</h3>
                        <img src={segmentedImage} alt="Segmentation Result" />
                    </div>
                </div>

                <div className="row">
                    <div className="box">
                        <h3>Classification Result</h3>
                        <p className="classification-text">Tumor Type: {classificationResult}</p>
                    </div>
                </div>

                <h3 className="xai-heading">XAI Results</h3>

                <div className="row">
                    <div className="box">
                        <h3>Grad-CAM</h3>
                        <img src={xaiResults.gradcam || "/default-placeholder.png"} alt="Grad-CAM" />
                    </div>
                    <div className="box">
                        <h3>LIME</h3>
                        <img src={xaiResults.lime || "/default-placeholder.png"} alt="LIME" />
                    </div>
                </div>

                <div className="row">
                    <div className="box">
                        <h3>SHAP</h3>
                        <img src={xaiResults.shap || "/default-placeholder.png"} alt="SHAP" />
                    </div>
                </div>
            </div>

            {/* Download Report Section */}
            <div className="download-section">
                <h2>Click the download button to get a PDF of your report</h2>
                <button className="download-btn" onClick={handleDownload}>Download</button>
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

export default ResultPage;
