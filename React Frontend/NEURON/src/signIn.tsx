import React, { useState } from "react";
import "./signInStyles.css";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {  
    const navigate = useNavigate();   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleSignIn = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user details
                navigate("/homePage"); // Redirect to home page
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };
    
    
    return (
        <div className="signinpage">
            <div className="container">
                <div className="left">
                    <h1>NEURON</h1>
                </div>
                <div className="right">
                    <div className="login-box">
                        <h2>Connect With Us To Get More Accurate Brain Tumor Prediction</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSignIn}>
                            <div className="input-group">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group password-group">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    required 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                </span>
                            </div>
                            <button type="submit"><b>SIGN IN</b></button>
                        </form>
                    </div>
                </div>            
            </div>
        </div>
    );
};

export default SignInPage;
