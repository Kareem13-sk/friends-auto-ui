import { useEffect, useState } from "react";

function CustomerPage() {

  const [customers, setCustomers] =
    useState([]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] =
    useState("");

  const [editIndex, setEditIndex] =
    useState(null);

  // LOAD CUSTOMERS FROM BACKEND

  useEffect(() => {

    fetch(
      "https://friends-auto-backend-1utc.onrender.com/customers"
    )
      .then((res) => res.json())
      .then((data) => {

        console.log("CUSTOMERS:", data);

        setCustomers(data);

        localStorage.setItem(
          "customers",
          JSON.stringify(data)
        );
      })
      .catch((err) => console.log(err));

  }, []);

  // SAVE CUSTOMERS

  const saveCustomers = (
    updatedCustomers
  ) => {

    setCustomers(updatedCustomers);

    localStorage.setItem(
      "customers",
      JSON.stringify(updatedCustomers)
    );
  };

  // ADD OR UPDATE CUSTOMER

const handleSubmit = async () => {

  if (!name || !phone || !address) {

    alert("Please fill all fields");

    return;
  }

  const customerData = {

    customerName: name,
    phone: phone,
    address: address
  };

  try {

    // UPDATE CUSTOMER

    if (editIndex !== null) {

      const customerId =
        customers[editIndex].id;

      const response = await fetch(
        `https://friends-auto-backend-1utc.onrender.com/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            customerData
          )
        }
      );

      const updatedCustomer =
        await response.json();

      const updatedCustomers =
        [...customers];

      updatedCustomers[editIndex] =
        updatedCustomer;

      saveCustomers(updatedCustomers);

      setEditIndex(null);

      alert("Customer Updated Successfully");

    } else {

      // ADD CUSTOMER

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/customers",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            customerData
          )
        }
      );

      const data =
        await response.json();

      const updatedCustomers = [
        ...customers,
        data
      ];

      saveCustomers(updatedCustomers);

      alert("Customer Added Successfully");
    }

    // RESET

    setName("");
    setPhone("");
    setAddress("");

  } catch (error) {

    console.log(error);

    alert("Failed to save customer");
  }
};

  // EDIT CUSTOMER

  const handleEdit = (
    customer,
    index
  ) => {

    setName(customer.customerName);

    setPhone(customer.phone);

    setAddress(customer.address);

    setEditIndex(index);
  };

  // DELETE CUSTOMER

  const handleDelete = async (customerId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this customer?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `https://friends-auto-backend-1utc.onrender.com/customers/${customerId}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const updatedCustomers = customers.filter(
      (customer) => customer.id !== customerId
    );

    saveCustomers(updatedCustomers);

    alert("Customer deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete customer");
  }
};
  return (

    <div
      style={{
        background: "#eef3f9",
        padding: "20px",
        borderRadius: "10px",
        minHeight: "100vh"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontSize: "50px",
          marginBottom: "30px"
        }}
      >
        Customers
      </h1>

      {/* FORM */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "20px"
          }}
        >

          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
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
          onClick={handleSubmit}
          style={buttonStyle}
        >

          {editIndex !== null
            ? "Update Customer"
            : "Add Customer"}

        </button>

      </div>

      {/* TABLE */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px"
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#0d47a1",
                color: "white"
              }}
            >
              <th style={thStyle}>S.No</th>

              <th style={thStyle}>
                Name
              </th>

              <th style={thStyle}>
                Phone
              </th>

              <th style={thStyle}>
                Address
              </th>

              <th style={thStyle}>
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map(
              (customer, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
  {index + 1}
</td>

                  <td style={tdStyle}>
                    {customer.customerName}
                  </td>

                  <td style={tdStyle}>
                    {customer.phone}
                  </td>

                  <td style={tdStyle}>
                    {customer.address}
                  </td>

                  <td style={tdStyle}>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent:
                          "center"
                      }}
                    >

                      <button
  onClick={() =>
    handleEdit(customer, index)
  }

                        style={{
                          background:
                            "#1565c0",

                          color: "white",

                          border: "none",

                          padding:
                            "8px 15px",

                          borderRadius:
                            "6px",

                          cursor:
                            "pointer"
                        }}
                      >
                        Edit
                      </button>

                      <button
  onClick={() =>
    handleDelete(customer.id)
  }

                        style={{
                          background:
                            "#d32f2f",

                          color: "white",

                          border: "none",

                          padding:
                            "8px 15px",

                          borderRadius:
                            "6px",

                          cursor:
                            "pointer"
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div
        style={{
          background: "#0d47a1",
          color: "white",
          textAlign: "center",
          padding: "15px",
          marginTop: "30px",
          borderRadius: "10px"
        }}
      >
        © 2026 Friends Auto Mobile |
        All Rights Reserved
      </div>

    </div>
  );
}

const inputStyle = {

  padding: "15px",

  borderRadius: "10px",

  border: "1px solid #ccc",

  fontSize: "18px"
};

const buttonStyle = {

  marginTop: "20px",

  background: "#1565c0",

  color: "white",

  border: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  fontSize: "18px",

  cursor: "pointer"
};

const thStyle = {

  padding: "15px",

  fontSize: "20px"
};

const tdStyle = {

  padding: "15px",

  textAlign: "center",

  borderBottom:
    "1px solid #ddd",

  fontSize: "18px"
};

export default CustomerPage;