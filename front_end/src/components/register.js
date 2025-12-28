import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
      if (!name || !email || !password || !passwordConf) {
            setErrorMessage("All fields are required");
            return;
        }

      if (password !== passwordConf) {
            setErrorMessage("Passwords do not match");
            return;
        }
        var user = {
            name: name,
            email: email,
            password: password,
        }
         axios.post('http://localhost:8000/signup/', user)
    .then(response => {
      if (response.data.message === "user created successsfully") {
        setErrorMessage('');
        navigate('/login');
      } else {
        setErrorMessage(response.data.message);
      }
    })
    .catch(error => {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to connect to API');
      }
    });
    }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #17e239ff, #25c6fcff)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #375b6aff, #e0ebe1ff)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: "#dee2e6ff" }}
        >
          Create Account
        </h2>
        {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
        <form onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              style={{
                borderRadius: "12px",
                height: "50px",
                padding: "0 15px",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                border: "1px solid #ccc",
                transition: "all 0.3s",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.1), 0 0 5px #6a11cb")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.05)")
              }
              value={name}
              onInput={(event)=>setName(event.target.value)}
            />
          </div>


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
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.1), 0 0 5px #6a11cb")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.05)")
              }
              value={email}
              onInput={(event)=>setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
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
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.1), 0 0 5px #6a11cb")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.05)")
              }
              value={password}
              onInput={(event)=>setPassword(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              style={{
                borderRadius: "12px",
                height: "50px",
                padding: "0 15px",
                fontSize: "1rem",
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.05)",
                border: "1px solid #ccc",
                transition: "all 0.3s",
              }}
              onFocus={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.1), 0 0 5px #6a11cb")
              }
              onBlur={(e) =>
                (e.target.style.boxShadow =
                  "inset 0 2px 5px rgba(0,0,0,0.05)")
              }
              value={passwordConf}
              onInput={(event)=>setPasswordConf(event.target.value)}
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
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
            }}
            >
            Register
          </button>
        </form>

        <p className="text-center mt-3" style={{ fontSize: "0.9rem", color: "#fff"}}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#2575fc", fontWeight: "500" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
