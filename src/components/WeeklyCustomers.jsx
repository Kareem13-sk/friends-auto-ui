import { useEffect, useMemo, useState } from "react";

function WeeklyCustomers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [customerName, setCustomerName] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [address, setAddress] = useState("");

  const [previousBalance, setPreviousBalance] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ==========================
  // LOAD CUSTOMERS
  // ==========================

  const fetchCustomers = async () => {

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/weekly-customers"
      );

      const data = await response.json();

      setCustomers(data);

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // CLEAR FORM
  // ==========================

  const clearForm = () => {

    setEditingCustomer(null);

    setCustomerName("");

    setMobileNumber("");

    setAddress("");

    setPreviousBalance("");

  };

  // ==========================
  // OPEN ADD FORM
  // ==========================

  const openAddCustomer = () => {

    clearForm();

    setShowForm(true);

  };

  // ==========================
  // EDIT CUSTOMER
  // ==========================

  const editCustomer = (customer) => {

    setEditingCustomer(customer);

    setCustomerName(customer.customerName);

    setMobileNumber(customer.mobileNumber);

    setAddress(customer.address);

    setPreviousBalance(
      customer.previousBalance
    );

    setShowForm(true);

  };

  // ==========================
  // SAVE CUSTOMER
  // ==========================

  const saveCustomer = async () => {

    if (!customerName) {

      alert("Enter Customer Name");

      return;

    }

    const customer = {

      customerName,

      mobileNumber,

      address,

      previousBalance:
        Number(previousBalance || 0),

    };

    try {

      if (editingCustomer) {

        await fetch(
          `https://friends-auto-backend-1utc.onrender.com/weekly-customers/${editingCustomer.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(customer),
          }
        );

      } else {

        await fetch(
          "https://friends-auto-backend-1utc.onrender.com/weekly-customers",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(customer),
          }
        );

      }

      setShowForm(false);

      clearForm();

      fetchCustomers();

    } catch (error) {

      console.log(error);

    }

  };
    // ==========================
  // DELETE CUSTOMER
  // ==========================

  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `https://friends-auto-backend-1utc.onrender.com/weekly-customers/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchCustomers();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // SEARCH CUSTOMER
  // ==========================

  const filteredCustomers = useMemo(() => {

    return customers.filter((customer) =>

      (customer.customerName || "")
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [customers, search]);

  return (

    <div
      style={{
        padding: "25px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontSize: "42px",
          marginBottom: "30px",
        }}
      >
        Weekly Customers
      </h1>

      {/* Search & Add */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px",
        }}
      >

        <input
          type="text"
          placeholder="Search Customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            minWidth: "250px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={openAddCustomer}
          style={{
            background: "#1565c0",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          + Add Customer
        </button>

      </div>

      {/* Add/Edit Popup */}

      {showForm && (

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
              width: "500px",
              maxWidth: "95%",
              borderRadius: "15px",
              padding: "25px",
            }}
          >

            <h2
              style={{
                color: "#0d47a1",
                marginBottom: "20px",
              }}
            >
              {editingCustomer
                ? "Edit Weekly Customer"
                : "Add Weekly Customer"}
            </h2>

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) =>
                setMobileNumber(e.target.value)
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              style={{
                ...inputStyle,
                height: "90px",
              }}
            />

            <input
              type="number"
              placeholder="Previous Balance"
              value={previousBalance}
              onChange={(e) =>
                setPreviousBalance(e.target.value)
              }
              style={inputStyle}
            />
                        <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  clearForm();
                }}
                style={{
                  background: "#757575",
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveCustomer}
                style={{
                  background: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {editingCustomer ? "Update Customer" : "Save Customer"}
              </button>
            </div>

          </div>

        </div>

      )}

      {/* Customers Table */}

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.12)",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr
              style={{
                background: "#1565c0",
                color: "#fff",
              }}
            >
              <th style={thStyle}>S.No</th>

              <th style={thStyle}>
                Customer Name
              </th>

              <th style={thStyle}>
                Mobile
              </th>

              <th style={thStyle}>
                Address
              </th>

              <th style={thStyle}>
                Previous Balance
              </th>

              <th style={thStyle}>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCustomers.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  No Weekly Customers Found
                </td>

              </tr>

            )}

            {filteredCustomers.map(
              (customer, index) => (

                <tr key={customer.id}>

                  <td style={tdStyle}>
                    {index + 1}
                  </td>

                  <td style={tdStyle}>
                    {customer.customerName}
                  </td>

                  <td style={tdStyle}>
                    {customer.mobileNumber}
                  </td>

                  <td style={tdStyle}>
                    {customer.address}
                  </td>

                  <td style={tdStyle}>
                    ₹
                    {Number(
                      customer.previousBalance || 0
                    ).toFixed(2)}
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() =>
                        editCustomer(customer)
                      }
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
                      style={deleteBtn}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>
          </div>

  );

}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const thStyle = {
  padding: "15px",
  textAlign: "center",
  fontSize: "16px",
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
  borderBottom: "1px solid #eee",
};

const editBtn = {
  background: "#1565c0",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "8px",
  fontWeight: "bold",
};

const deleteBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default WeeklyCustomers;