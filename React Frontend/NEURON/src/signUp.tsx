import React, { useState } from "react";
import "./signUpStyles.css";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios"; // Import axios

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State to store form data
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Prepare the data to send to the backend
        const userData = {
            fullName,
            email,
            password,
        };

        try {
            // Send the data to the backend
            const response = await axios.post("http://localhost:5000/signup", userData);
            alert(response.data); // Show success message
            navigate("/signIn"); // Redirect to sign-in page after success
        } catch (error) {
            console.error("There was an error signing up:", error);
            alert("Error during sign-up");
        }
    };

    return (
        <div className="signuppage">
            <div className="container">
                <div className="left-side">
                    <div className="sign-up-logo">NEURON</div>
                </div>
                <div className="right-side">
                    <div className="signup-box">
                        <h2><b>Connect With Us To Get More Accurate Brain Tumor Prediction</b></h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group password">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                            <div className="input-group password">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                            <button type="submit" className="signup-btn">SIGN UP</button>
                            <br /><br />
                            <h4>
                                Already Have an Account? <span onClick={() => navigate("/signIn")} className="signin-link"> Sign In</span>
                            </h4>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
