import React, { useEffect, useState } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import "./accountStyles.css";
import profilePic from "./images/profile.png";

const AccountPage: React.FC = () => {
    const navigate = useNavigate();  
    const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/signIn");
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [navigate]);

    

    const handlePasswordUpdate = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill in both fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
    
        if (!user) {
            alert("User details not found!");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    newPassword: newPassword
                })
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Password updated successfully!");
                setShowPasswordModal(false);
                setNewPassword("");
                setConfirmPassword("");
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password. Please try again.");
        }
    };
    

    const handleSignOut = () => {
        localStorage.removeItem("user");
        navigate("/signIn");
    };

    return (
        <div className="accountpage">
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

            {/* Profile Section */}
            <div className="profile-container">
                <div className="profile-banner"></div>
                <div className="profile-picture">
                    <img src={profilePic} alt="Profile" />
                </div>

                <div className="profile-details">
                    
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" value={user?.fullName || "Unknown"} disabled />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" value={user?.email || "Unknown"} readOnly />
                    </div>

                    <div className="password-container">
                        <label>Password</label>
                        <input type="password" id="password-field" value="********" disabled />
                        <button className="change-pw-btn" onClick={() => setShowPasswordModal(true)}>
                            Change Password
                        </button>
                    </div>
                </div>

                <button className="sign-out-btn" onClick={handleSignOut}>Sign Out</button>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div id="passwordModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowPasswordModal(false)}>&times;</span>
                        <h2>Change Password</h2>
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
            
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />

                        <button onClick={handlePasswordUpdate}>Update Password</button>
                    </div>
                </div>
            )}

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

export default AccountPage;
