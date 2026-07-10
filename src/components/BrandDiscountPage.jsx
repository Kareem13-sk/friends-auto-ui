import { useEffect, useState } from "react";

function BrandDiscountPage() {

  const [customerType, setCustomerType] = useState("CUSTOMER");

  const [customers, setCustomers] = useState([]);

  const [discounts, setDiscounts] = useState([]);

  const [customerId, setCustomerId] = useState("");

  const [customerName, setCustomerName] = useState("");

  const [brand, setBrand] = useState("");

  const [discountPercentage, setDiscountPercentage] = useState("");

  const [brands, setBrands] = useState([]);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadCustomers();
    loadDiscounts();
    loadBrands();
  }, []);

  useEffect(() => {
    loadCustomers();

    setCustomerId("");
    setCustomerName("");
  }, [customerType]);

  const loadCustomers = async () => {

    const url =
      customerType === "CUSTOMER"
        ? "https://friends-auto-backend-1utc.onrender.com/customers"
        : "https://friends-auto-backend-1utc.onrender.com/weekly-customers";

    const response = await fetch(url);

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

  const loadBrands = async () => {

    const response = await fetch(
      "https://friends-auto-backend-1utc.onrender.com/products"
    );

    const products = await response.json();

    const uniqueBrands = [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(
            (brand) =>
              brand &&
              brand.trim() !== ""
          )
      )
    ];

    setBrands(uniqueBrands);
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

      customerId: Number(customerId),

      customerName,

      customerType,

      brand,

      discountPercentage:
        Number(discountPercentage)

    };

    const url = editId
      ? `https://friends-auto-backend-1utc.onrender.com/brand-discounts/${editId}`
      : "https://friends-auto-backend-1utc.onrender.com/brand-discounts";

    const method =
      editId ? "PUT" : "POST";

    await fetch(url, {

      method,

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(payload)

    });

    setCustomerId("");

    setCustomerName("");

    setBrand("");

    setDiscountPercentage("");

    setEditId(null);

    loadDiscounts();

    alert(
      editId
        ? "Discount Updated Successfully"
        : "Discount Saved Successfully"
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

  const editDiscount = (discount) => {

    setEditId(discount.id);

    setCustomerType(
      discount.customerType || "CUSTOMER"
    );

    setCustomerId(
      discount.customerId
    );

    setCustomerName(
      discount.customerName
    );

    setBrand(
      discount.brand
    );

    setDiscountPercentage(
      discount.discountPercentage
    );

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

      {/* CUSTOMER TYPE */}

      <select
        value={customerType}
        onChange={(e) =>
          setCustomerType(e.target.value)
        }
        style={inputStyle}
      >
        <option value="CUSTOMER">
          Regular Customer
        </option>

        <option value="WEEKLY_CUSTOMER">
          Weekly Customer
        </option>

      </select>

      {/* CUSTOMER */}

      <select
        value={customerId}
        onChange={(e) => {

          const selected =
            customers.find(
              (c) =>
                c.id ===
                Number(e.target.value)
            );

          setCustomerId(
            e.target.value
          );

          setCustomerName(
            selected?.customerName ||
            selected?.name ||
            ""
          );

        }}
        style={inputStyle}
      >

        <option value="">

          {customerType === "CUSTOMER"
            ? "Select Customer"
            : "Select Weekly Customer"}

        </option>

        {customers.map((customer) => (

          <option
            key={customer.id}
            value={customer.id}
          >

            {customer.customerName ||
              customer.name}

          </option>

        ))}

      </select>

      {/* BRAND */}

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

        {brands.map(
          (brandName) => (

            <option
              key={brandName}
              value={brandName}
            >
              {brandName}
            </option>

          )
        )}

      </select>

      {/* DISCOUNT */}

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
        {editId
          ? "Update"
          : "Save"}
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
    <th style={thStyle}>Customer Type</th>

    <th style={thStyle}>Customer</th>

    <th style={thStyle}>Brand</th>

    <th style={thStyle}>Discount %</th>

    <th style={thStyle}>Action</th>
  </tr>
</thead>

<tbody>

  {discounts.map((discount) => (

    <tr key={discount.id}>

      <td style={tdStyle}>
        {discount.customerType === "WEEKLY_CUSTOMER"
          ? "Weekly Customer"
          : "Regular Customer"}
      </td>

      <td style={tdStyle}>
        {discount.customerName}
      </td>

      <td style={tdStyle}>
        {discount.brand}
      </td>

      <td style={tdStyle}>
        {discount.discountPercentage}%
      </td>

      <td style={tdStyle}>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px"
          }}
        >

          <button
            onClick={() =>
              editDiscount(discount)
            }
            style={{
              background: "#1565c0",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteDiscount(discount.id)
            }
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer"
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
  padding: "12px 20px",
  cursor: "pointer"
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
    