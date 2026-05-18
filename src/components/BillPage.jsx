import { useEffect, useState } from "react";
import axios from "axios";

function BillPage() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState("");

  const [selectedProduct, setSelectedProduct] =
    useState("");

  const [quantity, setQuantity] = useState(1);

  const [billItems, setBillItems] = useState([]);

  const [paidAmount, setPaidAmount] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const customerResponse =
      await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

    const productResponse =
      await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

    setCustomers(customerResponse.data);
    setProducts(productResponse.data);
  };

  const addItem = () => {

    const product = products.find(
      (p) => p.id == selectedProduct
    );

    if (!product) return;

    const total =
      product.price * quantity;

    setBillItems([
      ...billItems,
      {
        productName: product.productName,
        quantity,
        price: product.price,
        total
      }
    ]);
  };

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const gst = subtotal * 0.18;

  const finalAmount = subtotal + gst;

  const balanceAmount =
    finalAmount - Number(paidAmount || 0);

  const saveBill = async () => {

    const customer = customers.find(
      (c) => c.id == selectedCustomer
    );

    const billData = {
      customerName: customer.customerName,
      items: JSON.stringify(billItems),
      subtotal,
      gst,
      finalAmount,
      paidAmount,
      balanceAmount
    };

    await axios.post(
      "https://friends-auto-backend-1utc.onrender.com/bills",
      billData
    );

    alert("Bill Saved Successfully");

    setBillItems([]);
    setPaidAmount("");
  };

  return (

    <div style={{
      padding: "20px",
      backgroundColor: "#f4f7fb",
      minHeight: "100vh"
    }}>

      {/* HEADER */}

      <div style={{
        backgroundColor: "#0d47a1",
        color: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "25px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
      }}>

        <h1 style={{
          margin: 0,
          fontSize: "32px"
        }}>
          Billing
        </h1>

      </div>

      {/* BILL FORM */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          Create Bill
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "15px"
        }}>

          <select
            value={selectedCustomer}
            onChange={(e) =>
              setSelectedCustomer(e.target.value)
            }
            style={inputStyle}
          >

            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (

              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.customerName}
              </option>

            ))}

          </select>

          <select
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(e.target.value)
            }
            style={inputStyle}
          >

            <option value="">
              Select Product
            </option>

            {products.map((product) => (

              <option
                key={product.id}
                value={product.id}
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
              setQuantity(e.target.value)
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

      {/* BILL ITEMS */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          Bill Items
        </h2>

        <div style={{
          overflowX: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px"
          }}>

            <thead>

              <tr style={{
                backgroundColor: "#0d47a1",
                color: "white"
              }}>

                <th style={tableHeader}>
                  Product
                </th>

                <th style={tableHeader}>
                  Quantity
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

              {billItems.map((item, index) => (

                <tr key={index}>

                  <td style={tableCell}>
                    {item.productName}
                  </td>

                  <td style={tableCell}>
                    {item.quantity}
                  </td>

                  <td style={tableCell}>
                    ₹{item.price}
                  </td>

                  <td style={tableCell}>
                    ₹{item.total}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* BILL SUMMARY */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <h2 style={{
          color: "#0d47a1",
          marginBottom: "20px"
        }}>
          Bill Summary
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "15px",
          marginBottom: "20px"
        }}>

          <input
            type="number"
            placeholder="Paid Amount"
            value={paidAmount}
            onChange={(e) =>
              setPaidAmount(e.target.value)
            }
            style={inputStyle}
          />

        </div>

        <div style={{
          lineHeight: "35px",
          fontSize: "18px"
        }}>

          <p>
            <strong>Subtotal:</strong>
            ₹{subtotal.toFixed(2)}
          </p>

          <p>
            <strong>GST (18%):</strong>
            ₹{gst.toFixed(2)}
          </p>

          <p>
            <strong>Final Amount:</strong>
            ₹{finalAmount.toFixed(2)}
          </p>

          <p>
            <strong>Balance:</strong>
            ₹{balanceAmount.toFixed(2)}
          </p>

        </div>

        <button
          onClick={saveBill}
          style={buttonStyle}
        >
          Save Bill
        </button>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "14px",
  fontSize: "16px",
  boxSizing: "border-box"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "14px 20px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  marginTop: "10px"
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