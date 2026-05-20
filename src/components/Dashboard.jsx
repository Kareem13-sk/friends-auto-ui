import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const customerResponse = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      const productResponse = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

      const billResponse = await axios.get(
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

    <div
      style={{
        padding: "20px",
        backgroundColor: "#eef2f7",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: "40px",
          fontSize: "45px"
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px"
        }}
      >

        {/* CUSTOMERS */}

        <div
          onClick={() => navigate("/customers")}
          style={cardStyle}
        >
          <h2>Total Customers</h2>

          <h1>{customers.length}</h1>
        </div>

        {/* PRODUCTS */}

        <div
          onClick={() => navigate("/products")}
          style={cardStyle}
        >
          <h2>Total Products</h2>

          <h1>{products.length}</h1>
        </div>

        {/* BILLS */}

        <div
          onClick={() => navigate("/history")}
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
  padding: "35px",
  borderRadius: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  transition: "0.3s"
};

export default Dashboard;