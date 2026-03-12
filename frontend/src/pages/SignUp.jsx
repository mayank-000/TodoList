import { useState } from "react";
import { createUser } from "../api/user.api.js";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const saveUserId = (userId) => {
        localStorage.setItem("TodoAppUID", userId);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrorMsg("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const response = await createUser(formData.username, formData.email);
            console.log('Full SignUp resposne', response);
    
            const UID = response.data.userId;
            saveUserId(UID);
            setSuccessMsg("Account created successfully!");
            setTimeout(() => {
                navigate("/home");
            }, 3000);
        } catch (error) {
            setErrorMsg(error.message || "Signup failed, Try again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Sign up to get started</p>

                {errorMsg && <div className="error-message">{errorMsg}</div>}
                {successMsg && <div className="success-message">{successMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                            disabled={isLoading} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;