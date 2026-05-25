import { useEffect, useState } from "react";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);

  // LOAD BILLS FROM LOCAL STORAGE
  useEffect(() => {

    const savedBills =
      JSON.parse(localStorage.getItem("bills")) || [];

    setBills(savedBills);

  }, []);

  // DELETE BILL
  const deleteBill = (indexToDelete) => {

    const confirmDelete =
      window.confirm("Delete this bill?");

    if (!confirmDelete) return;

    const updatedBills =
      bills.filter(
        (_, index) => index !== indexToDelete
      );

    localStorage.setItem(
      "bills",
      JSON.stringify(updatedBills)
    );

    setBills(updatedBills);
  };

  // EDIT PAID AMOUNT
  const editPaidAmount = (billIndex) => {

    const bill = bills[billIndex];

    const newPaid = prompt(
      "Enter New Paid Amount",
      bill.paidAmount
    );

    if (!newPaid) return;

    const updatedBills = [...bills];

    updatedBills[billIndex].paidAmount =
      Number(newPaid);

    updatedBills[billIndex].balanceAmount =
      updatedBills[billIndex].totalAmount -
      Number(newPaid);

    localStorage.setItem(
      "bills",
      JSON.stringify(updatedBills)
    );

    setBills(updatedBills);
  };

  // DOWNLOAD BILL
  // DOWNLOAD BILL
const downloadBill = (bill) => {

  const rows = (bill.items || [])
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.product || item.productName || ""}</td>
          <td>${item.qty || item.quantity || ""}</td>
          <td>₹${item.actualPrice || 0}</td>
          <td>₹${item.price || 0}</td>
          <td>₹${item.total || 0}</td>
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
            background:#f2f6ff;
            font-family:Arial, sans-serif;
            padding:20px;
          }

          .invoice{

            width:1000px;
            margin:auto;
            background:white;
            border:8px solid #0d47a1;
            border-radius:35px;
            overflow:hidden;
            position:relative;
            padding:30px;
          }

          .invoice::before{

            content:"⚙";
            position:absolute;
            top:45%;
            left:50%;
            transform:translate(-50%,-50%);
            font-size:350px;
            opacity:0.04;
          }

          .top-row{

            display:flex;
            justify-content:space-between;
            align-items:center;
          }

          .date{
            font-size:20px;
            font-weight:bold;
          }

          .invoice-box{

            background:#0d47a1;
            color:white;
            padding:15px 35px;
            border-radius:12px;
            font-size:42px;
            font-weight:bold;
          }

          .logo{
            text-align:center;
            margin-top:10px;
          }

          .logo-icon{
            font-size:90px;
            color:#0d47a1;
          }

          .shop-name{

            text-align:center;
            font-size:72px;
            color:#0d47a1;
            font-weight:bold;
            margin-top:10px;
            letter-spacing:2px;
          }

          .owner-section{

            margin-top:30px;
            display:flex;
            justify-content:center;
            gap:80px;
            font-size:28px;
            font-weight:bold;
          }

          .divider{

            margin:25px auto;
            width:85%;
            height:3px;
            background:#0d47a1;
          }

          .customer-box{

            display:flex;
            justify-content:space-between;
            margin-top:30px;
            gap:30px;
          }

          .left-box{

            width:55%;
            border:3px solid #cde4ff;
            border-radius:25px;
            padding:25px;
            background:#f8fbff;
          }

          .left-box h2{

            color:#0d47a1;
            font-size:42px;
            margin-bottom:20px;
          }

          .left-box p{

            font-size:28px;
            margin:15px 0;
            font-weight:bold;
          }

          .right-box{

            width:40%;
            border-left:4px solid #0d47a1;
            padding-left:30px;
            display:flex;
            flex-direction:column;
            justify-content:center;
          }

          .right-box p{

            font-size:26px;
            margin:18px 0;
            font-weight:bold;
          }

          table{

            width:100%;
            border-collapse:collapse;
            margin-top:40px;
          }

          th{

            background:#0d47a1;
            color:white;
            padding:20px;
            font-size:24px;
          }

          td{

            padding:18px;
            border:1px solid #cfd8dc;
            text-align:center;
            font-size:22px;
            font-weight:500;
          }

          tr:nth-child(even){

            background:#f7fbff;
          }

          .grand-total{

            margin-top:30px;
            text-align:right;
          }

          .grand-total span{

            background:#0d47a1;
            color:white;
            padding:18px 35px;
            border-radius:18px;
            font-size:42px;
            font-weight:bold;
          }

          .thank-you{

            text-align:center;
            margin-top:60px;
          }

          .thank-you h1{

            color:#0d47a1;
            font-size:72px;
            font-family:cursive;
          }

          .thank-you p{

            margin-top:10px;
            font-size:26px;
            color:#444;
            font-weight:bold;
          }

          .bottom{

            display:flex;
            justify-content:space-between;
            align-items:end;
            margin-top:40px;
          }

          .seal{

            width:170px;
            height:170px;
            border-radius:50%;
            border:10px solid #0d47a1;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#0d47a1;
            font-size:28px;
            font-weight:bold;
            text-align:center;
          }

          .signature{

            text-align:center;
            font-size:24px;
            font-weight:bold;
          }

          .signature h2{

            font-family:cursive;
            font-size:52px;
            color:#0d47a1;
          }

          .flower-left{

            position:absolute;
            top:15px;
            left:15px;
            font-size:90px;
            opacity:0.18;
          }

          .flower-right{

            position:absolute;
            top:15px;
            right:15px;
            font-size:90px;
            opacity:0.18;
          }

          @media print{

            body{
              background:white;
              padding:0;
            }

            .invoice{
              border:none;
              width:100%;
              box-shadow:none;
            }
          }

        </style>

      </head>

      <body>

        <div class="invoice">

          <div class="flower-left">🌸</div>
          <div class="flower-right">🌸</div>

          <div class="top-row">

            <div class="date">
              ${new Date().toLocaleDateString()}
            </div>

            <div class="invoice-box">
              INVOICE
            </div>

          </div>

          <div class="logo">
            <div class="logo-icon">⚙️</div>
          </div>

          <div class="shop-name">
            FRIENDS AUTO MOBILE
          </div>

          <div class="owner-section">

            <div>
              Owner : Naimulla
            </div>

            <div>
              Phone : 9700433876 / 7032627488
            </div>

          </div>

          <div class="divider"></div>

          <div class="customer-box">

            <div class="left-box">

              <h2>
                Customer : ${bill.customerName}
              </h2>

              <p>
                Total Amount : ₹${bill.totalAmount}
              </p>

              <p>
                Paid Amount : ₹${bill.paidAmount}
              </p>

              <p style="color:red;">
                Balance Amount : ₹${bill.balanceAmount}
              </p>

            </div>

            <div class="right-box">

              <p>
                Date : ${new Date().toLocaleDateString()}
              </p>

              <p>
                Time : ${new Date().toLocaleTimeString()}
              </p>

              <p>
                Invoice No : INV-${Date.now()}
              </p>

            </div>

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

            <span>
              Grand Total : ₹${bill.totalAmount}
            </span>

          </div>

          <div class="thank-you">

            <h1>
              Thank You! Visit Again
            </h1>

            <p>
              Friends Auto Mobile <br/>
              We Deal in All Types of Auto Parts
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

              <div>
                Owner
              </div>

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

    <div>

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          marginBottom: "30px",
          fontSize: "48px",
        }}
      >
        Bills History
      </h1>

      {bills.length === 0 && (

        <h2
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          No Bills Found
        </h2>

      )}

      {bills.map((bill, billIndex) => (

        <div
          key={billIndex}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            overflowX: "auto",
          }}
        >

          {/* CUSTOMER DETAILS */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <h2
              style={{
                color: "#0d47a1",
                marginBottom: "10px",
              }}
            >
              Customer : {bill.customerName}
            </h2>

            <h3>
              Total : ₹{bill.totalAmount}
            </h3>

            <h3>
              Paid : ₹{bill.paidAmount}
            </h3>

            <h3>
              Balance : ₹{bill.balanceAmount}
            </h3>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >

              <button
                onClick={() =>
                  editPaidAmount(billIndex)
                }
                style={{
                  background: "#1565c0",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteBill(billIndex)
                }
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>

              <button
                onClick={() =>
                  downloadBill(bill)
                }
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Download Bill
              </button>

            </div>

          </div>

          {/* PRODUCTS TABLE */}

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#0d47a1",
                  color: "white",
                }}
              >
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>%</th>
                <th style={thStyle}>
                  Actual Price
                </th>
                <th style={thStyle}>
                  Final Price
                </th>
                <th style={thStyle}>Total</th>
              </tr>

            </thead>

            <tbody>

              {bill.items?.map((item, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {item.product}
                  </td>

                  <td style={tdStyle}>
                    {item.qty}
                  </td>

                  <td style={tdStyle}>
                    {item.percentage}%
                  </td>

                  <td style={tdStyle}>
                    ₹{item.actualPrice}
                  </td>

                  <td style={tdStyle}>
                    ₹{item.price}
                  </td>

                  <td style={tdStyle}>
                    ₹{item.total}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      ))}

    </div>
  );
}

const thStyle = {
  padding: "16px",
  fontSize: "18px",
};

const tdStyle = {
  padding: "16px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

export default PurchaseHistory;