import { useEffect, useState } from "react";

function BrandDiscountPage() {

  const [customers, setCustomers] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");

  const [brand, setBrand] = useState("");

  const [discountPercentage,
    setDiscountPercentage] = useState("");

  useEffect(() => {

    loadCustomers();
    loadDiscounts();

  }, []);

  const loadCustomers = async () => {

    const response = await fetch(
      "https://friends-auto-backend-1utc.onrender.com/customers"
    );

    const data = await response.json();

    setCustomers(data);
  };

  const loadDiscounts = async () => {

    const response = await fetch(
      "https://friends-auto-backend-1utc.onrender.com/brand-discounts"
    );

    const data = await response.json();

    setDiscounts(data);
  };

  const saveDiscount = async () => {

    if (
      !customerId ||
      !brand ||
      !discountPercentage
    ) {

      alert("Fill all fields");

      return;
    }

    const payload = {

      customerId,

      customerName,

      brand,

      discountPercentage:
        Number(discountPercentage)
    };

    await fetch(
      "https://friends-auto-backend-1utc.onrender.com/brand-discounts",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)
      }
    );

    setBrand("");
    setDiscountPercentage("");

    loadDiscounts();

    alert(
      "Discount Saved Successfully"
    );
  };

  const deleteDiscount = async (id) => {

    await fetch(
      `https://friends-auto-backend-1utc.onrender.com/brand-discounts/${id}`,
      {
        method: "DELETE"
      }
    );

    loadDiscounts();
  };

  return (

    <div
      style={{
        padding: "20px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1"
        }}
      >
        Brand Discounts
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >

        <select
          value={customerId}
          onChange={(e) => {

            const selected =
              customers.find(
                (c) =>
                  c.id ===
                  Number(
                    e.target.value
                  )
              );

            setCustomerId(
              e.target.value
            );

            setCustomerName(
              selected
                ?.customerName || ""
            );
          }}
          style={inputStyle}
        >

          <option value="">
            Select Customer
          </option>

          {customers.map(
            (customer) => (

              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.customerName}
              </option>

            )
          )}

        </select>

        <select
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          style={inputStyle}
        >

          <option value="">
            Select Brand
          </option>

          <option value="Mahle">
            Mahle
          </option>

          <option value="USHA">
            USHA
          </option>

          <option value="Goetze">
            Goetze
          </option>

          <option value="SAM">
            SAM
          </option>

        </select>

        <input
          type="number"
          placeholder="Discount %"
          value={discountPercentage}
          onChange={(e) =>
            setDiscountPercentage(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={saveDiscount}
          style={buttonStyle}
        >
          Save
        </button>

      </div>

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

            <th style={thStyle}>
              Customer
            </th>

            <th style={thStyle}>
              Brand
            </th>

            <th style={thStyle}>
              Discount %
            </th>

            <th style={thStyle}>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {discounts.map(
            (discount) => (

              <tr key={discount.id}>

                <td style={tdStyle}>
                  {discount.customerName}
                </td>

                <td style={tdStyle}>
                  {discount.brand}
                </td>

                <td style={tdStyle}>
                  {
                    discount.discountPercentage
                  }%
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() =>
                      deleteDiscount(
                        discount.id
                      )
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding:
                        "8px 15px",
                      borderRadius:
                        "5px"
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
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px"
};

const buttonStyle = {
  background: "#0d47a1",
  color: "white",
  border: "none",
  padding: "12px 20px"
};

const thStyle = {
  padding: "15px"
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
  borderBottom: "1px solid #ddd"
};

export default BrandDiscountPage;