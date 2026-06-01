import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import engineBanner from "../assets/engine-banner.jpg";

function Dashboard() {

  const [customers, setCustomers] = useState([]);
const [products, setProducts] = useState([]);
const [bills, setBills] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {

  fetch("https://friends-auto-backend-1utc.onrender.com/customers")
    .then((res) => res.json())
    .then((data) => setCustomers(data))
    .catch((err) => console.log(err));

  fetch("https://friends-auto-backend-1utc.onrender.com/products")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => console.log(err));

  fetch("https://friends-auto-backend-1utc.onrender.com/bills")
    .then((res) => res.json())
    .then((data) => setBills(data))
    .catch((err) => console.log(err));

}, []);

  return (
    <div>

      {/* HERO SECTION */}

      <div
        style={{
          position: "relative",
          borderRadius: "25px",
          overflow: "hidden",
          marginBottom: "35px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={engineBanner}
          alt="Engine"
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Friends Auto Mobiles
          </h1>

          <p
            style={{
              fontSize: "28px",
            }}
          >
            Engine Spare Parts Billing
          </p>
        </div>
      </div>

      {/* DASHBOARD CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "30px",
        }}
      >

        {/* CUSTOMERS */}

        <div
          onClick={() => navigate("/customers")}
          style={cardStyle}
        >
          <h2>Total Customers</h2>

          <h1>{customers.length}</h1>

          <p>Click to view customers list</p>
        </div>

        {/* PRODUCTS */}

        <div
          onClick={() => navigate("/products")}
          style={cardStyle}
        >
          <h2>Total Products</h2>

          <h1>{products.length}</h1>

          <p>Click to view products</p>
        </div>

        {/* BILLS */}

        <div
          onClick={() => navigate("/history")}
          style={cardStyle}
        >
          <h2>Total Bills</h2>

          <h1>{bills.length}</h1>

          <p>Click to view bills history</p>
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  background:
    "linear-gradient(to right,#1565c0,#0d47a1)",

  borderRadius: "25px",

  padding: "40px",

  color: "white",

  textAlign: "center",

  cursor: "pointer",

  transition: "0.3s",

  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
};

export default Dashboard;