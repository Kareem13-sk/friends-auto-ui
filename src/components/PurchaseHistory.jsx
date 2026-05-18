import { useState } from "react";
import axios from "axios";

function PurchaseHistory() {

  const [customerName, setCustomerName] = useState("");

  const [bills, setBills] = useState([]);

  const searchBills = async () => {

    const response =
      await axios.get(
        `https://friends-auto-backend-1utc.onrender.com/${customerName}`
      );

    setBills(response.data);
  };

  return (

    <div style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "30px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ color: "black" }}>
        Customer Purchase History
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
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "300px"
          }}
        />

        <button
          onClick={searchBills}
          style={{
            backgroundColor: "#0d47a1",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Search
        </button>

      </div>

      <div style={{ overflowX: "auto" }}>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr style={{
              backgroundColor: "#0d47a1",
              color: "white"
            }}>

              <th style={tableHeader}>Customer</th>
              <th style={tableHeader}>Total</th>
              <th style={tableHeader}>GST</th>
              <th style={tableHeader}>Final</th>
              <th style={tableHeader}>Paid</th>
              <th style={tableHeader}>Balance</th>

            </tr>

          </thead>

          <tbody>

            {bills.map((bill) => (

              <tr key={bill.id}>

                <td style={tableCell}>
                  {bill.customerName}
                </td>

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

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default PurchaseHistory;