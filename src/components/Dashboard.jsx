import { useEffect, useState } from "react";
import axios from "axios";

import engineBanner from "../assets/engine-banner.jpg";

function Dashboard() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const customerRes = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      const productRes = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

      const billRes = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/bills"
      );

      setCustomers(customerRes.data);
      setProducts(productRes.data);
      setBills(billRes.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px"
      }}
    >

      {/* HERO SECTION */}

      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "30px",
          boxShadow:
            "0 6px 18px rgba(0,0,0,0.15)"
        }}
      >

        <img
          src={engineBanner}
          alt="Engine Banner"
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            display: "block"
          }}
        />

        {/* OVERLAY */}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
            boxSizing: "border-box"
          }}
        >

          <h1
            style={{
              color: "white",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: "700",
              marginBottom: "15px"
            }}
          >
            Friends Auto Mobile
          </h1>

          <p
            style={{
              color: "white",
              fontSize: "clamp(16px, 2vw, 24px)",
              maxWidth: "700px",
              lineHeight: "1.5"
            }}
          >
            Engine Spare Parts Billing &
            Inventory Management
          </p>

        </div>

      </div>

      {/* DASHBOARD CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}
      >

        <DashboardCard
          title="Total Customers"
          value={customers.length}
        />

        <DashboardCard
          title="Total Products"
          value={products.length}
        />

        <DashboardCard
          title="Total Bills"
          value={bills.length}
        />

      </div>

    </div>
  );
}

/* CARD COMPONENT */

function DashboardCard({ title, value }) {

  return (

    <div
      style={{
        background:
          "linear-gradient(135deg,#0d47a1,#1565c0)",
        borderRadius: "20px",
        padding: "35px 20px",
        color: "white",
        textAlign: "center",
        boxShadow:
          "0 6px 15px rgba(0,0,0,0.15)"
      }}
    >

      <h2
        style={{
          marginBottom: "20px",
          fontSize: "26px"
        }}
      >
        {title}
      </h2>

      <h1
        style={{
          fontSize: "55px",
          margin: 0,
          fontWeight: "700"
        }}
      >
        {value}
      </h1>

    </div>
  );
}

export default Dashboard;