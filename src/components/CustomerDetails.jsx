import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      setCustomers(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBills = async () => {
    try {
      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/bills"
      );

      setBills(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredBills = bills.filter((bill) => {
    const matchesCustomer =
      selectedCustomer &&
      bill.customerName?.toLowerCase() ===
        selectedCustomer.toLowerCase();

    if (!selectedDate) {
      return matchesCustomer;
    }

    const billDateRaw =
      bill.createdAt || bill.date || bill.billDate;

    if (!billDateRaw) {
      return false;
    }

    const billDate = new Date(billDateRaw)
      .toISOString()
      .split("T")[0];

    return matchesCustomer && billDate === selectedDate;
  });

  const totalPurchase = filteredBills.reduce(
    (sum, bill) => sum + (bill.totalAmount || 0),
    0
  );

  const pendingBalance = filteredBills.reduce(
    (sum, bill) => sum + (bill.balanceAmount || 0),
    0
  );

  const downloadBill = (bill) => {
    const invoiceWindow = window.open("", "_blank");

    const rows = (bill.items || [])
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product || item.productName || "N/A"}</td>
          <td>${item.qty || item.quantity || 0}</td>
          <td>₹${item.actualPrice || item.price || 0}</td>
          <td>₹${item.finalPrice || item.price || 0}</td>
          <td>₹${item.total || 0}</td>
        </tr>
      `
      )
      .join("");

    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>

          <style>

            body{
              font-family: Arial;
              background:#f5f7ff;
              padding:20px;
            }

            .invoice{
              max-width:1000px;
              margin:auto;
              background:white;
              border-radius:20px;
              padding:30px;
              border:4px solid #1748a5;
            }

            .header{
              text-align:center;
              color:#1748a5;
              margin-bottom:20px;
            }

            .header h1{
              font-size:45px;
              margin:0;
            }

            .top{
              display:flex;
              justify-content:space-between;
              margin-top:20px;
              margin-bottom:20px;
              font-weight:bold;
            }

            .customer-box{
              border:2px solid #1748a5;
              border-radius:15px;
              padding:20px;
              margin-bottom:20px;
            }

            table{
              width:100%;
              border-collapse:collapse;
              margin-top:20px;
            }

            table th{
              background:#1748a5;
              color:white;
              padding:12px;
            }

            table td{
              border:1px solid #ddd;
              padding:10px;
              text-align:center;
            }

            .grand-total{
              margin-top:20px;
              text-align:right;
              font-size:30px;
              color:#1748a5;
              font-weight:bold;
            }

            .footer{
              margin-top:40px;
              text-align:center;
              color:#1748a5;
            }

            .footer h2{
              font-size:40px;
              margin-bottom:10px;
            }

          </style>

        </head>

        <body>

          <div class="invoice">

            <div class="header">
              <h1>Friends Auto Mobile</h1>
              <p>Professional Auto Parts & Service</p>
            </div>

            <div class="top">
              <div>
                Owner : Naimulla
              </div>

              <div>
                Phone : 9700433876 / 7032627488
              </div>
            </div>

            <div class="customer-box">

              <h2 style="color:#1748a5;">
                Customer : ${bill.customerName}
              </h2>

              <h3>Total Amount : ₹${bill.totalAmount}</h3>

              <h3>Paid Amount : ₹${bill.paidAmount}</h3>

              <h3 style="color:red;">
                Balance Amount : ₹${bill.balanceAmount}
              </h3>

              <h3>
                Date :
                ${
                  bill.createdAt
                    ? new Date(
                        bill.createdAt
                      ).toLocaleDateString()
                    : "N/A"
                }
              </h3>

            </div>

            <table>

              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Actual Price</th>
                  <th>Final Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                ${rows}
              </tbody>

            </table>

            <div class="grand-total">
              Grand Total : ₹${bill.totalAmount}
            </div>

            <div class="footer">
              <h2>Thank You! Visit Again</h2>

              <p>
                Friends Auto Mobile <br/>
                We Deal in All Types of Auto Parts
              </p>
            </div>

          </div>

        </body>
      </html>
    `);

    invoiceWindow.document.close();
    invoiceWindow.print();
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#eaf0f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1748a5",
          marginBottom: "30px",
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
          borderRadius: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedCustomer(e.target.value);
          }}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        />

        {search && (
          <div
            style={{
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "10px",
              marginBottom: "20px",
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
                  borderBottom: "1px solid #eee",
                }}
              >
                {customer.customerName}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#1748a5",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Total Purchase</h2>
            <h1>₹{totalPurchase.toFixed(2)}</h1>
          </div>

          <div
            style={{
              flex: 1,
              background: "#1748a5",
              color: "white",
              padding: "20px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <h2>Pending Balance</h2>
            <h1>₹{pendingBalance.toFixed(2)}</h1>
          </div>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "15px",
          }}
        >
          <h2
            style={{
              color: "#1748a5",
              marginBottom: "20px",
            }}
          >
            Bill History
          </h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#1748a5",
                  color: "white",
                }}
              >
                <th style={{ padding: "12px" }}>
                  Date
                </th>

                <th>Total</th>

                <th>Paid</th>

                <th>Balance</th>

                <th>Download</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td
                      style={{
                        padding: "12px",
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
                        : "N/A"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹{bill.totalAmount}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹{bill.paidAmount}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >
                      ₹{bill.balanceAmount}
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
                          background: "#1748a5",
                          color: "white",
                          border: "none",
                          padding:
                            "8px 15px",
                          borderRadius: "8px",
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