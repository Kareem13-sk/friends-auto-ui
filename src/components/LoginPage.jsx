import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    if (!username || !password) {
      alert("Enter Username and Password");
      return;
    }

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      if (!response.ok) {
        alert("Invalid Username or Password");
        return;
      }

      const user = await response.json();

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      localStorage.setItem(
        "username",
        user.username
      );

      localStorage.setItem(
        "role",
        user.role
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Server Error");
    }
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fb"
      }}
    >

      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow:
            "0px 2px 10px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            color: "#0d47a1",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={login}
          style={{
            width: "100%",
            backgroundColor: "#0d47a1",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

export default LoginPage;