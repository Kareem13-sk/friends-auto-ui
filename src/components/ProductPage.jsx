import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

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
      await axios.get("https://friends-auto-backend-1utc.onrender.com");

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
        `https://friends-auto-backend-1utc.onrender.com/${editingId}`,
        formData
      );

    } else {

      await axios.post(
        "https://friends-auto-backend-1utc.onrender.com",
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
      `https://friends-auto-backend-1utc.onrender.com/${id}`
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
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "30px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)"
    }}>

      <h2 style={{ color: "black" }}>
        Product Management
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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
        gap: "10px",
        marginTop: "20px"
      }}>

        <button
          onClick={saveProduct}
          style={buttonStyle}
        >
          {editingId ? "Update Product" : "Add Product"}
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

      <div style={{
        overflowX: "auto",
        marginTop: "30px"
      }}>

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

              <th style={tableHeader}>Product</th>
              <th style={tableHeader}>Category</th>
              <th style={tableHeader}>Price</th>
              <th style={tableHeader}>Stock</th>
              <th style={tableHeader}>Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

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

                  <button
                    onClick={() => editProduct(product)}
                    style={{
                      ...actionButton,
                      backgroundColor: "#0d47a1"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      ...actionButton,
                      backgroundColor: "red"
                    }}
                  >
                    Delete
                  </button>

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

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const actionButton = {
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "6px",
  cursor: "pointer"
};

const tableHeader = {
  padding: "14px",
  textAlign: "left"
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default ProductPage;