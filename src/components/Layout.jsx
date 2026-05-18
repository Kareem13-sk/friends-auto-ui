import {
  FaUsers,
  FaBox,
  FaFileInvoice,
  FaHistory,
  FaChartBar,
  FaUserCircle,
  FaBars
} from "react-icons/fa";

import {
  Link,
  useLocation
} from "react-router-dom";

import { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  return (

    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7fb"
    }}>

      {/* MOBILE HEADER */}

      {isMobile && (

        <div style={{
          backgroundColor: "#0d47a1",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px"
        }}>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "22px",
              cursor: "pointer"
            }}
          >
            <FaBars />
          </button>

          <h2 style={{
            margin: 0,
            fontSize: "22px"
          }}>
            Friends Auto Mobile
          </h2>

        </div>
      )}

      <div style={{
        display: "flex"
      }}>

        {/* SIDEBAR */}

        <div style={{
          width: isMobile
            ? menuOpen
              ? "230px"
              : "0px"
            : "250px",

          overflow: "hidden",

          transition: "0.3s",

          backgroundColor: "#0d47a1",

          color: "white",

          minHeight: "100vh",

          position: isMobile
            ? "fixed"
            : "relative",

          zIndex: 1000
        }}>

          <div style={{
            padding: "25px"
          }}>

            <h1 style={{
              textAlign: "center",
              lineHeight: "45px",
              marginBottom: "40px",
              fontSize: "38px"
            }}>
              Friends
              <br />
              Auto
              <br />
              Mobile
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

            <SidebarItem
              to="/customer-details"
              icon={<FaUserCircle />}
              text="Customer Details"
              active={location.pathname === "/customer-details"}
            />

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div style={{
          flex: 1,
          width: "100%"
        }}>

          {!isMobile && <Header />}

          <div style={{
            padding: isMobile
              ? "12px"
              : "25px"
          }}>

            {children}

          </div>

          <Footer />

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
        textDecoration: "none"
      }}
    >

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",

        backgroundColor: active
          ? "white"
          : "rgba(255,255,255,0.12)",

        color: active
          ? "#0d47a1"
          : "white",

        padding: "16px",
        borderRadius: "12px",
        marginBottom: "14px",
        fontSize: "18px",
        fontWeight: "600"
      }}>

        {icon}

        <span>{text}</span>

      </div>

    </Link>
  );
}

export default Layout;