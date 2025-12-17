import React from "react";

const Register = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{ color: "#343a40" }}
        >
          Create Account
        </h2>
        <form>
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

        <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
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
