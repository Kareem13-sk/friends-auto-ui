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

  // Folder open/close
  const [openCustomer, setOpenCustomer] = useState(null);

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

    uniqueBrands.sort();

    setBrands(uniqueBrands);
  };
  const saveDiscount = async () => {

  if (!customerId || !brand || !discountPercentage) {
    alert("Please fill all fields");
    return;
  }

  const payload = {
    customerId: Number(customerId),
    customerName,
    customerType,
    brand,
    discountPercentage: Number(discountPercentage)
  };

  const url = editId
    ? `https://friends-auto-backend-1utc.onrender.com/brand-discounts/${editId}`
    : "https://friends-auto-backend-1utc.onrender.com/brand-discounts";

  const method = editId ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    alert("Failed to save discount");
    return;
  }

  setCustomerId("");
  setCustomerName("");
  setBrand("");
  setDiscountPercentage("");
  setEditId(null);

  await loadDiscounts();

  alert(
    editId
      ? "Discount Updated Successfully"
      : "Discount Saved Successfully"
  );
};

const deleteDiscount = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this discount?"
  );

  if (!confirmDelete) return;

  const response = await fetch(
    `https://friends-auto-backend-1utc.onrender.com/brand-discounts/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    alert("Delete failed");
    return;
  }

  await loadDiscounts();
};

const editDiscount = async (discount) => {

  setEditId(discount.id);

  setCustomerType(
    discount.customerType || "CUSTOMER"
  );

  // Wait until customers are loaded
  const url =
    (discount.customerType || "CUSTOMER") === "CUSTOMER"
      ? "https://friends-auto-backend-1utc.onrender.com/customers"
      : "https://friends-auto-backend-1utc.onrender.com/weekly-customers";

  const response = await fetch(url);

  const customerData = await response.json();

  setCustomers(customerData);

  setCustomerId(String(discount.customerId));

  setCustomerName(discount.customerName);

  setBrand(discount.brand);

  setDiscountPercentage(
    String(discount.discountPercentage)
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// GROUP BY CUSTOMER
const groupedDiscounts = discounts.reduce((acc, discount) => {

  const key = `${discount.customerType || "CUSTOMER"}-${discount.customerId}`;

  if (!acc[key]) {

    acc[key] = {
      customerId: discount.customerId,
      customerName: discount.customerName,
      customerType:
        discount.customerType || "CUSTOMER",
      discounts: []
    };

  }

  acc[key].discounts.push(discount);

  return acc;

}, {});
return (
  <div
    style={{
      padding: "20px",
      background: "#eef3f9",
      minHeight: "100vh"
    }}
  >

    <h1
      style={{
        textAlign: "center",
        color: "#0d47a1",
        marginBottom: "25px"
      }}
    >
      Brand Discounts
    </h1>

    {/* FORM */}

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "25px"
      }}
    >

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

      <select
        value={customerId}
        onChange={(e) => {

          const selected = customers.find(
            c => c.id === Number(e.target.value)
          );

          setCustomerId(e.target.value);

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

        {customers.map(customer => (

          <option
            key={customer.id}
            value={customer.id}
          >
            {customer.customerName || customer.name}
          </option>

        ))}

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

        {brands.map(brandName => (

          <option
            key={brandName}
            value={brandName}
          >
            {brandName}
          </option>

        ))}

      </select>

      <input
        type="number"
        placeholder="Discount %"
        value={discountPercentage}
        onChange={(e) =>
          setDiscountPercentage(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={saveDiscount}
        style={buttonStyle}
      >
        {editId ? "Update" : "Save"}
      </button>

    </div>

    {/* CUSTOMER FOLDERS */}

    {Object.values(groupedDiscounts).map((customer) => {

      const folderKey =
        `${customer.customerType}-${customer.customerId}`;

      return (

        <div
          key={folderKey}
          style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "20px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)"
          }}
        >

          <div
            onClick={() =>
              setOpenCustomer(
                openCustomer === folderKey
                  ? null
                  : folderKey
              )
            }
            style={{
              background: "#0d47a1",
              color: "white",
              padding: "18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer"
            }}
          >

            <div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold"
                }}
              >
                📁 {customer.customerName}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  marginTop: "5px",
                  opacity: 0.9
                }}
              >
                {customer.customerType ===
                "WEEKLY_CUSTOMER"
                  ? "Weekly Customer"
                  : "Regular Customer"}
              </div>

            </div>

            <div
              style={{
                fontSize: "22px"
              }}
            >
              {openCustomer === folderKey
                ? "▼"
                : "▶"}
            </div>

          </div>
                    {openCustomer === folderKey && (

            <div
              style={{
                padding: "20px"
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
                      background: "#1976d2",
                      color: "white"
                    }}
                  >
                    <th style={thStyle}>Brand</th>
                    <th style={thStyle}>Discount %</th>
                    <th style={thStyle}>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {customer.discounts.map((discount) => (

                    <tr key={discount.id}>

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
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              editDiscount(discount);
                            }}
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
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDiscount(discount.id);
                            }}
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

          )}

        </div>

      );

    })}

  </div>

);
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px"
};

const buttonStyle = {
  background: "#0d47a1",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "6px",
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