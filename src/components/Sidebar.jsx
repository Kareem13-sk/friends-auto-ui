import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuStyle = (path) => ({
    background:
      location.pathname === path
        ? "white"
        : "#2d5fb7",

    color:
      location.pathname === path
        ? "#0d47a1"
        : "white",

    padding: "18px",
    borderRadius: "18px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "18px",
    display: "block",
    transition: "0.3s ease",
  });

  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        overflowY: "auto",
        position: "fixed",
        left: 0,
        top: 0,
        background:
          "linear-gradient(to bottom,#0d47a1,#003b8e)",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "58px",
          lineHeight: "1.1",
          marginBottom: "50px",
          fontWeight: "bold",
        }}
      >
        Friends
        <br />
        Auto
      </h1>

      <Link to="/" style={menuStyle("/")}>
        Dashboard
      </Link>

      <Link
        to="/customers"
        style={menuStyle("/customers")}
      >
        Customers
      </Link>

      <Link
        to="/products"
        style={menuStyle("/products")}
      >
        Products
      </Link>

      <Link
        to="/billing"
        style={menuStyle("/billing")}
      >
        Billing
      </Link>

      <Link
        to="/history"
        style={menuStyle("/history")}
      >
        Purchase History
      </Link>

      <Link
        to="/customer-details"
        style={menuStyle("/customer-details")}
      >
        Customer Details
      </Link>
    </div>
  );
}

export default Sidebar;