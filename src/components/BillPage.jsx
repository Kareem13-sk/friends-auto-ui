import { useEffect, useState } from "react";

function BillPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [percentage, setPercentage] = useState("");

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    fetch("https://friends-auto-backend.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));

    fetch("https://friends-auto-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleCustomerChange = (e) => {
    const value = e.target.value;

    setCustomerName(value);

    if (value.length > 0) {
      const filtered = customers.filter((customer) =>
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
      <div
        style={{
          background: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "60px",
          fontWeight: "bold",
          color: "#0d47a1"
        }}
      >
        Friends Auto Mobile
      </div>

      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          fontSize: "70px",
          fontWeight: "bold",
          color: "#0d47a1"
        }}
      >
        Billing Management
      </div>

      <div
        style={{
          background: "white",
          marginTop: "40px",
          borderRadius: "25px",
          padding: "30px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "20px"
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={handleCustomerChange}
              style={inputStyle}
            />

            {filteredCustomers.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  width: "100%",
                  background: "white",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  zIndex: 1000
                }}
              >
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => {
                      setCustomerName(customer.customerName);
                      setFilteredCustomers([]);
                    }}
                    style={{
                      padding: "12px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
                  >
                    {customer.customerName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <select
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(e.target.value)
            }
            style={inputStyle}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.productName}
              >
                {product.productName}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Percentage"
            value={percentage}
            onChange={(e) =>
              setPercentage(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        <button style={buttonStyle}>
          Add Item
        </button>
      </div>

      <div
        style={{
          background: "white",
          marginTop: "30px",
          borderRadius: "25px",
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
                background: "#0d47a1",
                color: "white"
              }}
            >
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>%</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
        </table>
      </div>

      <div
        style={{
          background: "white",
          marginTop: "30px",
          borderRadius: "25px",
          padding: "20px"
        }}
      >
        <h2 style={{ color: "#0d47a1" }}>
          Bill Summary
        </h2>

        <input
          type="number"
          placeholder="Paid Amount"
          style={{
            ...inputStyle,
            width: "100%",
            marginTop: "20px"
          }}
        />

        <h2>Subtotal : ₹0</h2>
        <h2>Balance : ₹0</h2>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#0d47a1",
          color: "white",
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        © 2026 Friends Auto Mobile | All Rights Reserved
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "16px",
  borderRadius: "12px",
  border: "2px solid #dcdcdc",
  fontSize: "18px",
  width: "100%"
};

const buttonStyle = {
  marginTop: "25px",
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "14px 30px",
  borderRadius: "12px",
  fontSize: "18px",
  cursor: "pointer"
};

const thStyle = {
  padding: "18px",
  fontSize: "20px"
};

export default BillPage;