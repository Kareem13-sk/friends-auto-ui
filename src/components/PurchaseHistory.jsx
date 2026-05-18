import { useState } from "react";
import axios from "axios";

function PurchaseHistory() {

  const [customerName, setCustomerName] =
    useState("");

  const [bills, setBills] = useState([]);

  const searchBills = async () => {

    try {

      const response =
        await axios.get(
          `https://friends-auto-backend-1utc.onrender.com/bills/customer/${customerName}`
        );

      setBills(response.data);

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
          Purchase History
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
          Search Customer History
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
            onClick={searchBills}
            style={buttonStyle}
          >
            Search
          </button>

        </div>

      </div>

      {/* TABLE SECTION */}

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
                  Customer
                </th>

                <th style={tableHeader}>
                  Subtotal
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

              </tr>

            </thead>

            <tbody>

              {bills.map((bill) => (

                <tr key={bill.id}>

                  <td style={tableCell}>
                    {bill.customerName}
                  </td>

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

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

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

export default PurchaseHistory;