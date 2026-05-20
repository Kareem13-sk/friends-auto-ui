import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [bills, setBills] =
    useState([]);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const customerResponse =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/customers"
        );

      const productResponse =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/products"
        );

      const billResponse =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/bills"
        );

      setCustomers(customerResponse.data);
      setProducts(productResponse.data);
      setBills(billResponse.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div style={{
      padding: "20px",
      backgroundColor: "#f4f7fb",
      minHeight: "100vh"
    }}>

      {/* HEADER */}

      <div style={{
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "25px",
        boxShadow:
          "0px 4px 12px rgba(0,0,0,0.15)"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "32px"
        }}>
          Dashboard
        </h1>

      </div>

      {/* DASHBOARD CARDS */}

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginTop: "30px"
      }}>

        {/* CUSTOMERS CARD */}

        <div
          onClick={() =>
            window.location.href = "/customers"
          }
          style={cardStyle}
        >

          <h2>Total Customers</h2>

          <h1>{customers.length}</h1>

        </div>

        {/* PRODUCTS CARD */}

        <div
          onClick={() =>
            window.location.href = "/products"
          }
          style={cardStyle}
        >

          <h2>Total Products</h2>

          <h1>{products.length}</h1>

        </div>

        {/* BILLS CARD */}

        <div
          onClick={() =>
            window.location.href = "/history"
          }
          style={cardStyle}
        >

          <h2>Total Bills</h2>

          <h1>{bills.length}</h1>

        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.15)",
  transition: "0.3s"
};

export default Dashboard;