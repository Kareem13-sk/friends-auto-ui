import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const response =
      await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

    setProducts(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = async () => {

    if (editingId) {

      await axios.put(
        `https://friends-auto-backend-1utc.onrender.com/products/${editingId}`,
        formData
      );

    } else {

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com/products",
        formData
      );
    }

    fetchProducts();

    resetForm();
  };

  const editProduct = (product) => {

    setEditingId(product.id);

    setFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
  };

  const deleteProduct = async (id) => {

    await axios.delete(
      `https://friends-auto-backend-1utc.onrender.com/products/${id}`
    );

    fetchProducts();
  };

  const resetForm = () => {

    setEditingId(null);

    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: ""
    });
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
          Products
        </h1>

      </div>

      {/* FORM SECTION */}

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
          {editingId
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",

          gap: "15px"
        }}>

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>

        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}>

          <button
            onClick={saveProduct}
            style={buttonStyle}
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          <button
            onClick={resetForm}
            style={{
              ...buttonStyle,
              backgroundColor: "gray"
            }}
          >
            Clear
          </button>

        </div>

      </div>

      {/* PRODUCT LIST */}

      <div style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
      }}>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "20px"
        }}>

          <h2 style={{
            color: "#0d47a1",
            margin: 0
          }}>
            Product List
          </h2>

          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              ...inputStyle,
              maxWidth: "300px"
            }}
          />

        </div>

        <div style={{
          overflowX: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "800px"
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
                  Category
                </th>

                <th style={tableHeader}>
                  Price
                </th>

                <th style={tableHeader}>
                  Stock
                </th>

                <th style={tableHeader}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products
                .filter((product) =>
                  product.productName
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )
                )
                .map((product) => (

                  <tr key={product.id}>

                    <td style={tableCell}>
                      {product.productName}
                    </td>

                    <td style={tableCell}>
                      {product.category}
                    </td>

                    <td style={tableCell}>
                      ₹{product.price}
                    </td>

                    <td style={tableCell}>
                      {product.stock}
                    </td>

                    <td style={tableCell}>

                      <div style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                      }}>

                        <button
                          onClick={() =>
                            editProduct(product)
                          }
                          style={{
                            ...actionButton,
                            backgroundColor: "#0d47a1"
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(product.id)
                          }
                          style={{
                            ...actionButton,
                            backgroundColor: "red"
                          }}
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

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
  fontWeight: "600"
};

const actionButton = {
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px"
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

export default ProductPage;