import { useEffect, useState } from "react";
import Select from "react-select";

const STORAGE_KEY = "billingDraft";

function BillPage() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [percentage, setPercentage] = useState("");

  const [actualPrice, setActualPrice] = useState("");

  const [billItems, setBillItems] = useState([]);

  const [paidAmount, setPaidAmount] = useState("");

  const [previousBalance, setPreviousBalance] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // ============================
  // LOAD CUSTOMERS & PRODUCTS
  // ============================
  useEffect(() => {

    fetch("https://friends-auto-backend-1utc.onrender.com/customers")
      .then((res) => res.json())
      .then((data) => {

        setCustomers(data);

        // Restore selected customer after customers load
        const draft =
          localStorage.getItem(STORAGE_KEY);

        if (draft) {

          const saved = JSON.parse(draft);

          if (saved.customerName) {

            const customer = data.find(
              (c) =>
                c.customerName ===
                saved.customerName
            );

            if (customer) {
              setSelectedCustomer(customer);
            }
          }
        }

      })
      .catch((err) => console.log(err));

    fetch("https://friends-auto-backend-1utc.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));

  }, []);

  // ============================
  // RESTORE BILL DRAFT
  // ============================
  useEffect(() => {

    const draft =
      localStorage.getItem(STORAGE_KEY);

    if (!draft) return;

    const data = JSON.parse(draft);

    setCustomerName(
      data.customerName || ""
    );

    setSelectedProduct(
      data.selectedProduct || ""
    );

    setQuantity(
      data.quantity || 1
    );

    setPercentage(
      data.percentage || ""
    );

    setBillItems(
      data.billItems || []
    );

    setPaidAmount(
      data.paidAmount || ""
    );

    setPreviousBalance(
      data.previousBalance || ""
    );

  }, []);

  // ============================
  // AUTO SAVE DRAFT
  // ============================
  useEffect(() => {

    const draft = {

      customerName,

      selectedProduct,

      quantity,

      percentage,

      billItems,

      paidAmount,

      previousBalance

    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(draft)
    );

  }, [

    customerName,

    selectedProduct,

    quantity,

    percentage,

    billItems,

    paidAmount,

    previousBalance

  ]);
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

    const price = Number(actualPrice || product.price);

    const finalPrice =
  price -
  (price * percent) / 100;

    const total = finalPrice * qty;

    const newItem = {

      productName:
        product.productName ||
        product.name,

      quantity: qty,

      actualPrice: price,

      percentage: percent,

      finalPrice,

      price: finalPrice,

      total

    };

    setBillItems((prev) => [...prev, newItem]);

    setSelectedProduct("");
    setQuantity(1);
    setActualPrice("");
  };

  // TOTALS
  const subtotal = billItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const grandTotal =
    subtotal +
    Number(previousBalance || 0);

  const balance =
    grandTotal -
    Number(paidAmount || 0);

  // SAVE BILL
  const saveBill = async () => {

    if (billItems.length === 0) {
      alert("No items added");
      return;
    }

    const billData = {

  customerName,

  items: billItems,

  // Products total only
  totalAmount: subtotal,

  // Previous pending amount
  previousBalance: Number(previousBalance || 0),

  // Amount customer paid
  paidAmount: Number(paidAmount || 0),

  // Remaining balance
  balanceAmount: balance,

  // Bill date
  billDate: new Date().toISOString().split("T")[0]

};

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/bills",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(billData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save bill");
      }

      alert("Bill Saved Successfully");

      // REMOVE SAVED DRAFT
      localStorage.removeItem(STORAGE_KEY);

      // CLEAR FORM
      setBillItems([]);
      setCustomerName("");
      setSelectedCustomer(null);
      setSelectedProduct("");
      setQuantity(1);
      setPercentage("");
      setPaidAmount("");
      setPreviousBalance("");
      setFilteredCustomers([]);

    } catch (error) {

      console.log(error);

      alert("Error saving bill");
    }
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
        Billing
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

          <div
            style={{
              position: "relative"
            }}
          >

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={handleCustomerChange}
              style={inputStyle}
            />

            {
              customerName &&
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

                  {
                    filteredCustomers.map(
                      (customer, index) => (

                        <div
                          key={index}
                          onClick={() => {

                            setCustomerName(
                              customer.customerName
                            );

                            setSelectedCustomer(
                              customer
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
                    )
                  }

                </div>

              )
            }

          </div>

          {/* PRODUCT */}

          <Select
  placeholder="Search Product..."
  isSearchable

  options={products.map(product => ({
    value: product.productName,
    label: product.productName
  }))}

  filterOption={(option, inputValue) => {
    if (!inputValue) return true;

    return option.label
      .toLowerCase()
      .startsWith(inputValue.toLowerCase());
  }}

  value={
    products
      .map(product => ({
        value: product.productName,
        label: product.productName
      }))
      .find(option => option.value === selectedProduct) || null
  }

  onChange={(selectedOption) => {
    const value = selectedOption?.value || "";

    setSelectedProduct(value);

    const product = products.find(
      p => p.productName === value
    );

    if (!product) return;

    if (!selectedCustomer) {
      setPercentage(product.defaultPercentage || 0);
      return;
    }

    fetch(
      `https://friends-auto-backend-1utc.onrender.com/brand-discounts/find?customerId=${selectedCustomer.id}&customerType=CUSTOMER&brand=${product.brand}`
    )
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(discount => {
        setPercentage(
          discount?.discountPercentage ??
          product.defaultPercentage ??
          0
        );
      })
      .catch(() => {
        setPercentage(product.defaultPercentage || 0);
      });
  }}

  styles={{
    control: (provided) => ({
      ...provided,
      minHeight: "55px",
      borderRadius: "10px"
    })
  }}
/>

          {/* QUANTITY */}

          <input

            type="number"

            value={quantity}

            onChange={(e) =>
              setQuantity(e.target.value)
            }

            style={inputStyle}

          />

          {/* DISCOUNT */}


<div
  style={{
    display: "flex",
    gap: "10px"
  }}
></div>
<input
    type="number"
    placeholder="Actual Price"
    value={actualPrice}
    onChange={(e) =>
      setActualPrice(e.target.value)
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
              <th style={thStyle}>S.No</th>
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

            {billItems.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "25px",
                    color: "#777"
                  }}
                >
                  No Products Added
                </td>

              </tr>

            ) : (

              billItems.map((item, index) => (

                <tr key={index}>

                  <td style={tdStyle}>
                    {index + 1}
                  </td>

                  <td style={tdStyle}>
                    {item.productName}
                  </td>

                  <td style={tdStyle}>
                    {item.quantity}
                  </td>

                  <td style={tdStyle}>
                    {item.percentage}%
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(item.actualPrice).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(item.price).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(item.total).toFixed(2)}
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() => {

                        setSelectedProduct(
                          item.productName
                        );

                        setQuantity(
                          item.quantity
                        );

                        setPercentage(
                          item.percentage
                        );
                        setActualPrice(item.actualPrice);

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

              ))

            )}

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
          placeholder="Previous Balance"
          value={previousBalance}
          onChange={(e) =>
            setPreviousBalance(e.target.value)
          }
          style={{
            ...inputStyle,
            width: "100%",
            marginBottom: "20px"
          }}
        />

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

        <h2>
          Current Bill :
          ₹{subtotal.toFixed(2)}
        </h2>

        <h2>
          Previous Balance :
          ₹{Number(previousBalance || 0).toFixed(2)}
        </h2>

        <h2>
          Grand Total :
          ₹{grandTotal.toFixed(2)}
        </h2>

        <h2>
          Balance :
          ₹{balance.toFixed(2)}
        </h2>

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