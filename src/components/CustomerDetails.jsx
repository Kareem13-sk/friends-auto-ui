import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDetails() {

  const [customerName, setCustomerName] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [filteredCustomers, setFilteredCustomers] =
    useState([]);

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

  const handleCustomerSearch = (value) => {

    setCustomerName(value);

    if (value.trim() === "") {

      setFilteredCustomers([]);

      return;
    }

    const filtered =
      customers.filter((customer) =>
        customer.customerName
          ?.toLowerCase()
          .includes(value.toLowerCase())
      );

    setFilteredCustomers(filtered);
  };

  return (

    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f7fb",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          color: "#0d47a1"
        }}
      >
        Customer Details
      </h1>

      {/* SEARCH CUSTOMER */}

      <div
        style={{
          position: "relative",
          width: "350px",
          marginTop: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) =>
            handleCustomerSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            backgroundColor: "#333",
            color: "white"
          }}
        />

        {/* DROPDOWN */}

        {filteredCustomers.length > 0 && (

          <div
            style={{
              position: "absolute",
              top: "55px",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #ccc",
              zIndex: 9999,
              maxHeight: "250px",
              overflowY: "auto",
              boxShadow:
                "0px 4px 10px rgba(0,0,0,0.2)"
            }}
          >

            {filteredCustomers.map((customer) => (

              <div
                key={customer.id}
                onClick={() => {

                  setCustomerName(
                    customer.customerName
                  );

                  setFilteredCustomers([]);
                }}
                style={{
                  padding: "12px",
                  cursor: "pointer",
                  borderBottom:
                    "1px solid #eee",
                  color: "black"
                }}
              >
                {customer.customerName}
              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerDetails;