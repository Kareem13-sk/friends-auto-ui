import { useEffect, useState } from "react";
import axios from "axios";

import pistonImg from "../assets/piston.jpg";

function CustomerPage() {

  const [customers, setCustomers] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");

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

  const addCustomer = async () => {

    if (!customerName || !phoneNumber) {

      alert("Please fill all fields");
      return;
    }

    const customerData = {
      customerName,
      phoneNumber,
      address,
    };

    try {

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com/customers",
        customerData
      );

      alert("Customer Added");

      setCustomerName("");
      setPhoneNumber("");
      setAddress("");

      fetchCustomers();

    } catch (error) {

      console.log(error);

    }
  };

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

  const filteredCustomers = customers.filter((customer) =>
    customer.customerName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div
      style={{
        background: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden",
      }}
    >

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            borderRadius: "25px",
            overflow: "hidden",
            marginBottom: "30px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
          }}
        >

          <img
            src={pistonImg}
            alt="customer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize: "60px",
                marginBottom: "10px",
              }}
            >
              Customer Management
            </h1>

            <p
              style={{
                color: "white",
                fontSize: "24px",
              }}
            >
              Engine Spare Parts Customers
            </p>

          </div>

        </div>

        {/* MAIN CARD */}

        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "30px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              color: "#0d47a1",
              fontSize: "45px",
              marginBottom: "30px",
            }}
          >
            Customers
          </h2>

          {/* FORM */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >

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
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              style={inputStyle}
            />

          </div>

          <button
            onClick={addCustomer}
            style={buttonStyle}
          >
            Add Customer
          </button>

          {/* SEARCH */}

          <div style={{ marginTop: "30px" }}>

            <input
              type="text"
              placeholder="Search Customer"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={inputStyle}
            />

          </div>

          {/* TABLE */}

          <div
            style={{
              overflowX: "auto",
              marginTop: "30px",
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
                    background: "#0d47a1",
                    color: "white",
                  }}
                >

                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    <td style={tdStyle}>
                      {customer.customerName}
                    </td>

                    <td style={tdStyle}>
                      {customer.phoneNumber}
                    </td>

                    <td style={tdStyle}>
                      {customer.address}
                    </td>

                    <td style={tdStyle}>

                      <button
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "10px 18px",
                          borderRadius: "10px",
                          cursor: "pointer",
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

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "14px 25px",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
};

const tdStyle = {
  padding: "16px",
  borderBottom: "1px solid #ddd",
};

export default CustomerPage;