import React, { useEffect, useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import { setItemWithExpiry } from "../services/token";
import { useAuth } from "../context/AuthContext";
import Layout from "./Home";

// You can adjust these to match your theme or import from your CSS/Theme provider
const theme = {
    primary: "#1976d2",
    background: "#f5f6fa",
    borderRadius: "8px",
    fontFamily: "'Inter', sans-serif",
    inputBg: "#fff",
    inputBorder: "#d1d5db",
    error: "#d32f2f",
};


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    // const [loginstatus, setLoginStatus] = useState(false);
    //   const tokens= "12345";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);
        console.log("Attempting login with:", { email, password });

        try {
            const data = await login({ email, password });
            console.log("Login response data:", data.data);

            // ✅ Check login status directly from API response
            if (data.data.accessToken) {
                // localStorage.setItem("token", data.data.accessToken);
                setItemWithExpiry("token", data.data.accessToken, 30);
                setIsLoggedIn(true); // ✅ FIXED: Update AuthContext state immediately
                // Navigate to home page
                navigate("/"); // Your home path
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{
            minHeight: "100vh",
            background: theme.background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.fontFamily,
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: theme.inputBg,
                    padding: 32,
                    borderRadius: theme.borderRadius,
                    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                    minWidth: 320,
                    maxWidth: 360,
                }}
            >
                <h2 style={{ color: theme.primary, marginBottom: 24, textAlign: "center" }}>
                    Login
                </h2>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#333" }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            width: "100%",
                            padding: 10,
                            borderRadius: 4,
                            border: `1px solid ${theme.inputBorder}`,
                            background: theme.inputBg,
                            fontSize: 16,
                        }}
                        autoFocus
                        autoComplete="username"
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 6, color: "#333" }}>
                        Password
                    </label>
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{
                                width: "100%",
                                padding: 10,
                                paddingRight: 40,
                                borderRadius: 4,
                                border: `1px solid ${theme.inputBorder}`,
                                background: theme.inputBg,
                                fontSize: 16,
                            }}
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: 8,
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 4,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#666",
                            }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                {error && (
                    <div style={{ color: theme.error, marginBottom: 12, textAlign: "center" }}>{error}</div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 12,
                        background: theme.primary,
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                        transition: "opacity 0.2s",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
