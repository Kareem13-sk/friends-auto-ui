import { useState } from "react";
import {
  FaUsers,
  FaBox,
  FaFileInvoice,
  FaHistory,
  FaChartBar
} from "react-icons/fa";


import {
  Link,
  useLocation
} from "react-router-dom";

function Layout({ children }) {

  const location = useLocation();

  return (

    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f7fb"
    }}>

      <div style={{
        width: "260px",
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "20px"
      }}>

        <h1 style={{
          marginBottom: "40px",
          fontSize: "32px",
          lineHeight: "40px",
          fontWeight: "bold",
          textAlign: "center"
        }}>
          Friends Auto Mobile
        </h1>

        <SidebarItem
          to="/"
          icon={<FaChartBar />}
          text="Dashboard"
          active={location.pathname === "/"}
        />

        <SidebarItem
          to="/customers"
          icon={<FaUsers />}
          text="Customers"
          active={location.pathname === "/customers"}
        />

        <SidebarItem
          to="/products"
          icon={<FaBox />}
          text="Products"
          active={location.pathname === "/products"}
        />

        <SidebarItem
          to="/billing"
          icon={<FaFileInvoice />}
          text="Billing"
          active={location.pathname === "/billing"}
        />

        <SidebarItem
          to="/history"
          icon={<FaHistory />}
          text="History"
          active={location.pathname === "/history"}
        />

      </div>

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>

        <div style={{
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          Automobile Management Dashboard
        </div>

        <div style={{
          padding: "20px"
        }}>

          {children}

        </div>

      </div>

    </div>
  );
}

function SidebarItem({
  icon,
  text,
  to,
  active
}) {

  return (

    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "white"
      }}
    >

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "15px",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "10px",
        backgroundColor: active
          ? "white"
          : "rgba(255,255,255,0.1)",

        color: active
          ? "#0d47a1"
          : "white",

        fontWeight: active
          ? "bold"
          : "normal"
      }}>

        {icon}

        <span>{text}</span>

      </div>

    </Link>
  );
}

export default Layout;