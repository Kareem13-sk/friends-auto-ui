import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

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

    <div>

      <h1 style={{
        color: "#0d47a1",
        marginBottom: "25px",
        fontSize: "34px"
      }}>
        Dashboard
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",

        gap: "20px"
      }}>

        <Card
          title="Total Customers"
          value={customers.length}
        />

        <Card
          title="Total Products"
          value={products.length}
        />

        <Card
          title="Total Bills"
          value={bills.length}
        />

      </div>

    </div>
  );
}

function Card({ title, value }) {

  const cardStyle = {
    backgroundColor: "#0d47a1",
    color: "white",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
    textAlign: "center"
  };

  return (

    <div style={cardStyle}>

      <h2 style={{
        marginBottom: "15px",
        fontSize: "24px"
      }}>
        {title}
      </h2>

      <h1 style={{
        fontSize: "48px",
        margin: 0
      }}>
        {value}
      </h1>

    </div>
  );
}

export default Dashboard;