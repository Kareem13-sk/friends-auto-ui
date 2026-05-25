import { useEffect, useState } from "react";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);

  // LOAD BILLS
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

  // DOWNLOAD / PRINT BILL
  const downloadBill = (bill) => {

    let rows = "";

    bill.items?.forEach((item) => {

      rows += `
        <tr>
          <td>${item.product}</td>
          <td>${item.qty}</td>
          <td>₹${item.actualPrice}</td>
          <td>₹${item.price}</td>
          <td>₹${item.total}</td>
        </tr>
      `;
    });

    const billWindow = window.open("", "_blank");

    billWindow.document.write(`

    <html>

    <head>

      <title>Invoice</title>

      <style>

        body{
          background:#f3f6fb;
          padding:30px;
          font-family:Arial,sans-serif;
        }

        .invoice{
          max-width:900px;
          margin:auto;
          background:white;
          border-radius:25px;
          padding:50px;
          position:relative;
          overflow:hidden;
          border:4px solid #0d47a1;
          box-shadow:0 10px 30px rgba(0,0,0,0.15);
        }

        .invoice::before{
          content:"";
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          width:450px;
          height:450px;

          background-image:url('https://cdn-icons-png.flaticon.com/512/741/741407.png');

          background-repeat:no-repeat;
          background-size:contain;

          opacity:0.05;

          z-index:0;
        }

        .flower1,
        .flower2,
        .flower3,
        .flower4{
          position:absolute;
          width:170px;
          z-index:1;
        }

        .flower1{
          top:-10px;
          left:-10px;
        }

        .flower2{
          top:-10px;
          right:-10px;
          transform:scaleX(-1);
        }

        .flower3{
          bottom:-10px;
          left:-10px;
          transform:scaleY(-1);
        }

        .flower4{
          bottom:-10px;
          right:-10px;
          transform:scale(-1);
        }

        .content{
          position:relative;
          z-index:2;
        }

        h1{
          text-align:center;
          color:#0d47a1;
          font-size:52px;
          margin-bottom:5px;
        }

        .owner{
          text-align:center;
          font-size:22px;
          font-weight:bold;
          margin-top:15px;
        }

        .phone{
          text-align:center;
          font-size:18px;
          margin-bottom:35px;
          color:#555;
        }

        .customer{
          font-size:30px;
          color:#0d47a1;
          margin-bottom:25px;
          font-weight:bold;
        }

        .summary{
          font-size:24px;
          margin-bottom:10px;
          font-weight:bold;
        }

        table{
          width:100%;
          border-collapse:collapse;
          margin-top:35px;
          background:white;
        }

        th{
          background:#0d47a1;
          color:white;
          padding:18px;
          font-size:18px;
        }

        td{
          border:1px solid #ddd;
          padding:16px;
          text-align:center;
          font-size:17px;
        }

        tr:nth-child(even){
          background:#f8f8f8;
        }

        .grand-total{
          text-align:right;
          margin-top:40px;
          font-size:34px;
          color:#0d47a1;
          font-weight:bold;
        }

        .thankyou{
          text-align:center;
          margin-top:80px;
          font-size:38px;
          color:#0d47a1;
          font-family:cursive;
          font-weight:bold;
        }

      </style>

    </head>

    <body>

      <div class="invoice">

        <img
          class="flower1"
          src="https://png.pngtree.com/png-clipart/20230415/original/pngtree-watercolor-flower-corner-decoration-png-image_9054934.png"
        />

        <img
          class="flower2"
          src="https://png.pngtree.com/png-clipart/20230415/original/pngtree-watercolor-flower-corner-decoration-png-image_9054934.png"
        />

        <img
          class="flower3"
          src="https://png.pngtree.com/png-clipart/20230415/original/pngtree-watercolor-flower-corner-decoration-png-image_9054934.png"
        />

        <img
          class="flower4"
          src="https://png.pngtree.com/png-clipart/20230415/original/pngtree-watercolor-flower-corner-decoration-png-image_9054934.png"
        />

        <div class="content">

          <h1>Friends Auto Mobile</h1>

          <div class="owner">
            Owner : Naimulla
          </div>

          <div class="phone">
            Phone : 9700433876
          </div>

          <div class="customer">
            Customer : ${bill.customerName}
          </div>

          <div class="summary">
            Total : ₹${bill.totalAmount}
          </div>

          <div class="summary">
            Paid : ₹${bill.paidAmount}
          </div>

          <div class="summary">
            Balance : ₹${bill.balanceAmount}
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

        </div>

      </div>

    </body>

    </html>

    `);

    billWindow.document.close();

    billWindow.print();
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