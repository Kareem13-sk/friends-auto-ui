import { useEffect, useState } from "react";
import axios from "axios";

function CustomerPage() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    discountPercentage: "",
    totalBalance: ""
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {

    const response =
      await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

    setCustomers(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveCustomer = async () => {

    if (editingId) {

      await axios.put(
        `https://friends-auto-backend-1utc.onrender.com/customers/${editingId}`,
        formData
      );

    } else {

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com/customers",
        formData
      );
    }

    fetchCustomers();

    resetForm();
  };

  const editCustomer = (customer) => {

    setEditingId(customer.id);

    setFormData({
      customerName: customer.customerName,
      phone: customer.phone,
      address: customer.address,
      discountPercentage: customer.discountPercentage,
      totalBalance: customer.totalBalance
    });
  };

  const deleteCustomer = async (id) => {

    await axios.delete(
      `https://friends-auto-backend-1utc.onrender.com/customers/${id}`
    );

    fetchCustomers();
  };

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      customerName: "",
      phone: "",
      address: "",
      discountPercentage: "",
      totalBalance: ""
    });
  };

  return (

    <div style={{
      padding: "20px",
      backgroundColor: "#f4f7fb",
      minHeight: "100vh"
    }}>

      <div style={{
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "25px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "32px"
        }}>
          Customers
        </h1>

      </div>

      {/* FORM SECTION */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          {editingId
            ? "Edit Customer"
            : "Add Customer"}
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "15px"
        }}>

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount %"
            value={formData.discountPercentage}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="totalBalance"
            placeholder="Balance Amount"
            value={formData.totalBalance}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>

        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}>

          <button
            onClick={saveCustomer}
            style={buttonStyle}
          >
            {editingId
              ? "Update Customer"
              : "Add Customer"}
          </button>

          <button
            onClick={resetForm}
            style={{
              ...buttonStyle,
              backgroundColor: "gray"
            }}
          >
            Clear
          </button>

        </div>

      </div>

      {/* CUSTOMER LIST */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px"
        }}>

          <h2 style={{
            color: "#0d47a1",
            margin: 0
          }}>
            Customer List
          </h2>

          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              ...inputStyle,
              maxWidth: "300px"
            }}
          />

        </div>

        <div style={{
          overflowX: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px"
          }}>

            <thead>

              <tr style={{
                backgroundColor: "#0d47a1",
                color: "white"
              }}>

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
                  Discount
                </th>

                <th style={tableHeader}>
                  Balance
                </th>

                <th style={tableHeader}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {customers
                .filter((customer) =>
                  customer.customerName
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((customer) => (

                  <tr key={customer.id}>

                    <td style={tableCell}>
                      {customer.customerName}
                    </td>

                    <td style={tableCell}>
                      {customer.phone}
                    </td>

                    <td style={tableCell}>
                      {customer.address}
                    </td>

                    <td style={tableCell}>
                      {customer.discountPercentage}%
                    </td>

                    <td style={tableCell}>
                      ₹{customer.totalBalance}
                    </td>

                    <td style={tableCell}>

                      <div style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                      }}>

                        <button
                          onClick={() =>
                            editCustomer(customer)
                          }
                          style={{
                            ...actionButton,
                            backgroundColor: "#0d47a1"
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteCustomer(customer.id)
                          }
                          style={{
                            ...actionButton,
                            backgroundColor: "red"
                          }}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "14px",
  fontSize: "16px",
  boxSizing: "border-box"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600"
};

const actionButton = {
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px"
};

const tableHeader = {
  padding: "16px",
  textAlign: "left",
  fontSize: "16px"
};

const tableCell = {
  padding: "14px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px"
};

export default CustomerPage;