import { useEffect, useState } from "react";
import axios from "axios";

import pistonImg from "../assets/piston.jpg";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [customerName,
    setCustomerName] =
    useState("");

  const [phoneNumber,
    setPhoneNumber] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  useEffect(() => {

    fetchCustomers();

  }, []);

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

  const addCustomer = async () => {

    if (
      !customerName ||
      !phoneNumber
    ) {

      alert(
        "Please fill customer details"
      );

      return;
    }

    const customerData = {

      customerName,
      phoneNumber,
      address

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

  const deleteCustomer =
    async (id) => {

      try {

        await axios.delete(
          `https://friends-auto-backend-1utc.onrender.com/customers/${id}`
        );

        fetchCustomers();

      } catch (error) {

        console.log(error);

      }
    };

  const filteredCustomers =
    customers.filter((customer) =>
      customer.customerName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "30px",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >

          <img
            src={pistonImg}
            alt="Piston"
            style={{
              width: "100%",
              height:
                "clamp(220px,35vw,320px)",
              objectFit: "cover",
              display: "block"
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
              boxSizing: "border-box"
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize:
                  "clamp(32px,5vw,60px)",
                marginBottom: "15px"
              }}
            >
              Customer Management
            </h1>

            <p
              style={{
                color: "white",
                fontSize:
                  "clamp(16px,2vw,28px)"
              }}
            >
              Manage Engine Spare Parts
              Customers
            </p>

          </div>

        </div>

        {/* FORM SECTION */}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "25px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              marginBottom: "30px",
              fontSize:
                "clamp(30px,5vw,50px)"
            }}
          >
            Customers
          </h1>

          {/* INPUTS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "20px"
            }}
          >

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

          {/* BUTTON */}

          <button
            onClick={addCustomer}
            style={buttonStyle}
          >
            Add Customer
          </button>

          {/* SEARCH */}

          <div
            style={{
              marginTop: "30px"
            }}
          >

            <input
              type="text"
              placeholder="Search Customer"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={inputStyle}
            />

          </div>

          {/* TABLE */}

          <div
            style={{
              overflowX: "auto",
              marginTop: "25px"
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "100%"
              }}
            >

              <thead>

                <tr
                  style={{
                    backgroundColor:
                      "#0d47a1",
                    color: "white"
                  }}
                >

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
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredCustomers.map(
                  (customer) => (

                    <tr
                      key={customer.id}
                    >

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
                            deleteCustomer(
                              customer.id
                            )
                          }
                          style={{
                            backgroundColor:
                              "red",
                            color: "white",
                            border:
                              "none",
                            padding:
                              "10px 18px",
                            borderRadius:
                              "10px",
                            cursor:
                              "pointer"
                          }}
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

    </div>
  );
}

const inputStyle = {

  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box"

};

const buttonStyle = {

  backgroundColor: "#1565c0",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "600",
  marginTop: "10px"

};

const tableHeader = {

  padding: "16px",
  textAlign: "left"

};

const tableCell = {

  padding: "14px",
  borderBottom: "1px solid #ddd"

};

export default Customers;