import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false); // Determină modul activ (Sign In / Sign Up)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Inițializarea useNavigate

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp) {
                // Validare confirmare parola
                if (password !== confirmPassword) {
                    setMessage('Passwords do not match');
                    return;
                }
                await registerUser(email, password);
                setMessage('Account created successfully! You can now sign in.');
            } else {
                const response = await loginUser(email, password);
                setMessage(`Welcome, ${response.data.email}!`);
                
                // Dupa login reusit, redirectioneaza catre pagina de anunturi
                navigate('/ads'); 
            }
        } catch (error) {
            console.error(error);
            setMessage(
                error.response?.status === 401
                    ? 'Invalid email or password.'
                    : 'An error occurred. Please try again.'
            );
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isSignUp && (
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <div style={{ marginTop: '10px' }}>
                <p>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{
                            border: 'none',
                            background: 'none',
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                        }}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
