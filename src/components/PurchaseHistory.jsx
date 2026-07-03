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
            onEdit={editPaidAmount}
            onDelete={deleteBill}
            onDownload={downloadBill}
          />
        )
      )}
    </div>
  );
}

export default PurchaseHistory;