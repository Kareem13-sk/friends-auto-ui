import { useEffect, useMemo, useState } from "react";
import DashboardCards from "./DashboardCards";
import CustomerFolder from "./CustomerFolder";



function WeeklyPurchaseHistory() {

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  // Edit Weekly Bill
const [editingBill, setEditingBill] = useState(null);
const [editingItems, setEditingItems] = useState([]);

  useEffect(() => {

    fetchBills();

  }, []);

  // ===============================
  // LOAD WEEKLY BILLS
  // ===============================

  const fetchBills = async () => {

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/weekly-bills"
      );

      const data = await response.json();

      setBills(Array.isArray(data) ? data : []);

    } catch (error) {

      console.log(
        "Unable to load weekly bills",
        error
      );

    }

  };

  // ===============================
  // DELETE BILL
  // ===============================

  const deleteBill = async (billId) => {

    const confirmDelete =
      window.confirm(
        "Delete this weekly bill?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(
        `https://friends-auto-backend-1utc.onrender.com/weekly-bills/${billId}`,
        {
          method: "DELETE"
        }
      );

      setBills(prev =>
        prev.filter(
          bill => bill.id !== billId
        )
      );

    }

    catch (error) {

      console.log(error);

      alert("Unable to delete bill.");

    }

  };
  const editProducts = (bill) => {

  setEditingBill(bill);

  setEditingItems(
    JSON.parse(
      JSON.stringify(bill.items || [])
    )
  );

};
// ===============================
// UPDATE PRODUCT
// ===============================

const updateItem = (index, field, value) => {

  const items = [...editingItems];

  items[index][field] = value;

  const qty = Number(items[index].quantity || 0);

  const actual = Number(items[index].actualPrice || 0);

  const percent = Number(items[index].percentage || 0);

  const finalPrice =
    actual - (actual * percent) / 100;

  items[index].finalPrice = finalPrice;

  items[index].price = finalPrice;

  items[index].total = finalPrice * qty;

  setEditingItems(items);

};

// ===============================
// REMOVE PRODUCT
// ===============================

const removeItem = (index) => {

  const items = [...editingItems];

  items.splice(index, 1);

  setEditingItems(items);

};

// ===============================
// PRODUCTS TOTAL
// ===============================

const productsTotal = editingItems.reduce(

  (sum, item) => sum + Number(item.total || 0),

  0

);

  // ===============================
  // DOWNLOAD
  // ===============================

  const downloadWeeklyBill = (bill) => {

    alert(
      "Weekly Invoice PDF will be connected in the next step."
    );

  };

  // ===============================
  // GROUP CUSTOMER
  // ===============================

  const groupedCustomers =
    useMemo(() => {

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
            .includes(
              search.toLowerCase()
            )

        )

        .sort((a, b) =>

          a[0].localeCompare(b[0])

        );

    }, [

      bills,

      search

    ]);

  return (

    <div
      style={{
        padding: "20px",
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontSize: "42px",
          marginBottom: "25px"
        }}
      >

        Weekly Purchase History

      </h1>

      <DashboardCards
        bills={bills}
      />
            {/* ===============================
          SEARCH
      =============================== */}

      <div
        style={{
          margin: "30px 0",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Weekly Customer..."
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

      {/* ===============================
          NO BILLS
      =============================== */}

      {groupedCustomers.length === 0 && (

        <h2
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: "40px",
          }}
        >
          No Weekly Bills Found
        </h2>

      )}

      {/* ===============================
          CUSTOMER FOLDERS
      =============================== */}

      {groupedCustomers.map(

        ([customerName, customerBills]) => (

          <CustomerFolder
  key={customerName}
  customerName={customerName}
  bills={customerBills}
  onEdit={editProducts}
  onDelete={deleteBill}
  onDownload={downloadWeeklyBill}
/>

        )

      )}
          </div>

  );

}

export default WeeklyPurchaseHistory;