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
      padding: "30px",
      backgroundColor: "#f4f7fb",
      borderRadius: "10px",
      marginBottom: "30px"
    }}>

      <div style={{
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px"
      }}>

        <h1>Friends Auto Mobile</h1>

      </div>

      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ color: "black" }}>
          {editingId ? "Edit Customer" : "Add Customer"}
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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
            placeholder="Phone"
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
            placeholder="Balance"
            value={formData.totalBalance}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>

        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px"
        }}>

          <button
            onClick={saveCustomer}
            style={buttonStyle}
          >
            {editingId ? "Update Customer" : "Add Customer"}
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

      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px"
        }}>

          <h2 style={{ color: "black" }}>
            Customer List
          </h2>

          <input
            type="text"
            placeholder="Search Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={inputStyle}
          />

        </div>

        <div style={{ overflowX: "auto" }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse"
          }}>

            <thead>

              <tr style={{
                backgroundColor: "#0d47a1",
                color: "white"
              }}>

                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Phone</th>
                <th style={tableHeader}>Address</th>
                <th style={tableHeader}>Discount</th>
                <th style={tableHeader}>Balance</th>
                <th style={tableHeader}>Actions</th>

              </tr>

            </thead>

            <tbody>

              {customers
                .filter((customer) =>
                  customer.customerName
                    .toLowerCase()
                    .includes(search.toLowerCase())
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

                      <button
                        onClick={() => editCustomer(customer)}
                        style={{
                          ...actionButton,
                          backgroundColor: "#0d47a1"
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        style={{
                          ...actionButton,
                          backgroundColor: "red"
                        }}
                      >
                        Delete
                      </button>

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
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const actionButton = {
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default CustomerPage;