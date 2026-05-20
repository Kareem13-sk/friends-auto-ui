import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  return (

    <div style={sidebarStyle}>

      <h1 style={logoStyle}>
        Friends Auto
      </h1>

      <button
        style={navButton}
        onClick={() => navigate("/")}
      >
        Dashboard
      </button>

      <button
        style={navButton}
        onClick={() => navigate("/products")}
      >
        Products
      </button>

      <button
        style={navButton}
        onClick={() => navigate("/billing")}
      >
        Billing
      </button>

      <button
        style={navButton}
        onClick={() => navigate("/history")}
      >
        Purchase History
      </button>

      <button
        style={navButton}
        onClick={() =>
          navigate("/customer-details")
        }
      >
        Customer Details
      </button>

    </div>
  );
}

const sidebarStyle = {

  width: "250px",

  height: "100vh",

  background:
    "linear-gradient(180deg,#0d47a1,#062b63)",

  position: "fixed",

  left: 0,

  top: 0,

  padding: "30px 20px",

  boxShadow:
    "4px 0px 15px rgba(0,0,0,0.15)"
};

const logoStyle = {

  color: "white",

  marginBottom: "40px",

  textAlign: "center",

  fontSize: "32px"
};

const navButton = {

  width: "100%",

  padding: "15px",

  marginBottom: "16px",

  borderRadius: "12px",

  border: "none",

  backgroundColor:
    "rgba(255,255,255,0.12)",

  color: "white",

  fontSize: "16px",

  cursor: "pointer",

  fontWeight: "600"
};

export default Sidebar;