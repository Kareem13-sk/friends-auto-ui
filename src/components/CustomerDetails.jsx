import React, { useEffect, useState } from "react";

function CustomerDetails() {

  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // NEW
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
    fetchBills();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        "https://friends-auto-backend-sg.onrender.com/customers"
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
        "https://friends-auto-backend-sg.onrender.com/bills"
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
      selectedCustomer === ""
        ? true
        : bill.customerName
            ?.toLowerCase()
            .includes(selectedCustomer.toLowerCase());

    if (!selectedDate) {
      return customerMatch;
    }

    const billDate = bill.billDate || "";

    return (
      customerMatch &&
      billDate === selectedDate
    );

  });

  const totalPurchase = customerBills.reduce(
    (sum, bill) =>
      sum + Number(bill.totalAmount || 0),
    0
  );

  const pendingBalance = customerBills.reduce(
    (sum, bill) =>
      sum + Number(bill.balanceAmount || 0),
    0
  );

  // NEW - GROUP BILLS CUSTOMER WISE
  const groupedBills = customerBills.reduce((result, bill) => {

    const name = bill.customerName || "Unknown";

    if (!result[name]) {
      result[name] = {
        customerName: name,
        totalPurchase: 0,
        totalPaid: 0,
        totalBalance: 0,
        bills: [],
      };
    }

    result[name].bills.push(bill);

    result[name].totalPurchase += Number(
      bill.totalAmount || 0
    );

    result[name].totalPaid += Number(
      bill.paidAmount || 0
    );

    result[name].totalBalance += Number(
      bill.balanceAmount || 0
    );

    return result;

  }, {});

  const customerFolders = Object.values(groupedBills);

  // KEEP YOUR EXISTING downloadBill() FUNCTION BELOW

  const downloadBill = (bill) => {

    const rows = (bill.items || [])
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.productName || "-"}</td>
<td>${item.quantity || 0}</td>
<td>${item.percentage || 0}%</td>
<td>₹${Number(item.actualPrice || 0).toFixed(2)}</td>
<td>₹${Number(item.price || 0).toFixed(2)}</td>
<td>₹${Number(item.total || 0).toFixed(2)}</td>
          </tr>
        `
      )
      .join("");

    const invoiceWindow = window.open("", "_blank");

    invoiceWindow.document.write(`

      <html>

        <head>

          <title>Invoice</title>

          <style>

            *{
              margin:0;
              padding:0;
              box-sizing:border-box;
            }

            body{
              background:#f5f7fb;
              font-family:Arial, sans-serif;
              padding:10px;
            }

            .invoice{

              width:900px;
              margin:auto;
              background:white;
              border:5px solid #0d47a1;
              border-radius:25px;
              padding:20px;
              position:relative;
              overflow:hidden;
            }

            .invoice::before{

              content:"🏍";
              position:absolute;
              top:35%;
              left:50%;
              transform:translate(-50%,-50%);
              font-size:220px;
              opacity:0.03;
            }

            .top-header{

              display:flex;
              justify-content:space-between;
              align-items:center;
            }

            .date{

              font-size:14px;
              font-weight:bold;
            }

            .invoice-tag{

              background:#0d47a1;
              color:white;
              padding:10px 25px;
              border-radius:10px;
              font-size:28px;
              font-weight:bold;
            }

            .bike-icons{

              display:flex;
              justify-content:space-between;
              margin-top:10px;
              font-size:45px;
              opacity:0.15;
            }

            .title{

              text-align:center;
              color:#0d47a1;
              font-size:46px;
              font-weight:bold;
              margin-top:5px;
              letter-spacing:2px;
            }

            .sub-title{

              text-align:center;
              color:#666;
              font-size:15px;
              margin-top:4px;
            }

            .owner-section{

              display:flex;
              justify-content:center;
              gap:80px;
              margin-top:20px;
              font-size:18px;
              font-weight:bold;
            }

            .line{

              width:100%;
              height:2px;
              background:#0d47a1;
              margin:20px 0;
            }

            .customer-section{

              display:flex;
              justify-content:space-between;
              gap:20px;
            }

            .customer-box{

              width:55%;
              border:2px solid #d6e6ff;
              border-radius:18px;
              padding:15px;
              background:#f9fbff;
            }

            .customer-box h2{

              color:#0d47a1;
              margin-bottom:10px;
              font-size:28px;
            }

            .customer-box p{

              margin:8px 0;
              font-size:20px;
              font-weight:bold;
            }

            .details-box{

              width:40%;
              border-left:3px solid #0d47a1;
              padding-left:20px;
              display:flex;
              flex-direction:column;
              justify-content:center;
            }

            .details-box p{

              margin:10px 0;
              font-size:18px;
              font-weight:bold;
            }

            table{

              width:100%;
              border-collapse:collapse;
              margin-top:25px;
            }

            th{

              background:#0d47a1;
              color:white;
              padding:12px;
              font-size:18px;
            }

            td{

              border:1px solid #d8d8d8;
              padding:10px;
              text-align:center;
              font-size:16px;
            }

            tr:nth-child(even){

              background:#f7fbff;
            }

            .grand-total{

              margin-top:25px;
              text-align:right;
            }

            .grand-total span{

              background:#0d47a1;
              color:white;
              padding:12px 25px;
              border-radius:12px;
              font-size:28px;
              font-weight:bold;
            }

            .thanks{

              text-align:center;
              margin-top:40px;
            }

            .thanks h1{

              color:#0d47a1;
              font-size:42px;
              font-family:cursive;
            }

            .thanks p{

              margin-top:10px;
              color:#444;
              font-size:18px;
              font-weight:bold;
            }

            .bottom{

              display:flex;
              justify-content:space-between;
              align-items:end;
              margin-top:25px;
            }

            .seal{

              width:110px;
              height:110px;
              border-radius:50%;
              border:6px solid #0d47a1;
              display:flex;
              justify-content:center;
              align-items:center;
              text-align:center;
              color:#0d47a1;
              font-size:18px;
              font-weight:bold;
            }

            .signature{

              text-align:center;
            }

            .signature h2{

              color:#0d47a1;
              font-size:38px;
              font-family:cursive;
            }

            .signature p{

              font-size:18px;
              font-weight:bold;
            }

          </style>

        </head>

        <body>

          <div class="invoice">

            <div class="top-header">

              <div class="date">
                ${new Date().toLocaleDateString()} ,
                ${new Date().toLocaleTimeString()}
              </div>

              <div class="invoice-tag">
                INVOICE
              </div>

            </div>

            <div class="bike-icons">
              <span>🏍</span>
              <span>🏍</span>
            </div>

            <div class="title">
              FRIENDS AUTO MOBILE
            </div>

            <div class="sub-title">
              Professional Auto Parts & Service
            </div>

            <div class="owner-section">

              <div>
                Owner : Naimulla
              </div>

              <div>
                Phone : 9700433876 / 7032627488
              </div>

            </div>

            <div class="line"></div>

            <div class="customer-section">

              <div class="customer-box">

                <h2>
                  Customer : ${bill.customerName}
                </h2>

                <p>
  Products Total : ₹${Number(bill.totalAmount || 0).toFixed(2)}
</p>

<p>
  Previous Balance : ₹${Number(bill.previousBalance || 0).toFixed(2)}
</p>

<p>
  Paid Amount : ₹${Number(bill.paidAmount || 0).toFixed(2)}
</p>

<p style="color:red;">
  Remaining Balance : ₹${Number(bill.balanceAmount || 0).toFixed(2)}
</p>

              </div>

              <div class="details-box">

                <p>
                  Date : ${bill.billDate || new Date().toLocaleDateString()}
                </p>

                <p>
                  Time :
                  ${new Date().toLocaleTimeString()}
                </p>

                <p>
                  Invoice No :
                  INV-${bill.id}
                </p>

              </div>

            </div>

            <table>

              <thead>

                <tr>

                 <th>Sl.No</th>
<th>Product</th>
<th>Qty</th>
<th>%</th>
<th>Actual Price</th>
<th>Final Price</th>
<th>Total</th>

                </tr>

              </thead>

              <tbody>

                ${rows}

              </tbody>

            </table>

            <div
style="
margin-top:25px;
width:380px;
margin-left:auto;
font-size:18px;
font-weight:bold;
">

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">
<span>Products Total</span>

<span>
₹${Number(bill.totalAmount || 0).toFixed(2)}
</span>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">
<span>Previous Balance</span>

<span>
₹${Number(bill.previousBalance || 0).toFixed(2)}
</span>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-bottom:10px;
">
<span>Paid Amount</span>

<span>
₹${Number(bill.paidAmount || 0).toFixed(2)}
</span>

</div>

<hr style="margin:10px 0;">

<div
style="
display:flex;
justify-content:space-between;
font-size:24px;
font-weight:bold;
color:#0d47a1;
margin-top:10px;
">

<span>Grand Total</span>

<span>
₹${(
Number(bill.totalAmount || 0) +
Number(bill.previousBalance || 0)
).toFixed(2)}
</span>

</div>

<div
style="
display:flex;
justify-content:space-between;
margin-top:10px;
color:red;
">

<span>Remaining Balance</span>

<span>
₹${Number(bill.balanceAmount || 0).toFixed(2)}
</span>

</div>

</div>

            <div class="thanks">

              <h1>
                Thank You! Visit Again
              </h1>

              <p>
                Friends Auto Mobile <br/>
                We Deal In All Types Of Auto Parts
              </p>

            </div>

            <div class="bottom">

              <div class="seal">
                Thank<br/>You
              </div>

              <div class="signature">

                <h2>
                  Naimulla
                </h2>

                <p>
                  Owner
                </p>

              </div>

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
        padding: "20px",
        background: "#eef3f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: "20px",
        }}
      >
        Customer Details
      </h1>

      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        {/* CUSTOMER SEARCH */}

        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
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
                  setSelectedCustomer(customer.customerName);
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

        {/* DATE FILTER */}

        <div
          style={{
            marginTop: "15px",
            marginBottom: "20px",
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

        {/* SUMMARY */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
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
              ₹{Number(totalPurchase).toFixed(2)}
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
              ₹{Number(pendingBalance).toFixed(2)}
            </h1>
          </div>
        </div>

        {/* BILL HISTORY */}

  <h2
  style={{
    color: "#0d47a1",
    marginBottom: "15px",
  }}
>
  Customer Bill History
</h2>

{customerFolders.length === 0 ? (

  <div
    style={{
      textAlign: "center",
      padding: "40px",
      fontSize: "20px",
      fontWeight: "bold",
    }}
  >
    No Bills Found
  </div>

) : (

  customerFolders.map((customer) => (

    <div
      key={customer.customerName}
      style={{
        marginBottom: "18px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#fff",
      }}
    >

      <div
        onClick={() =>
          setExpandedCustomer(
            expandedCustomer === customer.customerName
              ? null
              : customer.customerName
          )
        }
        style={{
          cursor: "pointer",
          background: "#0d47a1",
          color: "white",
          padding: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div>

          <h2 style={{ margin: 0 }}>
            📁 {customer.customerName}
          </h2>

          <p style={{ marginTop: 8 }}>
            Bills :
            <b> {customer.bills.length}</b>
          </p>

        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >

          <div>
            Purchase :
            ₹{customer.totalPurchase.toFixed(2)}
          </div>

          <div>
            Paid :
            ₹{customer.totalPaid.toFixed(2)}
          </div>

          <div
            style={{
              color: "#ffeb3b",
              fontWeight: "bold",
            }}
          >
            Balance :
            ₹{customer.totalBalance.toFixed(2)}
          </div>

        </div>

      </div>

      {expandedCustomer === customer.customerName && (

        <div
          style={{
            padding: "20px",
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
                  background: "#1976d2",
                  color: "white",
                }}
              >

                <th style={{ padding: 10 }}>Date</th>

                <th>Total</th>

                <th>Paid</th>

                <th>Balance</th>

                <th>Download</th>

              </tr>

            </thead>

            <tbody>

              {customer.bills.map((bill) => (

                <tr key={bill.id}>

                  <td
                    style={{
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    {bill.billDate}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    ₹{Number(
                      bill.totalAmount || 0
                    ).toFixed(2)}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    ₹{Number(
                      bill.paidAmount || 0
                    ).toFixed(2)}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    ₹{Number(
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
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Download
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>
      )}

    </div>

  ))

)}

      </div>
    </div>
  );
}

export default CustomerDetails;