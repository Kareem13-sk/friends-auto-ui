import { useEffect, useState } from "react";
import axios from "axios";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

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

  const deleteBill = async (id) => {

    try {

      await axios.delete(
        `https://friends-auto-backend-1utc.onrender.com/bills/${id}`
      );

      fetchBills();

    } catch (error) {

      console.log(error);
    }
  };

  const updateBill = async (bill) => {

    try {

      await axios.put(
        `https://friends-auto-backend-1utc.onrender.com/bills/${bill.id}`,
        bill
      );

      setEditingId(null);

      fetchBills();

    } catch (error) {

      console.log(error);
    }
  };

  const downloadBill = (bill) => {

    const rows = (bill.items || [])
      .map(
        (item) => `
          <tr>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>₹${item.actualPrice}</td>
            <td>₹${item.price}</td>
            <td>₹${item.total}</td>
          </tr>
        `
      )
      .join("");

    const isLargeBill =
      (bill.items || []).length > 15;

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>

      <head>

        <title>Invoice</title>

        <style>

          body{
            font-family:Arial,sans-serif;
            background:#f2f2f2;
            padding:20px;
            margin:0;
          }

          .invoice{

            width:800px;
            height:${isLargeBill ? "auto" : "1120px"};
            margin:auto;
            background:white;
            border-radius:25px;
            padding:30px;
            position:relative;
            overflow:hidden;
            border:4px solid #0d47a1;
            box-shadow:0 10px 30px rgba(0,0,0,0.15);
            box-sizing:border-box;
          }

          .engine-bg{

            position:absolute;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            opacity:0.06;
            width:500px;
            z-index:0;
          }

          .content{
            position:relative;
            z-index:2;
          }

          .header{
            text-align:center;
            margin-bottom:20px;
          }

          .title{
            font-size:52px;
            color:#0d47a1;
            font-weight:bold;
            margin-bottom:5px;
          }

          .owner{
            font-size:24px;
            color:#333;
            font-weight:bold;
          }

          .phone{
            font-size:18px;
            color:#666;
          }

          .flower-left{
            position:absolute;
            top:0;
            left:0;
            width:160px;
            opacity:0.8;
          }

          .flower-right{
            position:absolute;
            top:0;
            right:0;
            width:160px;
            opacity:0.8;
          }

          .customer{
            margin-top:25px;
            margin-bottom:20px;
          }

          .customer h2{
            color:#0d47a1;
            margin-bottom:10px;
            font-size:32px;
          }

          .details{
            font-size:24px;
            font-weight:bold;
            line-height:1.8;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
            background:white;
          }

          th{
            background:#0d47a1;
            color:white;
            padding:12px;
            font-size:16px;
          }

          td{
            padding:10px;
            text-align:center;
            border-bottom:1px solid #ddd;
            font-size:15px;
          }

          .grand-total{
            text-align:right;
            margin-top:30px;
            font-size:34px;
            color:#0d47a1;
            font-weight:bold;
          }

          .thankyou{
            text-align:center;
            margin-top:40px;
            font-size:34px;
            color:#0d47a1;
            font-family:cursive;
            font-weight:bold;
          }

          .footer{
            text-align:center;
            margin-top:15px;
            font-size:18px;
            color:#666;
          }

          @media print{

            body{
              background:white;
              padding:0;
            }

            .invoice{
              box-shadow:none;
              border:3px solid #0d47a1;
            }
          }

        </style>

      </head>

      <body>

        <div class="invoice">

          <img
            class="flower-left"
            src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-blue-flower-watercolor-decoration-png-image_9019822.png"
          />

          <img
            class="flower-right"
            src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-blue-flower-watercolor-decoration-png-image_9019822.png"
          />

          <img
            class="engine-bg"
            src="https://cdn-icons-png.flaticon.com/512/8086/8086346.png"
          />

          <div class="content">

            <div class="header">

              <div class="title">
                Friends Auto Mobile
              </div>

              <div class="owner">
                Owner : Naimulla
              </div>

              <div class="phone">
                Phone : 9700433876
              </div>

            </div>

            <div class="customer">

              <h2>
                Customer : ${bill.customerName}
              </h2>

              <div class="details">
                Total : ₹${bill.totalAmount}<br/>
                Paid : ₹${bill.paidAmount}<br/>
                Balance : ₹${bill.balanceAmount}
              </div>

            </div>

            <table>

              <thead>

                <tr>
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

            <div class="thankyou">
              Thank You Visit Again
            </div>

            <div class="footer">
              Friends Auto Mobile • Quality Parts & Service
            </div>

          </div>

        </div>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.print();
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

      {(bills || []).map((bill) => (

        <div
          key={bill.id}
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >

          <h2 style={{ color: "#0d47a1" }}>
            Customer : {bill.customerName}
          </h2>

          <h3>Total : ₹{bill.totalAmount}</h3>

          <h3>Paid : ₹{bill.paidAmount}</h3>

          <h3>Balance : ₹{bill.balanceAmount}</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
            }}
          >

            <button
              onClick={() => setEditingId(bill.id)}
              style={editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => deleteBill(bill.id)}
              style={deleteBtn}
            >
              Delete
            </button>

            <button
              onClick={() => downloadBill(bill)}
              style={downloadBtn}
            >
              Download Bill
            </button>

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
                <th style={thStyle}>Actual Price</th>
                <th style={thStyle}>Final Price</th>
                <th style={thStyle}>Total</th>
              </tr>

            </thead>

            <tbody>

              {(bill.items || []).map((item, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {item.productName}
                  </td>

                  <td style={tdStyle}>
                    {item.quantity}
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

const editBtn = {
  background: "#1976d2",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const downloadBtn = {
  background: "#0d47a1",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default PurchaseHistory;