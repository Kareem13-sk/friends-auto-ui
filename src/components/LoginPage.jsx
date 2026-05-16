import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem("loggedIn", "true");

      navigate("/");

    } else {

      alert("Invalid Username or Password");
    }
  };

  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f7fb"
    }}>

      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "350px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
      }}>

        <h1 style={{
          color: "#0d47a1",
          textAlign: "center"
        }}>
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
  border: "1px solid #ccc"
};

export default LoginPage;