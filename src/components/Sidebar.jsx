import { NavLink } from "react-router-dom";

function Sidebar() {

  const menuStyle = ({ isActive }) => ({
    background: isActive ? "white" : "#2d5fb7",
    color: isActive ? "#0d47a1" : "white",
    padding: "18px",
    borderRadius: "18px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "18px",
    transition: "0.3s"
  });

  return (
    <div
      style={{
        width: "280px",
        background:
          "linear-gradient(to bottom,#0d47a1,#003380)",
        minHeight: "100vh",
        padding: "30px 20px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0
      }}
    >

      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "38px"
        }}
      >
        Friends Auto
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >

        <NavLink to="/" style={menuStyle}>
          Dashboard
        </NavLink>

        <NavLink
          to="/customers"
          style={menuStyle}
        >
          Customers
        </NavLink>

        <NavLink
          to="/products"
          style={menuStyle}
        >
          Products
        </NavLink>

        <NavLink
          to="/billing"
          style={menuStyle}
        >
          Billing
        </NavLink>

        <NavLink
          to="/history"
          style={menuStyle}
        >
          Purchase History
        </NavLink>

        <NavLink
          to="/customer-details"
          style={menuStyle}
        >
          Customer Details
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;