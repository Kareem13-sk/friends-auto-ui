import { useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [bills, setBills] = useState([]);

  const [summary, setSummary] = useState({
    totalPurchase: 0,
    totalPaid: 0,
    totalBalance: 0
  });

  const searchCustomer = async () => {

    try {

      const response =
        await axios.get(
          `https://friends-auto-backend-1utc.onrender.com/bills/customer/${customerName}`
        );

      const billData = response.data;

      setBills(billData);

      const totalPurchase =
        billData.reduce(
          (sum, bill) =>
            sum + bill.finalAmount,
          0
        );

      const totalPaid =
        billData.reduce(
          (sum, bill) =>
            sum + bill.paidAmount,
          0
        );

      const totalBalance =
        billData.reduce(
          (sum, bill) =>
            sum + bill.balanceAmount,
          0
        );

      setSummary({
        totalPurchase,
        totalPaid,
        totalBalance
      });

    } catch (error) {

      console.log(error);

      alert("Customer not found");
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
          Customer Details
        </h1>

      </div>

      {/* SEARCH SECTION */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow:
          "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          Search Customer
        </h2>

        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}>

          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
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

      </div>

      {/* SUMMARY */}

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",

        gap: "20px",
        marginBottom: "30px"
      }}>

        <SummaryCard
          title="Total Purchase"
          value={`₹${summary.totalPurchase.toFixed(2)}`}
        />

        <SummaryCard
          title="Total Paid"
          value={`₹${summary.totalPaid.toFixed(2)}`}
        />

        <SummaryCard
          title="Pending Balance"
          value={`₹${summary.totalBalance.toFixed(2)}`}
        />

      </div>

      {/* TABLE */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow:
          "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          Bill History
        </h2>

        <div style={{
          overflowX: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px"
          }}>

            <thead>

              <tr style={{
                backgroundColor: "#0d47a1",
                color: "white"
              }}>

                <th style={tableHeader}>
                  Total
                </th>

                <th style={tableHeader}>
                  GST
                </th>

                <th style={tableHeader}>
                  Final
                </th>

                <th style={tableHeader}>
                  Paid
                </th>

                <th style={tableHeader}>
                  Balance
                </th>

                <th style={tableHeader}>
                  Invoice
                </th>

              </tr>

            </thead>

            <tbody>

              {bills.map((bill) => (

                <tr key={bill.id}>

                  <td style={tableCell}>
                    ₹{bill.subtotal}
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
                      href={`https://friends-auto-backend-1utc.onrender.com/bills/${bill.id}/invoice`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#0d47a1",
                        fontWeight: "600",
                        textDecoration: "none"
                      }}
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

    </div>
  );
}

function SummaryCard({
  title,
  value
}) {

  return (

    <div style={{
      backgroundColor: "#0d47a1",
      color: "white",
      padding: "30px",
      borderRadius: "18px",
      textAlign: "center",
      boxShadow:
        "0px 4px 15px rgba(0,0,0,0.15)"
    }}>

      <h3 style={{
        marginBottom: "15px",
        fontSize: "22px"
      }}>
        {title}
      </h3>

      <h1 style={{
        margin: 0,
        fontSize: "38px"
      }}>
        {value}
      </h1>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  maxWidth: "350px",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600"
};

const tableHeader = {
  padding: "16px",
  textAlign: "left",
  fontSize: "16px"
};

const tableCell = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px"
};

export default CustomerDetails;