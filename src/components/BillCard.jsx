import { useState } from "react";
import ProductTable from "./ProductTable";

export default function BillCard({
  bill,
  onEdit,
  onDelete,
  onDownload,
}) {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h3
  style={{
    color: "#0d47a1",
    marginBottom: "5px",
  }}
>
  Invoice : INV-{bill.id}
</h3>

<p
  style={{
    color: "#666",
    marginBottom: "12px",
    fontWeight: "bold",
  }}
>
  Date : {bill.billDate || "N/A"}
</p>

<p>
  <strong>Customer :</strong> {bill.customerName}
</p>

          <p>
            <strong>Total :</strong> ₹
            {Number(bill.totalAmount || 0).toFixed(2)}
          </p>

          <p>
            <strong>Paid :</strong> ₹
            {Number(bill.paidAmount || 0).toFixed(2)}
          </p>

          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Balance : ₹
            {Number(bill.balanceAmount || 0).toFixed(2)}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            style={blueBtn}
            onClick={() =>
              setShowProducts(!showProducts)
            }
          >
            {showProducts ? "Hide Products" : "View Products"}
          </button>

         <button
  style={blueBtn}
  onClick={() => {
    alert("Edit button clicked");
    console.log("Edit button clicked");
    console.log(onEdit);
    console.log(bill);

    if (onEdit) {
      onEdit(bill);
    }
  }}
>
  Edit Products
</button>

          <button
            style={redBtn}
            onClick={() => onDelete(bill.id)}
          >
            Delete
          </button>

          <button
            style={greenBtn}
            onClick={() => onDownload(bill)}
          >
            Download Bill
          </button>
        </div>
      </div>

      {showProducts && (
        <ProductTable items={bill.items || []} />
      )}
    </div>
  );
}

const blueBtn = {
  background: "#1565c0",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const redBtn = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const greenBtn = {
  background: "#2e7d32",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};