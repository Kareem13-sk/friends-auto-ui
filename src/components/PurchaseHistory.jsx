import { useEffect, useState } from "react";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);

  // LOAD BILLS FROM BACKEND
  useEffect(() => {

    fetchBills();

  }, []);

  const fetchBills = async () => {

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/bills"
      );

      const data = await response.json();

      setBills(data);

    } catch (error) {

      console.log(error);
    }
  };

  // DELETE BILL
  const deleteBill = async (billId) => {

  const confirmDelete =
    window.confirm("Delete this bill?");

  if (!confirmDelete) return;

  try {

    await fetch(
      `https://friends-auto-backend-1utc.onrender.com/bills/${billId}`,
      {
        method: "DELETE",
      }
    );

    // REMOVE FROM UI IMMEDIATELY
    const updatedBills =
      bills.filter(
        (bill) => bill.id !== billId
      );

    setBills(updatedBills);

  } catch (error) {

    console.log(error);
  }
};
  // EDIT PAID AMOUNT
  const editPaidAmount = (billId) => {

  const bill =
    bills.find((b) => b.id === billId);

  const newPaid = prompt(
    "Enter New Paid Amount",
    bill.paidAmount
  );

  if (!newPaid) return;

  const updatedBills = bills.map((b) => {

    if (b.id === billId) {

      return {
        ...b,
        paidAmount: Number(newPaid),
        balanceAmount:
          b.totalAmount - Number(newPaid),
      };
    }

    return b;
  });

  setBills(updatedBills);
};
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
                  Total Amount : ₹${bill.totalAmount}
                </p>

                <p>
                  Paid Amount : ₹${bill.paidAmount}
                </p>

                <p style="color:red;">
                  Balance Amount : ₹${bill.balanceAmount}
                </p>

              </div>

              <div class="details-box">

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
                  editPaidAmount(bill.id)
                }
                style={buttonStyleBlue}
              >
                Edit
              </button>

              <button
                onClick={() =>
  deleteBill(bill.id)
}
                style={buttonStyleRed}
              >
                Delete
              </button>

              <button
                onClick={() =>
                  downloadBill(bill)
                }
                style={buttonStyleGreen}
              >
                Download Bill
              </button>

            </div>

          </div>

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
                    {item.product || item.productName}
                  </td>

                  <td style={tdStyle}>
                    {item.qty || item.quantity}
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

const buttonStyleBlue = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonStyleRed = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const buttonStyleGreen = {
  background: "green",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

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