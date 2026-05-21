import { useEffect, useState } from "react";

function BillPage() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] =
    useState("");

  const [filteredCustomers, setFilteredCustomers] =
    useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  const [percentage, setPercentage] =
    useState("");

  const [billItems, setBillItems] = useState([]);

  const [paidAmount, setPaidAmount] = useState("");

  // LOAD DATA
  useEffect(() => {
    const savedCustomers =
      JSON.parse(localStorage.getItem("customers")) ||
      [];

    setCustomers(savedCustomers);

    const savedProducts =
      JSON.parse(localStorage.getItem("products")) ||
      [];

    setProducts(savedProducts);
    console.log(savedProducts);

    fetch("https://friends-auto-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // CUSTOMER AUTO SUGGESTION
  const handleCustomerChange = (e) => {
    const value = e.target.value;

    setCustomerName(value);

    if (value.trim() === "") {
      setFilteredCustomers([]);
      return;
    }

    const filtered = customers.filter((customer) =>
      customer.customerName
        ?.toLowerCase()
        .includes(value.toLowerCase())
    );

    setFilteredCustomers(filtered);
  };

  // ADD BILL ITEM
  const addItem = () => {
    if (!customerName) {
      alert("Enter Customer Name");
      return;
    }

    if (!selectedProduct) {
      alert("Select Product");
      return;
    }

    const product = products.find(
  (p) =>
    (
      p.productName ||
      p.name ||
      p.product ||
      ""
    ) === selectedProduct
);

    if (!product) {
      alert("Product not found");
      return;
    }

    const qty = Number(quantity);

    const percent = Number(percentage || 0);

    const productPrice =
      Number(product.price) || 0;

    // DISCOUNT
    const discountAmount =
      productPrice * (percent / 100);

    const finalPrice =
      productPrice - discountAmount;

    const total = finalPrice * qty;

    const newItem = {
      product:
        product.productName || product.name,
      qty,
      percentage: percent,
      price: finalPrice,
      total
    };

    setBillItems([...billItems, newItem]);

    setSelectedProduct("");
    setQuantity(1);
    setPercentage("");
  };

  // TOTALS
  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const balance =
    subtotal - Number(paidAmount || 0);

  return (
    <div
      style={{
        background: "#eef3f9",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      {/* PAGE TITLE */}
      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontSize: "55px",
          marginBottom: "30px"
        }}
      >
        Billing Management
      </h1>

      {/* FORM */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "25px",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr",
            gap: "15px"
          }}
        >
          {/* CUSTOMER NAME */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={handleCustomerChange}
              style={inputStyle}
            />

            {/* AUTOSUGGESTION */}
            {filteredCustomers.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "55px",
                  left: 0,
                  right: 0,
                  background: "white",
                  borderRadius: "10px",
                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.2)",
                  zIndex: 1000
                }}
              >
                {filteredCustomers.map(
                  (customer, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCustomerName(
                          customer.customerName
                        );

                        setFilteredCustomers([]);
                      }}
                      style={{
                        padding: "10px",
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

          {/* PRODUCT DROPDOWN */}
          <select
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(
                e.target.value
              )
            }
            style={inputStyle}
          >
            <option value="">
              Select Product
            </option>

           {products.map((product, index) => {

  const productValue =
    product.productName ||
    product.name ||
    product.product ||
    "";

  return (
    <option
      key={index}
      value={productValue}
    >
      {productValue}
    </option>
  );
})}
          </select>

          {/* QUANTITY */}
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            style={inputStyle}
          />

          {/* PERCENTAGE */}
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

        {/* BUTTON */}
        <button
          onClick={addItem}
          style={buttonStyle}
        >
          Add Item
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "25px"
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

          <tbody>
            {billItems.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>
                  {item.product}
                </td>

                <td style={tdStyle}>
                  {item.qty}
                </td>

                <td style={tdStyle}>
                  {item.percentage}%
                </td>

                <td style={tdStyle}>
                  ₹{item.price}
                </td>

                <td style={tdStyle}>
                  ₹{item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BILL SUMMARY */}
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "20px"
        }}
      >
        <h2
          style={{
            color: "#0d47a1",
            marginBottom: "20px"
          }}
        >
          Bill Summary
        </h2>

        <input
          type="number"
          placeholder="Paid Amount"
          value={paidAmount}
          onChange={(e) =>
            setPaidAmount(e.target.value)
          }
          style={{
            ...inputStyle,
            width: "100%",
            marginBottom: "20px"
          }}
        />

        <h2>Subtotal : ₹{subtotal}</h2>

        <h2>Balance : ₹{balance}</h2>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  width: "100%"
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
  fontSize: "18px"
};

const tdStyle = {
  padding: "15px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "16px"
};

export default BillPage;