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

  const handleSearch = (value) => {

    setCustomerName(value);

    if (value.length > 0) {

      const filtered =
        customers.filter((customer) =>
          customer.customerName
            .toLowerCase()
            .includes(value.toLowerCase())
        );

      setFilteredCustomers(filtered);

    } else {

      setFilteredCustomers([]);
    }
  };

  return (

    <div>

      <h2>Search Customer</h2>

      <div
        style={{
          position: "relative",
          width: "350px"
        }}
      >

        <input
          type="text"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) =>
            handleSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        {filteredCustomers.length > 0 && (

          <div
            style={{
              position: "absolute",
              top: "55px",
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 1000,
              boxShadow:
                "0px 4px 10px rgba(0,0,0,0.1)"
            }}
          >

            {filteredCustomers.map(
              (customer) => (

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
                      "1px solid #eee"
                  }}
                >
                  {customer.customerName}
                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default CustomerDetails;