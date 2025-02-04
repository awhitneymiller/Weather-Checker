import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

const handleAuth = async (e) => {
    e.preventDefault();
    try {
        if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        } else {
        await signInWithEmailAndPassword(auth, email, password);
        }
        navigate("/weather");
    } catch (error) {
        console.error("Authentication error:", error.message);
        alert(error.message);
    }
};

const handleGoogleSignIn = async () => {
        await signInWithPopup(auth, googleProvider);
        navigate("/weather");
};

return (
    <div className="moving-background">
        <div
        style={{
            textAlign: "center",
            padding: "20px",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Roboto', sans-serif",
            color: "#3d4859",
        }}
    >
        <div
            style={{
            maxWidth: "400px",
            padding: "30px",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
                {isSignup ? "Sign Up" : "Login"}
            </h2>
            <form onSubmit={handleAuth}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                }}
            />
        <button
            type="submit"
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                background: "#A8D5BA", 
                color: "#3d4859",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
            }}
            >
            {isSignup ? "Sign Up" : "Login"}
            </button>
        </form>
        <button
            onClick={() => setIsSignup(!isSignup)}
            style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                background: "#A8CFF5", 
                color: "#3d4859",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
            }}
        >
            {isSignup ? "Switch to Login" : "Switch to Sign Up"}
        </button>
        <button
            onClick={handleGoogleSignIn}
            style={{
                width: "100%",
                padding: "10px",
                background: "#F5A8A8", 
                color: "#3d4859",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
            }}
            >
            Sign In with Google
            </button>
        </div>
        </div>
    </div>
    );
};

export default Login;
