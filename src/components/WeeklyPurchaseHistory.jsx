import { useEffect, useMemo, useState } from "react";
import DashboardCards from "./DashboardCards";
import CustomerFolder from "./CustomerFolder";

function WeeklyPurchaseHistory() {

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

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

            // Weekly Bills are already finalized
            onEdit={() => {}}

            onDelete={deleteBill}

            onDownload={downloadWeeklyBill}

          />

        )

      )}
          </div>

  );

}

export default WeeklyPurchaseHistory;