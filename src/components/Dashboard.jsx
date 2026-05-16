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

    const customerResponse =
      await axios.get("http://localhost:8080/customers");

    const productResponse =
      await axios.get("http://localhost:8080/products");

    const billResponse =
      await axios.get("http://localhost:8080/bills");

    setCustomers(customerResponse.data);
    setProducts(productResponse.data);
    setBills(billResponse.data);
  };

//   const totalBalance = bills.reduce(
//     (sum, bill) => sum + bill.balanceAmount,
//     0
//   );

  return (

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginBottom: "30px"
    }}>

      <Card
        title="Customers"
        value={customers.length}
      />

      <Card
        title="Products"
        value={products.length}
      />

      <Card
        title="Bills"
        value={bills.length}
      />

      {/* <Card
        title="Pending Balance"
        value={`₹${totalBalance}`}
      /> */}

    </div>
  );
}

function Card({ title, value }) {

  return (

    <div style={{
      backgroundColor: "#0d47a1",
      color: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.2)"
    }}>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}

export default Dashboard;