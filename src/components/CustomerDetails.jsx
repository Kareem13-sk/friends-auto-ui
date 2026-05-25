import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [bills, setBills] = useState([]);

  const [totalPurchase, setTotalPurchase] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      setCustomers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if (search.trim() === "") {

      setFilteredCustomers([]);
      return;
    }

    const filtered = customers.filter((customer) =>
      customer.customerName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredCustomers(filtered);

  }, [search, customers]);

  const selectCustomer = async (customerName) => {

  setSearch(customerName);
  setFilteredCustomers([]);

  try {

    const response = await axios.get(
      `https://friends-auto-backend-1utc.onrender.com/bills`
    );

    const customerBills = response.data.filter(
      (bill) =>
        bill.customerName?.toLowerCase() ===
        customerName.toLowerCase()
    );

    setBills(customerBills);

    let total = 0;
    let balance = 0;

    customerBills.forEach((bill) => {

      total += Number(bill.totalAmount || 0);

      balance += Number(bill.balanceAmount || 0);
    });

    setTotalPurchase(total);

    setPendingBalance(balance);

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
          fontWeight: "bold",
        }}
      >
        Customer Details
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          position: "relative",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >

        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            border: "2px solid #dce3f0",
            fontSize: "18px",
            outline: "none",
          }}
        />

        {search !== "" && filteredCustomers.length > 0 && (

          <div
            style={{
              position: "absolute",
              top: "95px",
              left: "30px",
              right: "30px",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "12px",
              zIndex: 1000,
              maxHeight: "220px",
              overflowY: "auto",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}
          >

            {filteredCustomers.map((customer) => (

              <div
                key={customer.id}
                onClick={() =>
                  selectCustomer(customer.customerName)
                }
                style={{
                  padding: "14px 18px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  fontSize: "17px",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f2f6ff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                }}
              >
                {customer.customerName}
              </div>

            ))}

          </div>
        )}

      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >

        <div
          style={{
            flex: 1,
            background: "#0d47a1",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Total Purchase</h2>

          <h1>₹{totalPurchase}</h1>
        </div>

        <div
          style={{
            flex: 1,
            background: "#0d47a1",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Pending Balance</h2>

          <h1>₹{pendingBalance}</h1>
        </div>

      </div>

      <div
        style={{
          background: "white",
          marginTop: "30px",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            color: "#0d47a1",
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          Bill History
        </h2>

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
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Paid</th>
              <th style={thStyle}>Balance</th>
            </tr>

          </thead>

          <tbody>

            {bills.length > 0 ? (

              bills.map((bill) => (

                <tr key={bill.id}>

                  <td style={tdStyle}>
                    ₹{bill.totalAmount}
                  </td>

                  <td style={tdStyle}>
                    ₹{bill.paidAmount}
                  </td>

                  <td style={tdStyle}>
                    ₹{bill.balanceAmount}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  No Bills Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

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

export default CustomerDetails;