import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <div
        style={{
          width: "200px"
        }}
      >
      </div>

      <h1
        style={{
          margin: 0,
          color: "#0d47a1",
          fontSize: "42px"
        }}
      >
        Friends Auto Mobile
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}
      >

        <span
          style={{
            fontWeight: "bold",
            color: "#0d47a1"
          }}
        >
          Welcome {username}
        </span>

        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Header;