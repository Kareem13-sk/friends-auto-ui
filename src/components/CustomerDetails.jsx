import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [filteredCustomers, setFilteredCustomers] =
    useState([]);

  const [bills, setBills] = useState([]);

  const [totalPurchase, setTotalPurchase] =
    useState(0);

  const [totalPaid, setTotalPaid] =
    useState(0);

  const [pendingBalance, setPendingBalance] =
    useState(0);

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    try {

      const response =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/customers"
        );

      setCustomers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCustomerInput = (value) => {

    setCustomerName(value);

    if (value.length > 0) {

      const filtered =
        customers.filter((customer) =>
          customer.customerName
            ?.toLowerCase()
            .includes(value.toLowerCase())
        );

      setFilteredCustomers(filtered);

    } else {

      setFilteredCustomers([]);
    }
  };

  const selectCustomer = (name) => {

    setCustomerName(name);

    setFilteredCustomers([]);
  };

  const searchCustomer = async () => {

    try {

      const response =
        await axios.get(
          `https://friends-auto-backend-1utc.onrender.com/bills/customer/${customerName}`
        );

      const data = response.data;

      setBills(data);

      let purchase = 0;

      let paid = 0;

      let balance = 0;

      data.forEach((bill) => {

        purchase += bill.finalAmount || 0;

        paid += bill.paidAmount || 0;

        balance += bill.balanceAmount || 0;
      });

      setTotalPurchase(purchase);

      setTotalPaid(paid);

      setPendingBalance(balance);

    } catch (error) {

      console.log(error);

      alert("Customer Not Found");
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
        textAlign: "center",
        boxShadow:
          "0px 4px 12px rgba(0,0,0,0.15)"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "34px"
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
        position: "relative",
        boxShadow:
          "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          Search Customer
        </h2>

        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}>

          <div style={{
            flex: 1,
            position: "relative"
          }}>

            <input
              type="text"
              placeholder="Enter Customer Name"
              value={customerName}
              onChange={(e) =>
                handleCustomerInput(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            {/* DROPDOWN */}

            {filteredCustomers.length > 0 && (

              <div style={{
                position: "absolute",
                top: "55px",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                zIndex: 1000,
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow:
                  "0px 4px 10px rgba(0,0,0,0.15)"
              }}>

                {filteredCustomers.map((customer) => (

                  <div
                    key={customer.id}
                    onClick={() =>
                      selectCustomer(
                        customer.customerName
                      )
                    }
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

          <h2>Total Purchase</h2>

          <h1>
            ₹{totalPurchase.toFixed(0)}
          </h1>

        </div>

        <div style={cardStyle}>

          <h2>Total Paid</h2>

          <h1>
            ₹{totalPaid.toFixed(0)}
          </h1>

        </div>

        <div style={cardStyle}>

          <h2>Pending Balance</h2>

          <h1>
            ₹{pendingBalance.toFixed(0)}
          </h1>

        </div>

      </div>

      {/* BILL HISTORY */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow:
          "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px",
          textAlign: "center"
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
                    ₹{bill.finalAmount?.toFixed(0)}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.paidAmount?.toFixed(0)}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.balanceAmount?.toFixed(0)}
                  </td>

                  <td style={tableCell}>

                    <a
                      href={`https://friends-auto-backend-1utc.onrender.com/bills/${bill.id}/invoice`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        backgroundColor:
                          "#0d47a1",
                        color: "white",
                        padding:
                          "10px 15px",
                        borderRadius: "8px",
                        textDecoration:
                          "none"
                      }}
                    >
                      View Invoice
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
  borderRadius: "20px",
  textAlign: "center",
  boxShadow:
    "0px 4px 15px rgba(0,0,0,0.15)"
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