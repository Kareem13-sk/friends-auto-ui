import { useEffect, useState } from "react";
import axios from "axios";

function BillPage() {

  const [customerName, setCustomerName] = useState("");

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [billItems, setBillItems] = useState([]);

  const [paidAmount, setPaidAmount] = useState("");

  useEffect(() => {

    fetchCustomers();

    fetchProducts();

  }, []);

  // FETCH CUSTOMERS

  const fetchCustomers = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/customers"
      );

      setCustomers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);
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

    if (!product) {

      alert("Product Not Found");

      return;
    }

    const itemTotal =
      Number(product.price) * Number(quantity);

    const item = {

      productName: product.productName,

      quantity: Number(quantity),

      price: Number(product.price),

      total: itemTotal
    };

    setBillItems([...billItems, item]);

    setSelectedProduct("");

    setQuantity(1);
  };

  // CALCULATIONS

  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const finalAmount = subtotal;

  const balance =
    finalAmount - Number(paidAmount || 0);

  // SAVE BILL

  const saveBill = async () => {

    if (!customerName) {

      alert("Enter Customer Name");

      return;
    }

    if (billItems.length === 0) {

      alert("Add Products");

      return;
    }

    try {

      const billData = {

        customerName: customerName,

        totalAmount: subtotal,

        finalAmount: finalAmount,

        paidAmount: Number(paidAmount),

        balanceAmount: balance
      };

      console.log(billData);

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com/bills",
        billData
      );

      alert("Bill Saved Successfully");

      setCustomerName("");

      setBillItems([]);

      setPaidAmount("");

    } catch (error) {

      console.log(error);

      alert("Failed To Save Bill");
    }
  };

  return (

    <div style={containerStyle}>

      <h1 style={titleStyle}>
        Billing Management
      </h1>

      {/* CUSTOMER */}

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
        list="customerList"
        style={inputStyle}
      />

      <datalist id="customerList">

        {customers.map((customer) => (

          <option
            key={customer.id}
            value={customer.customerName}
          />

        ))}

      </datalist>

      {/* PRODUCT */}

      <div style={productRow}>

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
              value={product.productName}
            >

              {product.productName} - ₹{product.price}

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

      {/* BILL ITEMS */}

      <h2 style={sectionTitle}>
        Bill Items
      </h2>

      <div style={{ overflowX: "auto" }}>

        <table style={tableStyle}>

          <thead>

            <tr style={tableHeaderRow}>

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

      {/* SUMMARY */}

      <div style={summaryBox}>

        <h2 style={sectionTitle}>
          Bill Summary
        </h2>

        <input
          type="number"
          placeholder="Paid Amount"
          value={paidAmount}
          onChange={(e) =>
            setPaidAmount(e.target.value)
          }
          style={inputStyle}
        />

        <h3>
          Subtotal: ₹{subtotal}
        </h3>

        <h3>
          Final Amount: ₹{finalAmount}
        </h3>

        <h3>
          Balance: ₹{balance}
        </h3>

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

/* STYLES */

const containerStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
};

const titleStyle = {
  color: "#0d47a1",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "50px"
};

const sectionTitle = {
  color: "#0d47a1",
  marginTop: "20px",
  marginBottom: "15px",
  textAlign: "center"
};

const productRow = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
  marginTop: "20px",
  marginBottom: "20px"
};

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
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const tableHeaderRow = {
  backgroundColor: "#0d47a1",
  color: "white"
};

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

const summaryBox = {
  marginTop: "30px",
  backgroundColor: "#f4f7fb",
  padding: "20px",
  borderRadius: "14px"
};

export default BillPage;