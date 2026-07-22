import { useMemo, useState } from "react";
import pistonImg from "../assets/piston.jpg";

export default function BrandFolder({
  brand,
  products,
  onEdit,
  onDelete,
}) {

  const [open, setOpen] = useState(false);

  const summary = useMemo(() => {

    return {

      totalProducts: products.length,

      totalStock: products.reduce(
        (sum, product) =>
          sum + Number(product.stock || 0),
        0
      ),

      totalValue: products.reduce(
        (sum, product) =>
          sum +
          Number(product.price || 0) *
          Number(product.stock || 0),
        0
      ),

    };

  }, [products]);

  return (

    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        marginBottom: "20px",
        overflow: "hidden",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)"
      }}
    >

      {/* Folder Header */}

      <div
        onClick={() => setOpen(!open)}
        style={{
          background: "#0d47a1",
          color: "white",
          padding: "20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <div>

          <h2 style={{ margin: 0 }}>
            📁 {brand}
          </h2>

          <div
            style={{
              marginTop: "8px",
              fontSize: "15px"
            }}
          >
            Products : {summary.totalProducts}
          </div>

        </div>

        <div
          style={{
            textAlign: "right"
          }}
        >

          <div>
            Stock : {summary.totalStock}
          </div>

          <div>
            Value : ₹{summary.totalValue.toFixed(2)}
          </div>

          <div
            style={{
              fontSize: "26px",
              marginTop: "8px"
            }}
          >
            {open ? "▲" : "▼"}
          </div>

        </div>

      </div>

      {/* Products */}

      {open && (

        <div
          style={{
            background: "#f8fbff",
            padding: "20px"
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
                  background: "#1565c0",
                  color: "white"
                }}
              >

                <th style={thStyle}>Image</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Stock</th>
                <th style={thStyle}>%</th>
                <th style={thStyle}>Action</th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product.id}>

                  <td style={tdStyle}>

                    <img
                      src={pistonImg}
                      alt=""
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                        objectFit: "cover"
                      }}
                    />

                  </td>

                  <td style={tdStyle}>
                    {product.productName}
                  </td>

                  <td style={tdStyle}>
                    {product.category}
                  </td>

                  <td style={tdStyle}>
                    ₹{product.price}
                  </td>

                  <td style={tdStyle}>
                    {product.stock}
                  </td>

                  <td style={tdStyle}>
                    {product.defaultPercentage}%
                  </td>

                  <td style={tdStyle}>

                    <button
                      onClick={() => onEdit(product)}
                      style={editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      style={deleteButton}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}

const thStyle = {
  padding: "15px",
  textAlign: "left"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #ddd"
};

const editButton = {
  background: "#1565c0",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer"
};

const deleteButton = {
  background: "red",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
  cursor: "pointer"
};