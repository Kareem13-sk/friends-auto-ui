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

          body{
            font-family: Arial, sans-serif;
            background:#f4f7ff;
            padding:20px;
          }

          .invoice-container{
            max-width:900px;
            margin:auto;
            background:white;
            border-radius:20px;
            overflow:hidden;
            border:4px solid #0d47a1;
            position:relative;
            box-shadow:0 5px 20px rgba(0,0,0,0.2);
          }

          .watermark{
            position:absolute;
            top:35%;
            left:50%;
            transform:translate(-50%,-50%);
            opacity:0.05;
            font-size:250px;
            z-index:0;
          }

          .header{
            background:#0d47a1;
            color:white;
            padding:25px;
            text-align:center;
            position:relative;
            z-index:2;
          }

          .header h1{
            margin:0;
            font-size:42px;
            letter-spacing:2px;
          }

          .header p{
            margin:5px 0;
            font-size:18px;
          }

          .owner-box{
            display:flex;
            justify-content:space-between;
            flex-wrap:wrap;
            padding:20px 30px;
            border-bottom:2px dashed #0d47a1;
            position:relative;
            z-index:2;
          }

          .owner-box div{
            font-size:18px;
            font-weight:bold;
            color:#333;
            line-height:1.8;
          }

          .customer-section{
            padding:25px 30px 10px;
            position:relative;
            z-index:2;
          }

          .customer-section h2{
            color:#0d47a1;
            margin-bottom:10px;
            font-size:32px;
          }

          .summary{
            display:flex;
            gap:40px;
            flex-wrap:wrap;
            margin-top:10px;
            font-size:20px;
            font-weight:bold;
          }

          table{
            width:92%;
            margin:20px auto;
            border-collapse:collapse;
            position:relative;
            z-index:2;
          }

          th{
            background:#0d47a1;
            color:white;
            padding:15px;
            font-size:18px;
          }

          td{
            padding:14px;
            border-bottom:1px solid #ddd;
            text-align:center;
            font-size:17px;
          }

          tr:nth-child(even){
            background:#f5f8ff;
          }

          .grand-total{
            text-align:right;
            padding:20px 40px;
            font-size:32px;
            font-weight:bold;
            color:#0d47a1;
            position:relative;
            z-index:2;
          }

          .footer{
            margin-top:30px;
            background:#0d47a1;
            color:white;
            text-align:center;
            padding:25px;
            position:relative;
            z-index:2;
          }

          .footer h2{
            margin:0;
            font-size:38px;
            font-family:cursive;
          }

          .footer p{
            margin-top:10px;
            font-size:18px;
          }

          .flower-left{
            position:absolute;
            top:10px;
            left:10px;
            font-size:70px;
            opacity:0.2;
          }

          .flower-right{
            position:absolute;
            top:10px;
            right:10px;
            font-size:70px;
            opacity:0.2;
          }

          @media print{
            body{
              background:white;
              padding:0;
            }

            .invoice-container{
              box-shadow:none;
              border:none;
            }
          }

        </style>

      </head>

      <body>

        <div class="invoice-container">

          <div class="flower-left">🌸</div>
          <div class="flower-right">🌸</div>

          <div class="watermark">
            ⚙️
          </div>

          <div class="header">
            <h1>Friends Auto Mobile</h1>

            <p>
              Professional Auto Parts & Service
            </p>
          </div>

          <div class="owner-box">

            <div>
              Owner : Naimulla
            </div>

            <div>
              Phone : 9700433876 / 70326227488
            </div>

          </div>

          <div class="customer-section">

            <h2>
              Customer : ${bill.customerName}
            </h2>

            <div class="summary">

              <div>
                Total : ₹${bill.totalAmount}
              </div>

              <div>
                Paid : ₹${bill.paidAmount}
              </div>

              <div>
                Balance : ₹${bill.balanceAmount}
              </div>

            </div>

          </div>

          <table>

            <thead>

              <tr>
                <th>#</th>
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

            <h2>
              Thank You Visit Again
            </h2>

            <p>
              Friends Auto Mobile | Trusted Auto Parts Shop
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