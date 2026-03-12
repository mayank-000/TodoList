import { useState } from "react";
import { useAuth } from "../service/useAuth.jsx";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api.js";

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        try {
            const response = await loginUser(formData.email);

            const uid = response.data.user._id;

            // update auth context
            login({ _id: uid }, uid);

            navigate("/home");

        } catch (error) {
            setErrorMsg(error.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Login</h2>
                <p className="auth-subtitle">Login to continue</p>

                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">

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

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Register;