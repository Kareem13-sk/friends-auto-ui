export default function ProductTable({ items = [] }) {
  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "20px",
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
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Qty</th>
            <th style={thStyle}>%</th>
            <th style={thStyle}>Actual Price</th>
            <th style={thStyle}>Final Price</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Products Found
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{index + 1}</td>

                <td style={tdStyle}>
                  {item.product || item.productName || "-"}
                </td>

                <td style={tdStyle}>
                  {item.qty || item.quantity || 0}
                </td>

                <td style={tdStyle}>
                  {item.percentage || 0}%
                </td>

                <td style={tdStyle}>
                  ₹{Number(item.actualPrice || 0).toFixed(2)}
                </td>

                <td style={tdStyle}>
                  ₹{Number(item.price || 0).toFixed(2)}
                </td>

                <td style={tdStyle}>
                  ₹{Number(item.total || 0).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
};