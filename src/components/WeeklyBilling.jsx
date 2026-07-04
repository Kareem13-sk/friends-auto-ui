import { useEffect, useState } from "react";
import Select from "react-select";

const STORAGE_KEY = "weeklyBillingDraft";

function WeeklyBilling() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerName, setCustomerName] = useState("");

  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [percentage, setPercentage] = useState("");

  const [weeklyItems, setWeeklyItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [previousBalance, setPreviousBalance] = useState("");

  // ============================
  // LOAD WEEKLY CUSTOMERS
  // ============================

  useEffect(() => {

    fetch(
      "https://friends-auto-backend-1utc.onrender.com/weekly-customers"
    )
      .then((res) => res.json())
      .then((data) => {

        setCustomers(data);

        const draft =
          localStorage.getItem(STORAGE_KEY);

        if (draft) {

          const saved = JSON.parse(draft);

          if (saved.customerName) {

            const customer =
              data.find(
                (c) =>
                  c.customerName ===
                  saved.customerName
              );

            if (customer) {

              setSelectedCustomer(customer);

            }

          }

        }

      });

    fetch(
      "https://friends-auto-backend-1utc.onrender.com/products"
    )
      .then((res) => res.json())
      .then((data) => {

        setProducts(data);

      });

  }, []);

  // ============================
  // RESTORE DRAFT
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

    setWeeklyItems(
      data.weeklyItems || []
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

      weeklyItems,

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

    weeklyItems,

    previousBalance

  ]);

  // ============================
  // CUSTOMER SEARCH
  // ============================

  const handleCustomerChange = (e) => {

    const value = e.target.value;

    setCustomerName(value);

    if (value.trim() === "") {

      setFilteredCustomers([]);

      return;

    }

    const filtered =
      customers.filter((customer) => {

        return (
          customer.customerName || ""
        )
          .toLowerCase()
          .includes(value.toLowerCase());

      });

    setFilteredCustomers(filtered);

  };

  // ============================
// LOAD CUSTOMER PRODUCTS
// ============================

const loadWeeklyItems = async (customerName) => {

  try {

    const response = await fetch(
      `https://friends-auto-backend-1utc.onrender.com/weekly-entry/customer/${customerName}`
    );

    if (!response.ok) {

      throw new Error();

    }

    const data = await response.json();

    setWeeklyItems(data);

  }

  catch (error) {

    console.log(error);

  }

};
// ============================
// DELETE PRODUCT
// ============================

const deleteWeeklyItem = async (id) => {

  const confirmDelete = window.confirm(
    "Delete this product?"
  );

  if (!confirmDelete) return;

  try {

    await fetch(
      `https://friends-auto-backend-1utc.onrender.com/weekly-entry/${id}`,
      {
        method: "DELETE"
      }
    );

    await loadWeeklyItems(customerName);

  } catch (error) {

    console.log(error);

    alert("Unable to delete.");

  }

};

    // ============================
  // ADD PRODUCT
  // ============================

  const addItem = async () => {

    if (!customerName) {

      alert("Select Weekly Customer");

      return;

    }

    if (!selectedProduct) {

      alert("Select Product");

      return;

    }

    const product = products.find(
      (p) =>
        p.productName === selectedProduct
    );

    if (!product) {

      alert("Product not found");

      return;

    }

    const qty = Number(quantity);

    const percent = Number(percentage || 0);

    const actualPrice =
      Number(product.price) || 0;

    const finalPrice =
      actualPrice -
      (actualPrice * percent) / 100;

    const total =
      finalPrice * qty;

    const newItem = {

      customerName,

      productName:
        product.productName,

      quantity: qty,

      percentage: percent,

      actualPrice,

      finalPrice,

      total

    };

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/weekly-entry",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(newItem)

        }
      );

      if (!response.ok) {

        throw new Error();

      }

      await loadWeeklyItems(customerName);

      setSelectedProduct("");

      setQuantity(1);

      setPercentage("");

      alert("Product Added");

    }

    catch (error) {

      console.log(error);

      alert("Unable to Add Product");

    }

  };

  // ============================
  // TOTALS
  // ============================

  const productsTotal =
    weeklyItems.reduce(

      (sum, item) =>

        sum + Number(item.total),

      0

    );

  const grandTotal =

    productsTotal +

    Number(previousBalance || 0);

  // ============================
  // GENERATE BILL
  // ============================

  const generateBill = () => {

    alert(

      "Weekly Bill generation will be implemented in next step."

    );

  };

  return (

    <div
      style={{
        background:"#eef3f9",
        minHeight:"100vh",
        padding:"20px"
      }}
    >

      <h1
        style={{
          textAlign:"center",
          color:"#0d47a1",
          fontSize:"55px",
          marginBottom:"30px"
        }}
      >

        Weekly Billing

      </h1>

      <div
        style={{
          background:"white",
          padding:"25px",
          borderRadius:"20px",
          marginBottom:"25px",
          position:"relative"
        }}
      >

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
            "1fr 1fr 1fr 1fr",
            gap:"15px"
          }}
        >
                  {/* WEEKLY CUSTOMER */}

          <div
            style={{
              position: "relative"
            }}
          >

            <input
              type="text"
              placeholder="Weekly Customer"
              value={customerName}
              onChange={handleCustomerChange}
              style={inputStyle}
            />

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
                      "0 2px 10px rgba(0,0,0,.2)",
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

                          setSelectedCustomer(
                            customer
                          );

                          setPreviousBalance(
                            customer.previousBalance || 0
                          );

                          loadWeeklyItems(
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

          <Select

            placeholder="Search Product..."

            isSearchable

            options={products.map(product => ({
              value: product.productName,
              label: product.productName
            }))}

            value={
              products
                .map(product => ({
                  value: product.productName,
                  label: product.productName
                }))
                .find(
                  option =>
                    option.value ===
                    selectedProduct
                ) || null
            }

            onChange={(selectedOption) => {

              const value =
                selectedOption?.value || "";

              setSelectedProduct(value);

              const product =
                products.find(
                  p =>
                    p.productName === value
                );

              if (!product) return;

              if (!selectedCustomer) {

                setPercentage(
                  product.defaultPercentage || 0
                );

                return;

              }

              fetch(

                `https://friends-auto-backend-1utc.onrender.com/brand-discounts/find?customerId=${selectedCustomer.id}&brand=${product.brand}`

              )

                .then(res => {

                  if (!res.ok)
                    throw new Error();

                  return res.json();

                })

                .then(discount => {

                  setPercentage(

                    discount?.discountPercentage ||

                    product.defaultPercentage ||

                    0

                  );

                })

                .catch(() => {

                  setPercentage(

                    product.defaultPercentage || 0

                  );

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

          Add Product

        </button>

      </div>
            {/* WEEKLY PRODUCTS */}

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

            {weeklyItems.length === 0 ? (

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

              weeklyItems.map((item, index) => (

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
                    ₹{Number(item.finalPrice).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(item.total).toFixed(2)}
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() => {

  setEditingId(item.id);

  setSelectedProduct(item.productName);

  setQuantity(item.quantity);

  setPercentage(item.percentage);

}}
                      style={{
                        background:"#1565c0",
                        color:"white",
                        border:"none",
                        padding:"6px 12px",
                        borderRadius:"6px",
                        marginRight:"10px",
                        cursor:"pointer"
                      }}
                    >
                      Edit
                    </button>

                    <button

  onClick={() => deleteWeeklyItem(item.id)}
                      style={{
                        background:"red",
                        color:"white",
                        border:"none",
                        padding:"6px 12px",
                        borderRadius:"6px",
                        cursor:"pointer"
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
          background:"white",
          padding:"25px",
          borderRadius:"20px"
        }}
      >

        <h2
          style={{
            color:"#0d47a1",
            marginBottom:"20px"
          }}
        >
          Weekly Summary
        </h2>

        <h2>
          Products Total :
          ₹{productsTotal.toFixed(2)}
        </h2>

        <h2>
          Previous Balance :
          ₹{Number(previousBalance || 0).toFixed(2)}
        </h2>

        <h2>
          Grand Total :
          ₹{grandTotal.toFixed(2)}
        </h2>

        <button
          onClick={generateBill}
          style={{
            marginTop:"20px",
            background:"green",
            color:"white",
            border:"none",
            padding:"15px 25px",
            borderRadius:"10px",
            fontSize:"18px",
            cursor:"pointer"
          }}
        >
          Generate Weekly Bill
        </button>

      </div>

    </div>

  );

}

const inputStyle = {
  padding:"15px",
  borderRadius:"10px",
  border:"1px solid #ccc",
  fontSize:"16px",
  width:"100%"
};

const buttonStyle = {
  marginTop:"20px",
  background:"#1565c0",
  color:"white",
  border:"none",
  padding:"12px 20px",
  borderRadius:"10px",
  fontSize:"18px",
  cursor:"pointer"
};

const thStyle = {
  padding:"15px",
  fontSize:"18px"
};

const tdStyle = {
  padding:"15px",
  textAlign:"center",
  borderBottom:"1px solid #ddd",
  fontSize:"16px"
};

export default WeeklyBilling;