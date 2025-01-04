import React, { useState } from "react";
import { loginUser, registerUser } from "../api"; // Import your API functions
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss"; // Import the SCSS file

function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignUp) {
                // Validate passwords
                if (password !== confirmPassword) {
                    setMessage("Passwords do not match");
                    return;
                }
                await registerUser(email, password);
                setMessage("Account created successfully! You can now sign in.");
            } else {
                const response = await loginUser(email, password);

                // Save email to localStorage after login
                localStorage.setItem("userEmail", email);

                setMessage(`Welcome, ${response.data.email}!`);
                navigate("/ads"); // Redirect to ads page
            }
        } catch (error) {
            console.error(error);
            setMessage(
                error.response?.status === 401
                    ? "Invalid email or password."
                    : "An error occurred. Please try again."
            );
        }
    };

    return (
        <div className={`form-block-wrapper ${isSignUp ? "form-block-wrapper--is-signup" : "form-block-wrapper--is-login"}`}>
            <div className="form-block">
                <header className="form-block__header">
                    <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                    <p>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="toggle-button"
                        >
                            {isSignUp ? "Sign In" : "Sign Up"}
                        </button>
                    </p>
                </header>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-block__input-wrapper">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-group__input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-group__input"
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-group__input"
                            />
                        )}
                    </div>
                    <button type="submit" className="button button--primary full-width">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
}

export default LoginPage;