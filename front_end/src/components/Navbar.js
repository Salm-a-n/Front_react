import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("authToken");

    try {
      if (token) {
        await axios.post(
          "http://127.0.0.1:8000/api/userlogout/",
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <nav className="custom-navbar">
        <NavLink to="/" className="brand">
          🍲 Recipe Sharing
        </NavLink>
        <div className="nav-links">
          <NavLink to="/login" className="nav-btn">
            Login
          </NavLink>

          <>
            <NavLink to="/profile" className="nav-btn">
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="nav-btn logout"
              type="button"
            >
              Logout
            </button>
          </>
        </div>
      </nav>
      <style>
        {`
        .custom-navbar {
          background: #121212;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }

        .brand {
          color: #fff;
          font-size: 22px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-btn {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 20px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-btn:hover {
          background: #2c2c2c;
        }

        .nav-btn.active {
          background: #ffc107;
          color: #000;
        }

        .logout {
          background: #ff4d4f;
          font-weight: 700;
        }

        .logout:hover {
          background: #e63946;
        }

        @media (max-width: 768px) {
          .custom-navbar {
            flex-direction: row;
          }

          .nav-links {
            margin-left: auto;
            gap: 10px;
          }

          .nav-btn {
            padding: 6px 14px;
            font-size: 14px;
          }

          .brand {
            font-size: 18px;
          }
        }
        `}
      </style>
    </>
  );
}

export default Navbar;

