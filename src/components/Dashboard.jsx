import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetch("https://friends-auto-backend.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));

    fetch("https://friends-auto-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));

    fetch("https://friends-auto-backend.onrender.com/bills")
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.log(err));
  }, []);

  const cardStyle = {
    background: "linear-gradient(135deg,#1565c0,#0d47a1)",
    borderRadius: "24px",
    padding: "30px",
    color: "white",
    width: "320px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center"
  };

  return (
    <div>
      <div
        style={{
          background: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "60px",
          fontWeight: "bold",
          color: "#0d47a1"
        }}
      >
        Friends Auto Mobile
      </div>

      <div
        style={{
          marginTop: "20px",
          borderRadius: "30px",
          overflow: "hidden"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1600&auto=format&fit=crop"
          alt=""
          style={{
            width: "100%",
            height: "420px",
            objectFit: "cover"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "40px",
          flexWrap: "wrap"
        }}
      >
        <div
          style={cardStyle}
          onClick={() => navigate("/customers")}
        >
          <h2>Total Customers</h2>

          <h1>{customers.length}</h1>

          <p>Click to view customers list</p>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/products")}
        >
          <h2>Total Products</h2>

          <h1>{products.length}</h1>

          <p>Click to view products</p>
        </div>

        <div
          style={cardStyle}
          onClick={() => navigate("/history")}
        >
          <h2>Total Bills</h2>

          <h1>{bills.length}</h1>

          <p>Click to view bills history</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#0d47a1",
          color: "white",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        © 2026 Friends Auto Mobile | All Rights Reserved
      </div>
    </div>
  );
}

export default Dashboard;