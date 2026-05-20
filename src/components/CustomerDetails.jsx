import { useEffect, useState } from "react";
import axios from "axios";

import engineBanner from "../assets/engine-banner.jpg";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [selectedCustomer,
    setSelectedCustomer] =
    useState(null);

  const [bills, setBills] =
    useState([]);

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

  const searchCustomer = async () => {

    try {

      const customer =
        customers.find(
          (c) =>
            c.customerName
              .toLowerCase()
              .includes(
                customerName.toLowerCase()
              )
        );

      if (!customer) {

        alert("Customer Not Found");

        return;
      }

      setSelectedCustomer(customer);

      const response =
        await axios.get(
          `https://friends-auto-backend-1utc.onrender.com/bills/customer/${customer.customerName}`
        );

      setBills(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalPurchase =
    bills.reduce(
      (acc, bill) =>
        acc + bill.finalAmount,
      0
    );

  const totalPaid =
    bills.reduce(
      (acc, bill) =>
        acc + bill.paidAmount,
      0
    );

  const pendingBalance =
    bills.reduce(
      (acc, bill) =>
        acc + bill.balanceAmount,
      0
    );

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "30px",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >

          <img
            src={engineBanner}
            alt="Engine Banner"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              display: "block"
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
              boxSizing: "border-box"
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize:
                  "clamp(32px,5vw,60px)",
                marginBottom: "15px"
              }}
            >
              Customer Details
            </h1>

            <p
              style={{
                color: "white",
                fontSize:
                  "clamp(16px,2vw,28px)"
              }}
            >
              Engine Spare Parts Purchase
              History
            </p>

          </div>

        </div>

        {/* SEARCH SECTION */}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "25px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              marginBottom: "30px",
              fontSize:
                "clamp(32px,5vw,55px)"
            }}
          >
            Customer Details
          </h1>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "25px"
            }}
          >

            <input
              type="text"
              placeholder="Search Customer"
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "14px",
                borderRadius: "12px",
                border:
                  "1px solid #ccc",
                fontSize: "16px",
                boxSizing:
                  "border-box"
              }}
            />

            <button
              onClick={searchCustomer}
              style={{
                backgroundColor:
                  "#1565c0",
                color: "white",
                border: "none",
                padding:
                  "14px 24px",
                borderRadius:
                  "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Search
            </button>

          </div>

          {/* SUMMARY CARDS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}
          >

            <div style={cardStyle}>

              <h2>Total Purchase</h2>

              <h1>
                ₹
                {totalPurchase.toFixed(
                  0
                )}
              </h1>

            </div>

            <div style={cardStyle}>

              <h2>Total Paid</h2>

              <h1>
                ₹
                {totalPaid.toFixed(0)}
              </h1>

            </div>

            <div style={cardStyle}>

              <h2>Pending Balance</h2>

              <h1>
                ₹
                {pendingBalance.toFixed(
                  0
                )}
              </h1>

            </div>

          </div>

          {/* BILL HISTORY */}

          <div
            style={{
              marginTop: "20px",
              overflowX: "auto"
            }}
          >

            <h2
              style={{
                color: "#0d47a1",
                marginBottom: "20px"
              }}
            >
              Bill History
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "700px"
              }}
            >

              <thead>

                <tr
                  style={{
                    backgroundColor:
                      "#0d47a1",
                    color: "white"
                  }}
                >

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
                      ₹
                      {bill.finalAmount.toFixed(
                        0
                      )}
                    </td>

                    <td style={tableCell}>
                      ₹
                      {bill.paidAmount.toFixed(
                        0
                      )}
                    </td>

                    <td style={tableCell}>
                      ₹
                      {bill.balanceAmount.toFixed(
                        0
                      )}
                    </td>

                    <td style={tableCell}>

                      <a
                        href={`https://friends-auto-backend-1utc.onrender.com/bills/${bill.id}/invoice`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textDecoration:
                            "none",
                          backgroundColor:
                            "#1565c0",
                          color: "white",
                          padding:
                            "10px 18px",
                          borderRadius:
                            "10px",
                          fontWeight:
                            "600"
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

    </div>
  );
}

const cardStyle = {

  backgroundColor: "#0d47a1",
  color: "white",
  padding: "30px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow:
    "0 5px 15px rgba(0,0,0,0.1)"

};

const tableHeader = {

  padding: "16px",
  textAlign: "left",
  fontSize: "16px"

};

const tableCell = {

  padding: "16px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px"

};

export default CustomerDetails;