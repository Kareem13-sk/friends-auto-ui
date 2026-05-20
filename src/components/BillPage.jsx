import { useEffect, useState } from "react";
import axios from "axios";

import sparepartsImg from "../assets/spareparts.jpg";

function BillPage() {

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customerName,
    setCustomerName] =
    useState("");

  const [selectedProduct,
    setSelectedProduct] =
    useState("");

  const [quantity,
    setQuantity] =
    useState(1);

  const [percentage,
    setPercentage] =
    useState("");

  const [billItems,
    setBillItems] =
    useState([]);

  const [paidAmount,
    setPaidAmount] =
    useState("");

  useEffect(() => {

    fetchCustomers();
    fetchProducts();

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

  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/products"
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleProductChange =
    (productName) => {

      setSelectedProduct(productName);

      const product =
        products.find(
          (p) =>
            p.productName === productName
        );

      if (product) {

        setPercentage(
          product.defaultPercentage || 0
        );
      }
    };

  const addItem = () => {

    if (!selectedProduct || !quantity) {

      alert("Select product");

      return;
    }

    const product =
      products.find(
        (p) =>
          p.productName === selectedProduct
      );

    if (!product) return;

    const basePrice =
      product.price * quantity;

    // DISCOUNT CALCULATION

    const discountAmount =
      (basePrice * percentage) / 100;

    const total =
      basePrice - discountAmount;

    const newItem = {

      productName:
        product.productName,

      quantity,

      percentage,

      price: product.price,

      total

    };

    setBillItems([
      ...billItems,
      newItem
    ]);

    setSelectedProduct("");
    setQuantity(1);
    setPercentage("");
  };

  const subtotal =
    billItems.reduce(
      (acc, item) =>
        acc + item.total,
      0
    );

  const balanceAmount =
    subtotal - (paidAmount || 0);

  const saveBill = async () => {

    if (!customerName) {

      alert("Enter customer name");

      return;
    }

    const billData = {

      customerName,

      items: billItems,

      finalAmount: subtotal,

      paidAmount:
        Number(paidAmount),

      balanceAmount

    };

    try {

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com/bills",
        billData
      );

      alert("Bill Saved");

      setCustomerName("");
      setBillItems([]);
      setPaidAmount("");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            borderRadius: "25px",
            overflow: "hidden",
            marginBottom: "30px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.15)"
          }}
        >

          <img
            src={sparepartsImg}
            alt="Spare Parts"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px"
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize:
                  "clamp(35px,5vw,65px)",
                marginBottom: "10px"
              }}
            >
              Friends Auto Mobile
            </h1>

            <p
              style={{
                color: "white",
                fontSize:
                  "clamp(18px,2vw,28px)"
              }}
            >
              Engine Spare Parts Billing System
            </p>

          </div>

        </div>

        {/* BILL CARD */}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "30px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              marginBottom: "30px",
              fontSize:
                "clamp(35px,5vw,55px)"
            }}
          >
            Billing Management
          </h1>

          {/* FORM */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
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

            <select
              value={selectedProduct}
              onChange={(e) =>
                handleProductChange(
                  e.target.value
                )
              }
              style={inputStyle}
            >

              <option value="">
                Select Product
              </option>

              {products.map((product) => (

                <option
                  key={product.id}
                  value={
                    product.productName
                  }
                >
                  {product.productName}
                </option>

              ))}

            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Percentage"
              value={percentage}
              onChange={(e) =>
                setPercentage(
                  e.target.value
                )
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

          {/* TABLE */}

          <div
            style={{
              overflowX: "auto",
              marginTop: "30px"
            }}
          >

            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
                minWidth: "700px"
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
                    Product
                  </th>

                  <th style={tableHeader}>
                    Qty
                  </th>

                  <th style={tableHeader}>
                    %
                  </th>

                  <th style={tableHeader}>
                    Price
                  </th>

                  <th style={tableHeader}>
                    Total
                  </th>

                </tr>

              </thead>

              <tbody>

                {billItems.map(
                  (item, index) => (

                    <tr key={index}>

                      <td style={tableCell}>
                        {
                          item.productName
                        }
                      </td>

                      <td style={tableCell}>
                        {
                          item.quantity
                        }
                      </td>

                      <td style={tableCell}>
                        {
                          item.percentage
                        }
                        %
                      </td>

                      <td style={tableCell}>
                        ₹
                        {Math.round(
                          item.price
                        )}
                      </td>

                      <td style={tableCell}>
                        ₹
                        {Math.round(
                          item.total
                        )}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          {/* SUMMARY */}

          <div
            style={{
              marginTop: "40px",
              backgroundColor:
                "#eef3f9",
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
                setPaidAmount(
                  e.target.value
                )
              }
              style={{
                ...inputStyle,
                marginBottom: "20px"
              }}
            />

            <h2>
              Subtotal : ₹
              {Math.round(subtotal)}
            </h2>

            <h2>
              Balance : ₹
              {Math.round(
                balanceAmount
              )}
            </h2>

            <button
              onClick={saveBill}
              style={{
                ...buttonStyle,
                marginTop: "20px"
              }}
            >
              Save Bill
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",
  padding: "15px",
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
  fontWeight: "bold",
  cursor: "pointer"

};

const tableHeader = {

  padding: "16px",
  textAlign: "left"

};

const tableCell = {

  padding: "16px",
  borderBottom: "1px solid #ddd"

};

export default BillPage;