import { useEffect, useState } from "react";
import axios from "axios";

function BillPage() {

  const [bills, setBills] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    totalAmount: "",
    discount: "",
    paidAmount: ""
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {

    const response =
      await axios.get("https://friends-auto-backend-1utc.onrender.com");

    setBills(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createBill = async () => {

    await axios.post(
      "https://friends-auto-backend-1utc.onrender.com",
      formData
    );

    fetchBills();

    setFormData({
      customerName: "",
      totalAmount: "",
      discount: "",
      paidAmount: ""
    });
  };

  return (

    <div style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "30px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ color: "black" }}>
        Billing Management
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "15px"
      }}>

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={formData.discount}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={formData.paidAmount}
          onChange={handleChange}
          style={inputStyle}
        />

      </div>

      <button
        onClick={createBill}
        style={{
          marginTop: "20px",
          backgroundColor: "#0d47a1",
          color: "white",
          padding: "12px 25px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Create Bill
      </button>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "10px"
      }}>

        <h2 style={{ color: "black" }}>
          Bill History
        </h2>

        <input
          type="text"
          placeholder="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "250px"
          }}
        />

      </div>

      <div style={{ overflowX: "auto" }}>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr style={{
              backgroundColor: "#0d47a1",
              color: "white"
            }}>

              <th style={tableHeader}>Customer</th>
              <th style={tableHeader}>Total</th>
              <th style={tableHeader}>GST</th>
              <th style={tableHeader}>Final</th>
              <th style={tableHeader}>Balance</th>
              <th style={tableHeader}>Invoice</th>

            </tr>

          </thead>

          <tbody>

            {bills
              .filter((bill) =>
                bill.customerName
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((bill) => (

                <tr key={bill.id}>

                  <td style={tableCell}>
                    {bill.customerName}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.totalAmount}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.gst}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.finalAmount}
                  </td>

                  <td style={tableCell}>
                    ₹{bill.balanceAmount}
                  </td>

                  <td style={tableCell}>

                    <a
                      href={`https://friends-auto-backend-1utc.onrender.com/${bill.id}/invoice`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download PDF
                    </a>

                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default BillPage;