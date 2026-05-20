import { useEffect, useState } from "react";
import axios from "axios";

import engineBanner from "../assets/engine-banner.jpg";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

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
              ?.toLowerCase()
              .includes(
                customerName.toLowerCase()
              )
        );

      if (!customer) {

        alert("Customer Not Found");

        return;
      }

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
        acc + (bill.finalAmount || 0),
      0
    );

  const totalPaid =
    bills.reduce(
      (acc, bill) =>
        acc + (bill.paidAmount || 0),
      0
    );

  const pendingBalance =
    bills.reduce(
      (acc, bill) =>
        acc + (bill.balanceAmount || 0),
      0
    );

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            borderRadius: "25px",
            overflow: "hidden",
            marginBottom: "30px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.15)"
          }}
        >

          <img
            src={engineBanner}
            alt="Engine"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize:
                  "clamp(35px,5vw,65px)",
                marginBottom: "10px",
                fontWeight: "bold"
              }}
            >
              Customer Details
            </h1>

            <p
              style={{
                color: "white",
                fontSize:
                  "clamp(18px,2vw,28px)"
              }}
            >
              Engine Spare Parts Purchase History
            </p>

          </div>

        </div>

        {/* MAIN SECTION */}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "30px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              marginBottom: "30px",
              fontSize:
                "clamp(35px,5vw,55px)"
            }}
          >
            Customer Details
          </h1>

          {/* SEARCH */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px"
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
                minWidth: "250px",
                padding: "15px",
                borderRadius: "12px",
                border:
                  "1px solid #ccc",
                fontSize: "16px"
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
                  "15px 25px",
                borderRadius:
                  "12px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold"
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
              marginBottom: "35px"
            }}
          >

            <div style={cardStyle}>

              <h2>Total Purchase</h2>

              <h1>
                ₹
                {Math.round(
                  totalPurchase
                )}
              </h1>

            </div>

            <div style={cardStyle}>

              <h2>Total Paid</h2>

              <h1>
                ₹
                {Math.round(
                  totalPaid
                )}
              </h1>

            </div>

            <div style={cardStyle}>

              <h2>Pending Balance</h2>

              <h1>
                ₹
                {Math.round(
                  pendingBalance
                )}
              </h1>

            </div>

          </div>

          {/* BILL TABLE */}

          <div
            style={{
              overflowX: "auto"
            }}
          >

            <h2
              style={{
                color: "#0d47a1",
                marginBottom: "20px",
                fontSize: "32px"
              }}
            >
              Bill History
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "700px",
                background: "white"
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
                      {Math.round(
                        bill.finalAmount || 0
                      )}
                    </td>

                    <td style={tableCell}>
                      ₹
                      {Math.round(
                        bill.paidAmount || 0
                      )}
                    </td>

                    <td style={tableCell}>
                      ₹
                      {Math.round(
                        bill.balanceAmount || 0
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
                            "bold"
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

  padding: "18px",
  textAlign: "left",
  fontSize: "16px"

};

const tableCell = {

  padding: "18px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px"

};

export default CustomerDetails;