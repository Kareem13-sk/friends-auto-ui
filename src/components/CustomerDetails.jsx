import { useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customerName, setCustomerName] = useState("");

  const [bills, setBills] = useState([]);

  const [summary, setSummary] = useState({
    totalPurchase: 0,
    totalPaid: 0,
    totalBalance: 0
  });

  const searchCustomer = async () => {

    const response =
      await axios.get(
        `http://localhost:8080/bills/customer/${customerName}`
      );

    const billData = response.data;

    setBills(billData);

    const totalPurchase =
      billData.reduce(
        (sum, bill) => sum + bill.finalAmount,
        0
      );

    const totalPaid =
      billData.reduce(
        (sum, bill) => sum + bill.paidAmount,
        0
      );

    const totalBalance =
      billData.reduce(
        (sum, bill) => sum + bill.balanceAmount,
        0
      );

    setSummary({
      totalPurchase,
      totalPaid,
      totalBalance
    });
  };

  return (

    <div style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ color: "black" }}>
        Customer Details
      </h2>

      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>

        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={searchCustomer}
          style={buttonStyle}
        >
          Search
        </button>

      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",

        gap: "20px",
        marginBottom: "30px"
      }}>

        <SummaryCard
          title="Total Purchase"
          value={`₹${summary.totalPurchase}`}
        />

        <SummaryCard
          title="Total Paid"
          value={`₹${summary.totalPaid}`}
        />

        <SummaryCard
          title="Pending Balance"
          value={`₹${summary.totalBalance}`}
        />

      </div>

      <div style={{ overflowX: "auto" }}>

        <table style={{
          width: "100%",
          borderCollapse: "collapse"
        }}>

          <thead>

            <tr style={{
              backgroundColor: "#0d47a1",
              color: "white"
            }}>

              <th style={tableHeader}>Total</th>
              <th style={tableHeader}>GST</th>
              <th style={tableHeader}>Final</th>
              <th style={tableHeader}>Paid</th>
              <th style={tableHeader}>Balance</th>
              <th style={tableHeader}>Invoice</th>

            </tr>

          </thead>

          <tbody>

            {bills.map((bill) => (

              <tr key={bill.id}>

                <td style={tableCell}>
                  ₹{bill.totalAmount}
                </td>

                <td style={tableCell}>
                  ₹{bill.gst}
                </td>

                <td style={tableCell}>
                  ₹{bill.finalAmount}
                </td>

                <td style={tableCell}>
                  ₹{bill.paidAmount}
                </td>

                <td style={tableCell}>
                  ₹{bill.balanceAmount}
                </td>

                <td style={tableCell}>

                  <a
                    href={`http://localhost:8080/bills/${bill.id}/invoice`}
                    target="_blank"
                  >
                    Download PDF
                  </a>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function SummaryCard({ title, value }) {

  return (

    <div style={{
      backgroundColor: "#0d47a1",
      color: "white",
      padding: "20px",
      borderRadius: "10px"
    }}>

      <h3>{title}</h3>

      <h1>{value}</h1>

    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "300px"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer"
};

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default CustomerDetails;