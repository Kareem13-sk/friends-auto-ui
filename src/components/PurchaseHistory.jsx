import { useEffect, useState } from "react";
import axios from "axios";

function PurchaseHistory() {

  const [bills, setBills] = useState([]);

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

    const confirmDelete = window.confirm(
      "Delete this bill?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://friends-auto-backend-1utc.onrender.com/bills/${id}`
      );

      fetchBills();

    } catch (error) {

      console.log(error);
    }
  };

  const editPaidAmount = async (bill) => {

    const newPaid = prompt(
      "Enter New Paid Amount",
      bill.paidAmount
    );

    if (!newPaid) return;

    try {

      await axios.put(
        `https://friends-auto-backend-1utc.onrender.com/bills/${bill.id}`,
        {
          ...bill,
          paidAmount: Number(newPaid),
          balanceAmount:
            bill.totalAmount - Number(newPaid),
        }
      );

      fetchBills();

    } catch (error) {

      console.log(error);
    }
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

      {bills.map((bill) => (

        <div
          key={bill.id}
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
              }}
            >

              <button
                onClick={() => editPaidAmount(bill)}
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
                onClick={() => deleteBill(bill.id)}
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
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Total</th>
              </tr>

            </thead>

            <tbody>

              {bill.items?.map((item, index) => (

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