import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import OnlineDoctoramico from "../assets/OnlineDoctor-amico.svg";
import "./Forgot_Password2.css";

function Forgot_Password2() {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
    const [storedEmail, setStoredEmail] = useState(null);
    const [storedResetCode, setStoredResetCode] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem("email");
        const resetCode = localStorage.getItem("resetCode");

        if (email && resetCode) {
            setStoredEmail(email);
            setStoredResetCode(resetCode);
        } else {
            console.error("Stored email or reset code is missing!");
        }
    }, []);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!storedEmail || !storedResetCode) {
            console.error("Email or reset code not found in local storage.");
            alert("An error occurred. Please request a password reset again.");
            return;
        }

        console.log("Stored Email:", storedEmail);
        console.log("Stored Reset Code:", storedResetCode);

        if (!passwords.password || !passwords.confirmPassword) {
            setErrors({
                password: passwords.password ? "" : "Password is required",
                confirmPassword: passwords.confirmPassword ? "" : "Confirm Password is required",
            });
            return;
        }

        if (passwords.password !== passwords.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/password-reset/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: storedEmail,
                    code: storedResetCode,
                    password: passwords.password,
                    confirm_password: passwords.confirmPassword,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Password reset successful!", data);
                alert("Password reset successfully! Redirecting to Home page.");
                localStorage.removeItem("email");
                localStorage.removeItem("resetCode");
                navigate("/home");
            } else {
                console.error("Password reset failed:", data);
                alert(data.message || "Password reset failed.");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <div className="container-Forogot-PasswordPage2">
            <div className="logoandtitlePage2">
                <div className="logo-forgotpassword">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="title">
                    <h1>Définir un nouveau mot de passe</h1>
                </div>
            </div>
            <form className="forgotpasswordpage2" onSubmit={handleSubmit}>
                <div className="labelandpassword">
                    <label>Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={passwords.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="labelandpassword">
                    <label>Confirmer le mot de passe</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwords.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
                <button className="continuepage2" type="submit">Réinitialiser</button>
                <div className="Returnpage2">
                    <button className="btn-arrow" onClick={() => navigate("/")}>
                        <IoArrowBackCircle className="ioArrowBackCircle" />
                    </button>
                    <p>Retour à la connexion</p>
                </div>
            </form>
            <div className="doctor-img">
                <img src={OnlineDoctoramico} alt="Doctor Illustration" />
            </div>
        </div>
    );
}

export default Forgot_Password2;
