import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  async function attemptLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      setErrorMessage('');
      setSuccessMessage('Login successful! Happy Browsing');
      const token = response.data.access || response.data.token;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved:", token);
      } else {
        console.warn("No token found in response:", response.data);
      }

      navigate("/recipes", { state: { successMessage: "Login successful!" } });
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Failed to login user. Please contact admin");
      }
    }
  }

  return (
    <div
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        background: "linear-gradient(135deg, #17e239ff, #25c6fcff)",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #0d1d24ff, #e0ebe1ff)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

        <h3 className="text-center mb-4 fw-bold" style={{ color: "#fff" }}>
          Login
        </h3>

        <form onSubmit={attemptLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              style={{
                borderRadius: "12px",
                height: "50px",
                padding: "0 15px",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                border: "1px solid #ccc",
                transition: "all 0.3s",
              }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              style={{
                borderRadius: "12px",
                height: "50px",
                padding: "0 15px",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                border: "1px solid #ccc",
                transition: "all 0.3s",
              }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              borderRadius: "12px",
              padding: "12px",
              fontSize: "1.1rem",
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              color: "#fff",
              border: "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem", color: "#fff" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#2575fc", fontWeight: "500" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;