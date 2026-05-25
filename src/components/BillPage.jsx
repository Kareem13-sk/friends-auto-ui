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

  const [paidAmount, setPaidAmount] =
    useState("");

  // LOAD CUSTOMERS + PRODUCTS
  useEffect(() => {

    fetch("https://friends-auto-backend-1utc.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => console.log(err));

    fetch("https://friends-auto-backend-1utc.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
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

    const filtered = customers.filter((customer) => {

      const customerNameText =
        (
          customer.customerName ||
          customer.name ||
          ""
        ).toLowerCase();

      return customerNameText.includes(
        value.toLowerCase()
      );
    });

    setFilteredCustomers(filtered);
  };

  // ADD ITEM
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
          ""
        ) === selectedProduct
    );

    if (!product) {
      alert("Product not found");
      return;
    }

    const qty = Number(quantity);

    const percent = Number(percentage || 0);

    // ACTUAL PRICE
    const actualPrice =
      Number(product.price) || 0;

    // DISCOUNTED PRICE
    const finalPrice =
      actualPrice -
      (actualPrice * percent) / 100;

    const total = finalPrice * qty;

    const newItem = {

      product:
        product.productName ||
        product.name,

      qty,

      percentage: percent,

      actualPrice,

      price: finalPrice,

      total
    };

    setBillItems([...billItems, newItem]);

    setSelectedProduct("");
    setQuantity(1);
  };

  // TOTALS
  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const balance =
    subtotal - Number(paidAmount || 0);

  // SAVE BILL
  const saveBill = () => {

    if (billItems.length === 0) {
      alert("No items added");
      return;
    }

    const billData = {

      customerName,

      items: billItems,

      totalAmount: subtotal,

      paidAmount: Number(paidAmount),

      balanceAmount: balance,

      date: new Date().toLocaleString()
    };

    const existingBills =
      JSON.parse(localStorage.getItem("bills")) || [];

    existingBills.push(billData);

    localStorage.setItem(
      "bills",
      JSON.stringify(existingBills)
    );

    alert("Bill Saved Successfully");

    setBillItems([]);
    setCustomerName("");
    setPaidAmount("");
  };

  return (

    <div
      style={{
        background: "#eef3f9",
        minHeight: "100vh",
        padding: "20px"
      }}
    >

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

          {/* CUSTOMER */}
          <div style={{ position: "relative" }}>

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={handleCustomerChange}
              style={inputStyle}
            />

            {/* AUTO SUGGESTION */}
            {customerName &&
              filteredCustomers.length > 0 && (

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

          {/* PRODUCT */}
          <select
            value={selectedProduct}
            onChange={(e) => {

              const value = e.target.value;

              setSelectedProduct(value);

              const product = products.find(
                (p) =>
                  (
                    p.productName ||
                    p.name ||
                    ""
                  ) === value
              );

              if (product) {

                setPercentage(
                  product.defaultPercentage || 0
                );
              }
            }}
            style={inputStyle}
          >

            <option value="">
              Select Product
            </option>

            {products.map((product, index) => (

              <option
                key={index}
                value={
                  product.productName ||
                  product.name
                }
              >
                {product.productName ||
                  product.name}
              </option>

            ))}

          </select>

          {/* QTY */}
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
              <th style={thStyle}>Actual Price</th>
              <th style={thStyle}>Final Price</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Action</th>
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
                  ₹{item.actualPrice}
                </td>

                <td style={tdStyle}>
                  ₹{item.price}
                </td>

                <td style={tdStyle}>
                  ₹{item.total}
                </td>

                <td style={tdStyle}>

                  <button
                    onClick={() => {

                      setSelectedProduct(
                        item.product
                      );

                      setQuantity(item.qty);

                      setPercentage(
                        item.percentage
                      );

                      setBillItems(
                        billItems.filter(
                          (_, i) => i !== index
                        )
                      );
                    }}
                    style={{
                      background: "#1565c0",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      marginRight: "10px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {

                      setBillItems(
                        billItems.filter(
                          (_, i) => i !== index
                        )
                      );
                    }}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer"
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

      {/* SUMMARY */}
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

        <button
          onClick={saveBill}
          style={{
            marginTop: "20px",
            background: "green",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Save Bill
        </button>

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