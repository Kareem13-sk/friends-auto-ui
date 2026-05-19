import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Customers", path: "/customers" },
    { name: "Products", path: "/products" },
    { name: "Billing", path: "/billing" },
    { name: "History", path: "/history" },
    { name: "Customer Details", path: "/customer-details" }
  ];

  return (

    <div style={{
      backgroundColor: "#0d47a1",
      height: "100%",
      padding: "25px 20px",
      color: "white"
    }}>

      <h1 style={{
        textAlign: "center",
        marginBottom: "40px",
        lineHeight: "55px",
        fontSize: "52px"
      }}>
        Friends Auto Mobile
      </h1>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }}>

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              backgroundColor:
                location.pathname === item.path
                  ? "white"
                  : "rgba(255,255,255,0.12)",

              color:
                location.pathname === item.path
                  ? "#0d47a1"
                  : "white",

              padding: "18px",
              borderRadius: "14px",
              fontSize: "24px",
              fontWeight: "600"
            }}
          >
            {item.name}
          </Link>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;