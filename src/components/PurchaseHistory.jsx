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
            font-family: Arial;
            padding: 30px;
          }

          h1{
            text-align:center;
            color:#0d47a1;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          th, td{
            border:1px solid #ddd;
            padding:12px;
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

        <h2>Customer : ${bill.customerName}</h2>

        <h3>Total : ₹${bill.totalAmount}</h3>
        <h3>Paid : ₹${bill.paidAmount}</h3>
        <h3>Balance : ₹${bill.balanceAmount}</h3>

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

        <br/>

        <h2 style="text-align:right">
          Grand Total : ₹${bill.totalAmount}
        </h2>

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