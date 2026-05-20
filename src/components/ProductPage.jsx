import { useEffect, useState } from "react";
import axios from "axios";

function ProductPage() {

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [defaultPercentage,
    setDefaultPercentage] = useState("");

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "https://friends-auto-backend-1utc.onrender.com/products"
      );

      setProducts(response.data);

      setFilteredProducts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const saveProduct = async () => {

    try {

      const productData = {

        productName: name,

        category,

        price: Number(price),

        stock: Number(stock),

        defaultPercentage:
          Number(defaultPercentage)
      };

      if (editingId) {

        await axios.put(
          `https://friends-auto-backend-1utc.onrender.com/products/${editingId}`,
          productData
        );

        alert(
          "Product Updated Successfully"
        );

      } else {

        await axios.post(
          "https://friends-auto-backend-1utc.onrender.com/products",
          productData
        );

        alert(
          "Product Added Successfully"
        );
      }

      clearForm();

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert(
        "Failed To Save Product"
      );
    }
  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `https://friends-auto-backend-1utc.onrender.com/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);
    }
  };

  const editProduct = (product) => {

    setEditingId(product.id);

    setName(product.productName);

    setCategory(product.category);

    setPrice(product.price);

    setStock(product.stock);

    setDefaultPercentage(
      product.defaultPercentage || 0
    );
  };

  const searchProduct = (value) => {

    setSearch(value);

    const filtered =
      products.filter((product) =>
        product.productName
          ?.toLowerCase()
          .includes(
            value.toLowerCase()
          )
      );

    setFilteredProducts(filtered);
  };

  const clearForm = () => {

    setName("");

    setCategory("");

    setPrice("");

    setStock("");

    setDefaultPercentage("");

    setEditingId(null);
  };

  return (

    <div style={containerStyle}>

      <h1 style={titleStyle}>
        Product Management
      </h1>

      <div style={formGrid}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Default Percentage"
          value={defaultPercentage}
          onChange={(e) =>
            setDefaultPercentage(
              e.target.value
            )
          }
          style={inputStyle}
        />

      </div>

      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap"
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
          onClick={clearForm}
          style={clearButton}
        >
          Clear
        </button>

      </div>

      <input
        type="text"
        placeholder="Search Product"
        value={search}
        onChange={(e) =>
          searchProduct(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <div style={{
        overflowX: "auto"
      }}>

        <table style={tableStyle}>

          <thead>

            <tr style={tableHeaderRow}>

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
                %
              </th>

              <th style={tableHeader}>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map(
              (product) => (

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
                    {
                      product.defaultPercentage
                    }%
                  </td>

                  <td style={tableCell}>

                    <button
                      onClick={() =>
                        editProduct(product)
                      }
                      style={editButton}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }
                      style={deleteButton}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* STYLES */

const containerStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "18px",
  boxShadow:
    "0px 4px 15px rgba(0,0,0,0.1)"
};

const titleStyle = {
  color: "#0d47a1",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "50px"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "15px",
  marginBottom: "20px"
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box"
};

const buttonStyle = {
  backgroundColor: "#0d47a1",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const clearButton = {
  backgroundColor: "gray",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer"
};

const editButton = {
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px"
};

const deleteButton = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px"
};

const tableHeaderRow = {
  backgroundColor: "#0d47a1",
  color: "white"
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