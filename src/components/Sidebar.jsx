import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Billing", path: "/billing" },
    { name: "Purchase History", path: "/history" },
    { name: "Customer Details", path: "/customer-details" },
  ];

  return (

    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#0d47a1,#002b6b)",
        padding: "30px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        position: "sticky",
        top: 0
      }}
    >

      {/* LOGO */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "40px"
        }}
      >

        <h1
          style={{
            color: "white",
            fontSize: "clamp(32px,4vw,58px)",
            lineHeight: "1.1",
            fontWeight: "700",
            margin: 0
          }}
        >
          Friends Auto
        </h1>

      </div>

      {/* MENU */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
      >

        {menuItems.map((item) => {

          const isActive =
            location.pathname === item.path;

          return (

            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none"
              }}
            >

              <div
                style={{
                  backgroundColor: isActive
                    ? "white"
                    : "rgba(255,255,255,0.12)",

                  color: isActive
                    ? "#0d47a1"
                    : "white",

                  padding: "18px",
                  borderRadius: "18px",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: "600",
                  transition: "0.3s",
                  cursor: "pointer",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.15)"
                }}
              >
                {item.name}
              </div>

            </Link>

          );
        })}

      </div>

    </div>
  );
}

export default Sidebar;