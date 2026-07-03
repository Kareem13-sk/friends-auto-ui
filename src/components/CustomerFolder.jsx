import { useMemo, useState } from "react";
import BillCard from "./BillCard";

export default function CustomerFolder({
  customerName,
  bills,
  onEdit,
  onDelete,
  onDownload,
}) {
  const [open, setOpen] = useState(false);

  const summary = useMemo(() => {
    return bills.reduce(
      (acc, bill) => {
        acc.total += Number(bill.totalAmount || 0);
        acc.paid += Number(bill.paidAmount || 0);
        acc.balance += Number(bill.balanceAmount || 0);
        return acc;
      },
      {
        total: 0,
        paid: 0,
        balance: 0,
      }
    );
  }, [bills]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        marginBottom: "25px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)",
      }}
    >
      {/* Folder Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "#0d47a1",
          color: "#fff",
          padding: "20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0 }}>
            📁 {customerName}
          </h2>

          <div
            style={{
              marginTop: "8px",
              fontSize: "15px",
            }}
          >
            Bills : {bills.length}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
            fontSize: "15px",
          }}
        >
          <div>
            Total : ₹{summary.total.toFixed(2)}
          </div>

          <div>
            Paid : ₹{summary.paid.toFixed(2)}
          </div>

          <div>
            Balance : ₹{summary.balance.toFixed(2)}
          </div>

          <div
            style={{
              fontSize: "26px",
              marginTop: "8px",
            }}
          >
            {open ? "▲" : "▼"}
          </div>
        </div>
      </div>

      {/* Bills */}
      {open && (
        <div
          style={{
            padding: "20px",
            background: "#f8fbff",
          }}
        >
          {bills
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((bill) => (
              <BillCard
                key={bill.id}
                bill={bill}
                onEdit={onEdit}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))}
        </div>
      )}
    </div>
  );
}