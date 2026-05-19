import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customerName, setCustomerName] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {

    fetchCustomers();

  }, []);

  // FETCH CUSTOMERS

  const fetchCustomers = async () => {

    try {

      const response =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/customers"
        );

      setCustomers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // ADD CUSTOMER

  const addCustomer = async () => {

    if (
      !customerName ||
      !phoneNumber ||
      !address
    ) {

      alert("Fill All Fields");

      return;
    }

    const customerData = {

      customerName,

      phoneNumber,

      address,

      totalBalance: 0
    };

    try {

      if (editingId) {

        await axios.put(
          `https://friends-auto-backend-1utc.onrender.com/customers/${editingId}`,
          customerData
        );

        alert(
          "Customer Updated Successfully"
        );

      } else {

        await axios.post(
          "https://friends-auto-backend-1utc.onrender.com/customers",
          customerData
        );

        alert(
          "Customer Added Successfully"
        );
      }

      clearFields();

      fetchCustomers();

    } catch (error) {

      console.log(error);

      alert("Operation Failed");
    }
  };

  // DELETE CUSTOMER

  const deleteCustomer = async (id) => {

    try {

      await axios.delete(
        `https://friends-auto-backend-1utc.onrender.com/customers/${id}`
      );

      fetchCustomers();

    } catch (error) {

      console.log(error);
    }
  };

  // EDIT CUSTOMER

  const editCustomer = (customer) => {

    setCustomerName(
      customer.customerName
    );

    setPhoneNumber(
      customer.phoneNumber
    );

    setAddress(
      customer.address
    );

    setEditingId(customer.id);
  };

  // CLEAR FIELDS

  const clearFields = () => {

    setCustomerName("");

    setPhoneNumber("");

    setAddress("");

    setEditingId(null);
  };

  // SEARCH FILTER

  const filteredCustomers =
    customers.filter((customer) =>
      customer.customerName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div style={containerStyle}>

      {/* HEADER */}

      <div style={headerStyle}>

        <h1 style={headerTitle}>
          Customers
        </h1>

      </div>

      {/* FORM */}

      <div style={formContainer}>

        <h2 style={sectionTitle}>
          Add Customer
        </h2>

        <div style={inputGrid}>

          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            style={inputStyle}
          />

        </div>

        <div
          style={{
            marginTop: "20px"
          }}
        >

          <button
            onClick={addCustomer}
            style={addButton}
          >

            {editingId
              ? "Update Customer"
              : "Add Customer"}

          </button>

          <button
            onClick={clearFields}
            style={clearButton}
          >
            Clear
          </button>

        </div>

      </div>

      {/* CUSTOMER LIST */}

      <div style={tableContainer}>

        <div style={tableHeaderBox}>

          <h2 style={sectionTitle}>
            Customer List
          </h2>

          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={searchStyle}
          />

        </div>

        <div
          style={{
            overflowX: "auto"
          }}
        >

          <table style={tableStyle}>

            <thead>

              <tr style={tableHeaderRow}>

                <th style={tableHeader}>
                  Name
                </th>

                <th style={tableHeader}>
                  Phone
                </th>

                <th style={tableHeader}>
                  Address
                </th>

                <th style={tableHeader}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map(
                (customer) => (

                  <tr key={customer.id}>

                    <td style={tableCell}>
                      {
                        customer.customerName
                      }
                    </td>

                    <td style={tableCell}>
                      {
                        customer.phoneNumber
                      }
                    </td>

                    <td style={tableCell}>
                      {
                        customer.address
                      }
                    </td>

                    <td style={tableCell}>

                      <button
                        onClick={() =>
                          editCustomer(
                            customer
                          )
                        }
                        style={editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCustomer(
                            customer.id
                          )
                        }
                        style={deleteButton}
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

    </div>
  );
}

/* STYLES */

const containerStyle = {

  padding: "20px",

  backgroundColor: "#f4f7fb",

  minHeight: "100vh"
};

const headerStyle = {

  backgroundColor: "#0d47a1",

  padding: "20px",

  borderRadius: "15px",

  marginBottom: "25px",

  color: "white",

  textAlign: "center",

  boxShadow:
    "0px 4px 12px rgba(0,0,0,0.15)"
};

const headerTitle = {

  margin: 0,

  fontSize: "32px"
};

const formContainer = {

  backgroundColor: "white",

  padding: "25px",

  borderRadius: "18px",

  marginBottom: "25px",

  boxShadow:
    "0px 4px 15px rgba(0,0,0,0.08)"
};

const sectionTitle = {

  color: "#0d47a1",

  marginBottom: "20px"
};

const inputGrid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(250px,1fr))",

  gap: "15px"
};

const inputStyle = {

  width: "100%",

  padding: "14px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "16px",

  boxSizing: "border-box"
};

const searchStyle = {

  padding: "12px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "15px",

  width: "250px"
};

const addButton = {

  backgroundColor: "#0d47a1",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  cursor: "pointer",

  marginRight: "10px"
};

const clearButton = {

  backgroundColor: "gray",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  cursor: "pointer"
};

const tableContainer = {

  backgroundColor: "white",

  padding: "25px",

  borderRadius: "18px",

  boxShadow:
    "0px 4px 15px rgba(0,0,0,0.08)"
};

const tableHeaderBox = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  marginBottom: "20px",

  flexWrap: "wrap",

  gap: "15px"
};

const tableStyle = {

  width: "100%",

  borderCollapse: "collapse"
};

const tableHeaderRow = {

  backgroundColor: "#0d47a1",

  color: "white"
};

const tableHeader = {

  padding: "16px",

  textAlign: "left"
};

const tableCell = {

  padding: "14px",

  borderBottom:
    "1px solid #ddd"
};

const editButton = {

  backgroundColor: "#0d47a1",

  color: "white",

  border: "none",

  padding: "8px 14px",

  borderRadius: "8px",

  cursor: "pointer",

  marginRight: "8px"
};

const deleteButton = {

  backgroundColor: "red",

  color: "white",

  border: "none",

  padding: "8px 14px",

  borderRadius: "8px",

  cursor: "pointer"
};

export default Customers;