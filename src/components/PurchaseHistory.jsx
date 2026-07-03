import { useEffect, useMemo, useState } from "react";
import DashboardCards from "./DashboardCards";
import CustomerFolder from "./CustomerFolder";
import { downloadBill } from "../utils/invoice";

function PurchaseHistory() {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

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
      console.log("Error loading bills:", error);
    }
  };

  // DELETE BILL
  const deleteBill = async (billId) => {
    const confirmDelete = window.confirm(
      "Delete this bill?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `https://friends-auto-backend-1utc.onrender.com/bills/${billId}`,
        {
          method: "DELETE",
        }
      );

      setBills((prev) =>
        prev.filter((bill) => bill.id !== billId)
      );
    } catch (error) {
      console.log(error);
    }
  };

// EDIT PAID AMOUNT
const editPaidAmount = async (billId) => {
  const bill = bills.find((b) => b.id === billId);

  if (!bill) return;

  const newPaid = prompt(
    "Enter New Paid Amount",
    bill.paidAmount
  );

  if (newPaid === null) return;

  const updatedPaid = Number(newPaid);

  if (isNaN(updatedPaid)) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await fetch(
      `https://friends-auto-backend-1utc.onrender.com/bills/${billId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paidAmount: updatedPaid,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update bill");
    }

    await fetchBills();

    alert("Bill updated successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to update bill.");
  }
};

  // GROUP CUSTOMER BILLS
  const groupedCustomers = useMemo(() => {
    const groups = {};

    bills.forEach((bill) => {
      const customer =
        bill.customerName || "Unknown";

      if (!groups[customer]) {
        groups[customer] = [];
      }

      groups[customer].push(bill);
    });

    return Object.entries(groups)
      .filter(([customer]) =>
        customer
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) =>
        a[0].localeCompare(b[0])
      );
  }, [bills, search]);
   return (
  <div
    style={{
      padding: "20px",
      background: "#f5f7fb",
      minHeight: "100vh",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        color: "#0d47a1",
        fontSize: "42px",
        marginBottom: "25px",
      }}
    >
      Purchase History
    </h1>

    {/* Dashboard */}
    <DashboardCards bills={bills} />

    {/* Search */}
    <div
      style={{
        margin: "30px 0",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search Customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "block",
          margin: "0 auto",
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
          outline: "none",
        }}
      />
    </div>

    {/* No Bills */}
    {groupedCustomers.length === 0 && (
      <h2
        style={{
          textAlign: "center",
          color: "gray",
          marginTop: "40px",
        }}
      >
        No Bills Found
      </h2>
    )}

    {/* Customer Folders */}
    {groupedCustomers.map(
      ([customerName, customerBills]) => (
        <CustomerFolder
          key={customerName}
          customerName={customerName}
          bills={customerBills}
          onEdit={editProducts}
          onDelete={deleteBill}
          onDownload={downloadBill}
        />
      )
    )}

    {/* ===========================
        EDIT PRODUCTS MODAL
    ============================ */}

    {editingBill && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.45)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            background: "#fff",
            width: "95%",
            maxWidth: "1100px",
            borderRadius: "15px",
            padding: "25px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h2
            style={{
              color: "#0d47a1",
              marginBottom: "20px",
            }}
          >
            Edit Products
          </h2>

          <h3>
            Invoice :
            INV-{editingBill.id}
          </h3>

          <h3>
            Customer :
            {editingBill.customerName}
          </h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#0d47a1",
                  color: "#fff",
                }}
              >
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>%</th>
                <th style={thStyle}>Actual</th>
                <th style={thStyle}>Final</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {editingItems.map(
                (item, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>
                      <input
                        value={
                          item.product ||
                          item.productName ||
                          ""
                        }
                        onChange={(e) =>
                          updateItem(
                            index,
                            "productName",
                            e.target.value
                          )
                        }
                        style={inputStyle}
                      />
                    </td>

                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={
                          item.quantity ||
                          item.qty
                        }
                        onChange={(e) =>
                          updateItem(
                            index,
                            "quantity",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        style={smallInput}
                      />
                    </td>

                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={
                          item.percentage
                        }
                        onChange={(e) =>
                          updateItem(
                            index,
                            "percentage",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        style={smallInput}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        type="number"
                        value={
                          item.actualPrice || 0
                        }
                        onChange={(e) =>
                          updateItem(
                            index,
                            "actualPrice",
                            Number(
                              e.target.value
                            )
                          )
                        }
                        style={smallInput}
                      />
                    </td>

                    <td style={tdStyle}>
                      ₹
                      {Number(
                        item.price || 0
                      ).toFixed(2)}
                    </td>

                    <td style={tdStyle}>
                      ₹
                      {Number(
                        item.total || 0
                      ).toFixed(2)}
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() =>
                          removeItem(index)
                        }
                        style={{
                          background: "#d32f2f",
                          color: "#fff",
                          border: "none",
                          padding:
                            "8px 14px",
                          borderRadius:
                            "6px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h3>
                Products Total :
                ₹
                {productsTotal.toFixed(
                  2
                )}
              </h3>

              <h3>
                Previous Balance :
                ₹
                {Number(
                  editingBill.previousBalance ||
                    0
                ).toFixed(2)}
              </h3>

              <h2
                style={{
                  color: "#0d47a1",
                }}
              >
                Grand Total :
                ₹
                {(
                  productsTotal +
                  Number(
                    editingBill.previousBalance ||
                      0
                  )
                ).toFixed(2)}
              </h2>

              <h3
                style={{
                  color: "red",
                }}
              >
                Balance :
                ₹
                {(
                  productsTotal +
                  Number(
                    editingBill.previousBalance ||
                      0
                  ) -
                  Number(
                    editingBill.paidAmount ||
                      0
                  )
                ).toFixed(2)}
              </h3>
            </div>
                        <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                onClick={saveProducts}
                style={{
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setEditingBill(null);
                  setEditingItems([]);
                }}
                style={{
                  background: "#757575",
                  color: "#fff",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// =======================
// STYLES
// =======================

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const smallInput = {
  width: "80px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  textAlign: "center",
};
}
export default PurchaseHistory;