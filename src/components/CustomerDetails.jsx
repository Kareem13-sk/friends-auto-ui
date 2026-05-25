import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  // FETCH CUSTOMERS

  useEffect(() => {

    fetchCustomers();
    fetchBills();

  }, []);

  // FETCH CUSTOMERS

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

  // FETCH BILLS

  const fetchBills = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/bills"
      );

      setBills(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // SEARCH CUSTOMER

  const handleSearch = (value) => {

    setSearch(value);

    if (value.trim() === "") {

      setFilteredCustomers([]);
      return;
    }

    const filtered = customers.filter((customer) =>
      customer.customerName
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredCustomers(filtered);
  };

  // SELECT CUSTOMER

  const selectCustomer = (customer) => {

    setSelectedCustomer(customer);

    setSearch(customer.customerName);

    setFilteredCustomers([]);

    const customerBills = bills.filter(
      (bill) =>
        bill.customerName?.toLowerCase() ===
        customer.customerName?.toLowerCase()
    );

    setFilteredBills(customerBills);
  };

  // FILTER BILLS BY DATE

  const filteredBillsByDate = filteredBills.filter((bill) => {

    if (!selectedDate) return true;

    if (!bill.date) return false;

    const billDate = new Date(bill.date)
      .toISOString()
      .split("T")[0];

    return billDate === selectedDate;
  });

  // TOTAL PURCHASE

  const totalPurchase = filteredBillsByDate.reduce(
    (sum, bill) => sum + (bill.totalAmount || 0),
    0
  );

  // TOTAL BALANCE

  const pendingBalance = filteredBillsByDate.reduce(
    (sum, bill) => sum + (bill.balanceAmount || 0),
    0
  );

  // DOWNLOAD BILL

  const downloadBill = (bill) => {

    const invoiceWindow = window.open("", "_blank");

    invoiceWindow.document.write(`

      <html>

      <head>

        <title>Invoice</title>

        <style>

          body{
            font-family: Arial;
            padding:30px;
            background:#f4f7ff;
          }

          .invoice{
            max-width:900px;
            margin:auto;
            background:white;
            padding:30px;
            border-radius:20px;
            border:3px solid #0d47a1;
          }

          .header{
            text-align:center;
            color:#0d47a1;
          }

          .owner{
            display:flex;
            justify-content:space-between;
            margin-top:20px;
            font-size:18px;
            font-weight:bold;
          }

          .customer-box{
            margin-top:30px;
            padding:20px;
            border:2px solid #0d47a1;
            border-radius:15px;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:30px;
          }

          th{
            background:#0d47a1;
            color:white;
            padding:12px;
          }

          td{
            padding:12px;
            border:1px solid #ddd;
            text-align:center;
          }

          .grand-total{
            text-align:right;
            margin-top:25px;
            font-size:30px;
            font-weight:bold;
            color:#0d47a1;
          }

          .footer{
            margin-top:50px;
            text-align:center;
            color:#0d47a1;
          }

        </style>

      </head>

      <body>

        <div class="invoice">

          <div class="header">

            <h1>FRIENDS AUTO MOBILE</h1>

            <h3>Professional Auto Parts & Service</h3>

          </div>

          <div class="owner">

            <div>
              Owner : Naimulla
            </div>

            <div>
              Phone : 9700433876 / 7032627488
            </div>

          </div>

          <div class="customer-box">

            <h2>
              Customer : ${bill.customerName}
            </h2>

            <h3>
              Total : ₹${bill.totalAmount}
            </h3>

            <h3>
              Paid : ₹${bill.paidAmount}
            </h3>

            <h3>
              Balance : ₹${bill.balanceAmount}
            </h3>

          </div>

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

              ${bill.items
                ?.map(
                  (item) => `

                    <tr>

                      <td>${item.productName || ""}</td>

                      <td>${item.quantity || ""}</td>

                      <td>₹${item.price || 0}</td>

                      <td>₹${item.total || 0}</td>

                    </tr>

                  `
                )
                .join("")}

            </tbody>

          </table>

          <div class="grand-total">

            Grand Total : ₹${bill.totalAmount}

          </div>

          <div class="footer">

            <h1>Thank You Visit Again</h1>

            <h3>
              Friends Auto Mobile
            </h3>

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
        background: "#eef3fb",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: "30px"
        }}
      >
        Customer Details
      </h1>

      {/* SEARCH BOX */}

      <div
        style={{
          position: "relative",
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        {/* AUTO SUGGESTION */}

        {filteredCustomers.length > 0 && (

          <div
            style={{
              position: "absolute",
              width: "100%",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginTop: "5px",
              zIndex: 1000,
              maxHeight: "200px",
              overflowY: "auto",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >

            {filteredCustomers.map((customer) => (

              <div
                key={customer.id}
                onClick={() => selectCustomer(customer)}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee"
                }}
              >
                {customer.customerName}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* DATE PICKER */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}
      >

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

      </div>

      {/* SUMMARY */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px"
        }}
      >

        <div
          style={{
            flex: 1,
            background: "#0d47a1",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h2>Total Purchase</h2>
          <h1>₹{totalPurchase.toFixed(2)}</h1>
        </div>

        <div
          style={{
            flex: 1,
            background: "#0d47a1",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          <h2>Pending Balance</h2>
          <h1>₹{pendingBalance.toFixed(2)}</h1>
        </div>

      </div>

      {/* BILL HISTORY */}

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
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
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#0d47a1",
                color: "white"
              }}
            >

              <th style={thStyle}>Date</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Balance</th>
              <th style={thStyle}>Download</th>

            </tr>

          </thead>

          <tbody>

            {filteredBillsByDate.length > 0 ? (

              filteredBillsByDate.map((bill, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {bill.date || "N/A"}
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

                  <td style={tdStyle}>

                    <button
                      onClick={() => downloadBill(bill)}
                      style={{
                        background: "#1565c0",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
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
                    color: "gray"
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
  );
}

const thStyle = {
  padding: "14px"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  textAlign: "center"
};

export default CustomerDetails;