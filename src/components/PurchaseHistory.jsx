import { useEffect, useState } from "react";
import axios from "axios";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/Bills"
      );

      setBills(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: "30px",
          fontSize: "48px",
        }}
      >
        Bills History
      </h1>

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr
              style={{
                background: "#0d47a1",
                color: "white",
              }}
            >
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Balance</th>
            </tr>

          </thead>

          <tbody>

            {bills.map((bill) => (

              <tr key={bill.id}>

                <td style={tdStyle}>
                  {bill.customerName}
                </td>

                <td style={tdStyle}>
                  ₹{bill.totalAmount}
                </td>

                <td style={tdStyle}>
                  ₹{bill.paidAmount}
                </td>

                <td style={tdStyle}>
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

const thStyle = {
  padding: "16px",
  fontSize: "18px",
};

const tdStyle = {
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

export default PurchaseHistory;