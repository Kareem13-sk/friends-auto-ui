import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [filteredCustomers,
    setFilteredCustomers] = useState([]);

  const [bills, setBills] =
    useState([]);

  const [totalPurchase,
    setTotalPurchase] = useState(0);

  const [totalPaid,
    setTotalPaid] = useState(0);

  const [pendingBalance,
    setPendingBalance] = useState(0);

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      setCustomers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const searchCustomer = async () => {

    try {

      const response = await axios.get(
        `https://friends-auto-backend-1utc.onrender.com/bills/customer/${customerName}`
      );

      setBills(response.data);

      let purchase = 0;
      let paid = 0;
      let balance = 0;

      response.data.forEach((bill) => {

        purchase += bill.totalAmount || 0;
        paid += bill.paidAmount || 0;
        balance += bill.balanceAmount || 0;
      });

      setTotalPurchase(purchase);
      setTotalPaid(paid);
      setPendingBalance(balance);

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
          flexWrap: "wrap",
          alignItems: "flex-start"
        }}>

          <div style={{
            position: "relative",
            width: "350px"
          }}>

            <input
              type="text"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) => {

                const value = e.target.value;

                setCustomerName(value);

                if (value.length > 0) {

                  const filtered =
                    customers.filter((customer) =>
                      customer.customerName
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    );

                  setFilteredCustomers(filtered);

                } else {

                  setFilteredCustomers([]);
                }
              }}
              style={inputStyle}
            />

            {filteredCustomers.length > 0 && (

              <div style={{
                position: "absolute",
                width: "100%",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                marginTop: "5px",
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0,0,0,0.1)"
              }}>

                {filteredCustomers.map((customer) => (

                  <div
                    key={customer.id}
                    onClick={() => {

                      setCustomerName(
                        customer.customerName
                      );

                      setFilteredCustomers([]);
                    }}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                      borderBottom:
                        "1px solid #eee"
                    }}
                  >

                    {customer.customerName}

                  </div>

                ))}

              </div>

            )}

          </div>

          <button
            onClick={searchCustomer}
            style={buttonStyle}
          >
            Search
          </button>

        </div>

      </div>

      {/* SUMMARY CARDS */}

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "25px"
      }}>

        <div style={cardStyle}>

          <h3>Total Purchase</h3>

          <h1>₹{totalPurchase}</h1>

        </div>

        <div style={cardStyle}>

          <h3>Total Paid</h3>

          <h1>₹{totalPaid}</h1>

        </div>

        <div style={cardStyle}>

          <h3>Pending Balance</h3>

          <h1>₹{pendingBalance}</h1>

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
            borderCollapse: "collapse"
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
                    ₹{bill.totalAmount}
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
                        textDecoration: "none",
                        color: "#0d47a1",
                        fontWeight: "bold"
                      }}
                    >
                      Download
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

const inputStyle = {
  width: "100%",
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

const cardStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "30px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.15)"
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