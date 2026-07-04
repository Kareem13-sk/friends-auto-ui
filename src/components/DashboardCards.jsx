export default function DashboardCards({ bills = [] }) {
  const totalCustomers = new Set(
    bills.map((bill) => bill.customerName)
  ).size;

  const totalBills = bills.length;

  const totalSales = bills.reduce(
    (sum, bill) => sum + Number(bill.totalAmount || 0),
    0
  );

  const totalBalance = bills.reduce(
    (sum, bill) => sum + Number(bill.balanceAmount || 0),
    0
  );

  const cardStyle = {
    flex: "1",
    minWidth: "220px",
    background: "#0d47a1",
    color: "white",
    borderRadius: "15px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.2)",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h2>Customers</h2>
        <h1>{totalCustomers}</h1>
      </div>

      <div style={cardStyle}>
        <h2>Bills</h2>
        <h1>{totalBills}</h1>
      </div>

      <div style={cardStyle}>
        <h2>Total Sales</h2>
        <h1>₹{totalSales.toFixed(2)}</h1>
      </div>

      <div style={cardStyle}>
        <h2>Balance</h2>
        <h1>₹{totalBalance.toFixed(2)}</h1>
      </div>
    </div>
  );
}