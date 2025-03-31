import React, { useState } from "react";
import "./inputStyles.css";
import { NavLink, useNavigate } from "react-router-dom";

const InputPage: React.FC = () => {
    const navigate = useNavigate();   
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);    
    const [loading, setLoading] = useState<boolean>(false);  // New loading state

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            console.log("Selected file:", selectedFile);
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    setPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.dataTransfer.files[0]);
        }
    };

    const clearSelection = () => {
        setFile(null);
        setPreview(null);
    };

    const handleUpload = async () => {
        if (!file) {
            console.log("No file selected!");
            return;
        }

        setLoading(true);  // Start loading

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:5000/inputPage", {
                method: "POST",
                body: formData,
            });

            console.log("Raw response:", response);
            const data = await response.json();
            console.log("Received from backend:", data);

            if (!data.segmented_image || !data.classification || !data.xai_results) {
                throw new Error("Missing required response data from backend.");
            }

            navigate("/resultPage", { 
                state: { 
                    uploadedImage: preview, 
                    segmentedImage: `data:image/png;base64,${data.segmented_image}`,
                    classificationResult: data.classification,
                    xaiResults: {
                        gradcam: `data:image/png;base64,${data.xai_results.gradcam}`,
                        lime: `data:image/png;base64,${data.xai_results.lime}`,
                        shap: `data:image/png;base64,${data.xai_results.shap}`,
                    }
                } 
            });

        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    return (
        <div className="inputpage">
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

            {/* Upload Section */}
            <div className="upload-container">
                <h2>Upload MRI Scan</h2>
                <div className="upload-box">
                    <div className="white-box">
                        <div className="upload-content">
                            <div 
                                className="drag-drop" 
                                id="drop-area" 
                                onDragOver={(e) => e.preventDefault()} 
                                onDrop={handleDrop}
                            >
                                {!preview ? (
                                    <>
                                        <p id="drag-text">Drag and drop image</p>
                                        <p style={{ color: "darkgray" }}>—— or ——</p>
                                        <input 
                                            type="file" 
                                            id="file-input" 
                                            accept="image/*" 
                                            hidden 
                                            onChange={handleFileChange} 
                                        />
                                        <label htmlFor="file-input" className="browse-btn">Browse</label>
                                    </>
                                ) : (
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="preview-image" 
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    />
                                )}
                            </div>
                            <div className="buttons">
                                <button className="upload-btn" disabled={!file || loading} onClick={handleUpload}>
                                    {loading ? "Uploading..." : "Upload"}
                                </button>
                                <button className="clear-btn" onClick={clearSelection} disabled={!file || loading}>
                                    Clear
                                </button>
                            </div>

                            {/* Loading Indicator */}
                            {loading && <p className="loading-text">Processing... Please wait.</p>}
                        </div>
                    </div>
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

export default InputPage;
