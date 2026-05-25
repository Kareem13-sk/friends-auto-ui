import React, { useEffect, useState } from "react";

function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchCustomers();
    fetchBills();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      const data = await response.json();

      setCustomers(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBills = async () => {
    try {
      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/bills"
      );

      const data = await response.json();

      setBills(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const customerBills = bills.filter((bill) => {
    const customerMatch =
      bill.customerName
        ?.toLowerCase()
        .includes(selectedCustomer.toLowerCase());

    if (!selectedDate) {
      return customerMatch;
    }

    const billDate = bill.createdAt
      ? new Date(bill.createdAt)
          .toISOString()
          .split("T")[0]
      : "";

    return customerMatch && billDate === selectedDate;
  });

  const totalPurchase = customerBills.reduce(
    (sum, bill) => sum + Number(bill.totalAmount || 0),
    0
  );

  const pendingBalance = customerBills.reduce(
    (sum, bill) => sum + Number(bill.balanceAmount || 0),
    0
  );

  const downloadBill = (bill) => {
    const invoiceWindow = window.open("", "_blank");

    invoiceWindow.document.write(`
      <html>
      <head>
        <title>Invoice</title>

        <style>

          body{
            font-family:Arial;
            padding:20px;
          }

          h1{
            color:#0d47a1;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th,td{
            border:1px solid #ccc;
            padding:10px;
            text-align:center;
          }

          th{
            background:#0d47a1;
            color:white;
          }

        </style>

      </head>

      <body>

        <h1>Friends Auto Mobile</h1>

        <h3>Customer : ${bill.customerName}</h3>

        <p>
          Date :
          ${
            bill.createdAt
              ? new Date(
                  bill.createdAt
                ).toLocaleDateString()
              : new Date().toLocaleDateString()
          }
        </p>

        <p>
          Total Amount :
          ₹${Number(bill.totalAmount || 0).toFixed(2)}
        </p>

        <p>
          Paid Amount :
          ₹${Number(bill.paidAmount || 0).toFixed(2)}
        </p>

        <p>
          Balance Amount :
          ₹${Number(
            bill.balanceAmount || 0
          ).toFixed(2)}
        </p>

        <table>

          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            ${(bill.items || [])
              .map(
                (item) => `
                  <tr>
                    <td>${item.productName || "-"}</td>
                    <td>${item.quantity || 0}</td>
                    <td>₹${Number(
                      item.finalPrice || 0
                    ).toFixed(2)}</td>
                    <td>₹${Number(
                      item.total || 0
                    ).toFixed(2)}</td>
                  </tr>
                `
              )
              .join("")}

          </tbody>

        </table>

      </body>

      </html>
    `);

    invoiceWindow.document.close();

    invoiceWindow.print();
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#eef3f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
        }}
      >
        Customer Details
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {search && (
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginTop: "5px",
              maxHeight: "150px",
              overflowY: "auto",
            }}
          >
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => {
                  setSelectedCustomer(
                    customer.customerName
                  );

                  setSearch(customer.customerName);
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {customer.customerName}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#0d47a1",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Total Purchase</h3>

            <h1>
              ₹
              {Number(
                totalPurchase || 0
              ).toFixed(2)}
            </h1>
          </div>

          <div
            style={{
              flex: 1,
              background: "#0d47a1",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>Pending Balance</h3>

            <h1>
              ₹
              {Number(
                pendingBalance || 0
              ).toFixed(2)}
            </h1>
          </div>
        </div>

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2
            style={{
              color: "#0d47a1",
            }}
          >
            Bill History
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0d47a1",
                  color: "white",
                }}
              >
                <th style={{ padding: "10px" }}>
                  Date
                </th>

                <th>Total</th>

                <th>Paid</th>

                <th>Balance</th>

                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {customerBills.length > 0 ? (
                customerBills.map((bill) => (
                  <tr key={bill.id}>
                    <td
                      style={{
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      {bill.createdAt
                        ? new Date(
                            bill.createdAt
                          ).toLocaleDateString()
                        : bill.date
                        ? new Date(
                            bill.date
                          ).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹
                      {Number(
                        bill.totalAmount || 0
                      ).toFixed(2)}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹
                      {Number(
                        bill.paidAmount || 0
                      ).toFixed(2)}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹
                      {Number(
                        bill.balanceAmount || 0
                      ).toFixed(2)}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          downloadBill(bill)
                        }
                        style={{
                          background: "#0d47a1",
                          color: "white",
                          border: "none",
                          padding:
                            "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Bills Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;