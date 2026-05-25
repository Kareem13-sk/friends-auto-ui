import React, { useEffect, useState } from "react";

function BillPage() {

  const [customerName, setCustomerName] = useState("");

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  const [percentage, setPercentage] = useState("");

  const [billItems, setBillItems] = useState([]);

  const [paidAmount, setPaidAmount] = useState("");

  const [editingIndex, setEditingIndex] =
    useState(null);

  // LOAD CUSTOMERS

  useEffect(() => {

    fetch(
      "https://friends-auto-backend-1utc.onrender.com/customers"
    )
      .then((res) => res.json())
      .then((data) => {

        console.log("CUSTOMER API:", data);

        setCustomers(data || []);
      })
      .catch((err) => console.log(err));

  }, []);

  // LOAD PRODUCTS

  useEffect(() => {

    fetch(
      "https://friends-auto-backend-1utc.onrender.com/products"
    )
      .then((res) => res.json())
      .then((data) => {

        console.log("PRODUCTS:", data);

        setProducts(data || []);
      })
      .catch((err) => console.log(err));

  }, []);

  // CUSTOMER AUTOSUGGESTION

  const filteredCustomers =
    customers.filter((c) =>
      c.customerName
        ?.toLowerCase()
        .includes(customerName.toLowerCase())
    );

  // PRODUCT CHANGE

  const handleProductChange = (e) => {

    const productName = e.target.value;

    setSelectedProduct(productName);

    const product = products.find(
      (p) => p.productName === productName
    );

    if (product) {

      setPercentage(
        product.defaultPercentage || 0
      );
    }
  };

  // ADD ITEM

  const addItem = () => {

    if (!selectedProduct) {

      alert("Select Product");

      return;
    }

    const product = products.find(
      (p) => p.productName === selectedProduct
    );

    if (!product) return;

    const qty = Number(quantity);

    const per = Number(percentage);

    const price =
      product.price -
      (product.price * per) / 100;

    const total = price * qty;

    const newItem = {

      product: selectedProduct,

      quantity: qty,

      percentage: per,

      price,

      total,
    };

    // EDIT

    if (editingIndex !== null) {

      const updated = [...billItems];

      updated[editingIndex] = newItem;

      setBillItems(updated);

      setEditingIndex(null);

    } else {

      setBillItems([...billItems, newItem]);
    }

    // RESET

    setSelectedProduct("");

    setQuantity(1);

    setPercentage("");
  };

  // DELETE ITEM

  const deleteItem = (index) => {

    const updated =
      billItems.filter((_, i) => i !== index);

    setBillItems(updated);
  };

  // EDIT ITEM

  const editItem = (index) => {

    const item = billItems[index];

    setSelectedProduct(item.product);

    setQuantity(item.quantity);

    setPercentage(item.percentage);

    setEditingIndex(index);
  };

  // TOTALS

  const subtotal =
    billItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

  const balance =
    subtotal - Number(paidAmount || 0);

  return (

    <div>

      <h1
        style={{
          textAlign: "center",
          color: "#0d47a1",
          fontSize: "70px",
          marginBottom: "40px",
        }}
      >
        Billing Management
      </h1>

      {/* FORM */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "25px",
          marginBottom: "30px",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >

          {/* CUSTOMER */}

          <div style={{ position: "relative" }}>

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              style={inputStyle}
            />

            {
              customerName &&
              filteredCustomers.length > 0 && (

                <div
                  style={{
                    position: "absolute",
                    background: "white",
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                    maxHeight: "150px",
                    overflowY: "auto",
                  }}
                >

                  {
                    filteredCustomers.map(
                      (customer) => (

                        <div
                          key={customer.id}
                          onClick={() => {

                            setCustomerName(
                              customer.customerName
                            );
                          }}
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                            borderBottom:
                              "1px solid #eee",
                          }}
                        >
                          {customer.customerName}
                        </div>
                      )
                    )
                  }

                </div>
              )
            }

          </div>

          {/* PRODUCT */}

          <select
            value={selectedProduct}
            onChange={handleProductChange}
            style={inputStyle}
          >

            <option value="">
              Select Product
            </option>

            {
              products.map((product) => (

                <option
                  key={product.id}
                  value={product.productName}
                >
                  {product.productName.toUpperCase()}
                </option>
              ))
            }

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
          {
            editingIndex !== null
              ? "Update Item"
              : "Add Item"
          }
        </button>

      </div>

      {/* TABLE */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "25px",
          marginBottom: "30px",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >

          <thead>

            <tr
              style={{
                background: "#0d47a1",
                color: "white",
              }}
            >

              <th style={thStyle}>Product</th>

              <th style={thStyle}>Qty</th>

              <th style={thStyle}>%</th>

              <th style={thStyle}>Price</th>

              <th style={thStyle}>Total</th>

              <th style={thStyle}>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              billItems.map((item, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {item.product}
                  </td>

                  <td style={tdStyle}>
                    {item.quantity}
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

                  <td style={tdStyle}>

                    <button
                      onClick={() =>
                        editItem(index)
                      }
                      style={{
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 15px",
                        borderRadius: "8px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteItem(index)
                      }
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding:
                          "8px 15px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

      {/* SUMMARY */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "25px",
        }}
      >

        <h2
          style={{
            color: "#0d47a1",
            marginBottom: "20px",
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
            marginBottom: "20px",
          }}
        />

        <h2>
          Subtotal : ₹{subtotal.toFixed(2)}
        </h2>

        <h2>
          Balance : ₹{balance.toFixed(2)}
        </h2>

      </div>

    </div>
  );
}

const inputStyle = {

  padding: "18px",

  borderRadius: "15px",

  border: "1px solid #ccc",

  fontSize: "18px",

  width: "100%",
};

const buttonStyle = {

  background:
    "linear-gradient(to right,#1565c0,#0d47a1)",

  color: "white",

  padding: "15px 30px",

  border: "none",

  borderRadius: "15px",

  marginTop: "25px",

  fontSize: "20px",

  cursor: "pointer",
};

const thStyle = {

  padding: "18px",

  fontSize: "20px",
};

const tdStyle = {

  padding: "18px",

  textAlign: "center",

  borderBottom: "1px solid #ddd",
};

export default Billing;