import { useEffect, useState } from "react";
import axios from "axios";

import sparepartsImg from "../assets/spareparts.jpg";

function BillPage() {

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

    fetchProducts();

  }, []);

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

  const addItem = () => {

    const product =
      products.find(
        (p) =>
          p.productName === selectedProduct
      );

    if (!product) {

      alert("Select Product");

      return;
    }

    const percent =
      percentage ||
      product.defaultPercentage ||
      0;

    const finalPrice =
      product.price +
      (
        product.price *
        percent
      ) / 100;

    const total =
      finalPrice * quantity;

    const newItem = {

      productName:
        product.productName,

      quantity,

      percentage: percent,

      price: finalPrice,

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

  const balance =
    subtotal -
    (paidAmount || 0);

  const saveBill = async () => {

    const billData = {

      customerName,

      subtotal,

      finalAmount: subtotal,

      paidAmount,

      balanceAmount: balance,

      billItems

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
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >

        {/* HERO IMAGE */}

        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "30px",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >

          <img
            src={sparepartsImg}
            alt="Spare Parts"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              display: "block"
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "rgba(0,0,0,0.45)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
              boxSizing: "border-box"
            }}
          >

            <h1
              style={{
                color: "white",
                fontSize:
                  "clamp(32px,5vw,60px)",
                marginBottom: "15px"
              }}
            >
              Friends Auto Mobile
            </h1>

            <p
              style={{
                color: "white",
                fontSize:
                  "clamp(16px,2vw,28px)"
              }}
            >
              Engine Spare Parts Billing
              System
            </p>

          </div>

        </div>

        {/* BILL SECTION */}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "25px",
            padding: "25px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)"
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#0d47a1",
              marginBottom: "30px",
              fontSize:
                "clamp(32px,5vw,55px)"
            }}
          >
            Billing Management
          </h1>

          {/* FORM */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "25px"
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
              onChange={(e) => {

                setSelectedProduct(
                  e.target.value
                );

                const product =
                  products.find(
                    (p) =>
                      p.productName ===
                      e.target.value
                  );

                if (product) {

                  setPercentage(
                    product.defaultPercentage
                  );
                }

              }}
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
                  e.target.value
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
                borderCollapse: "collapse",
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
                        }%
                      </td>

                      <td style={tableCell}>
                        ₹
                        {item.price.toFixed(
                          0
                        )}
                      </td>

                      <td style={tableCell}>
                        ₹
                        {item.total.toFixed(
                          0
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
              marginTop: "30px",
              backgroundColor:
                "#f4f7fb",
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

            <h3>
              Subtotal :
              ₹
              {subtotal.toFixed(0)}
            </h3>

            <h3>
              Final Amount :
              ₹
              {subtotal.toFixed(0)}
            </h3>

            <h3>
              Balance :
              ₹
              {balance.toFixed(0)}
            </h3>

            <button
              onClick={saveBill}
              style={{
                ...buttonStyle,
                marginTop: "15px"
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

/* STYLES */

const inputStyle = {

  width: "100%",
  padding: "14px",
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
  cursor: "pointer",
  fontWeight: "600"

};

const tableHeader = {

  padding: "16px",
  textAlign: "left",
  fontSize: "16px"

};

const tableCell = {

  padding: "14px",
  borderBottom: "1px solid #ddd",
  fontSize: "15px"

};

export default BillPage;