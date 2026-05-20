import { useEffect, useState } from "react";
import axios from "axios";

import pistonImg from "../assets/piston.jpg";

function ProductPage() {

  const [products, setProducts] =
    useState([]);

  const [productName,
    setProductName] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [stock,
    setStock] =
    useState("");

  const [defaultPercentage,
    setDefaultPercentage] =
    useState("");

  const [search,
    setSearch] =
    useState("");

  const [editId,
    setEditId] =
    useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(
          "https://friends-auto-backend-1utc.onrender.com/products"
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const saveProduct = async () => {

    const productData = {

      productName,
      category,
      price,
      stock,
      defaultPercentage

    };

    try {

      if (editId) {

        await axios.put(
          `https://friends-auto-backend-1utc.onrender.com/products/${editId}`,
          productData
        );

        alert("Product Updated");

      } else {

        await axios.post(
          "https://friends-auto-backend-1utc.onrender.com/products",
          productData
        );

        alert("Product Added");
      }

      clearFields();

      fetchProducts();

    } catch (error) {

      console.log(error);

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

    setEditId(product.id);

    setProductName(product.productName);

    setCategory(product.category);

    setPrice(product.price);

    setStock(product.stock);

    setDefaultPercentage(
      product.defaultPercentage
    );
  };

  const clearFields = () => {

    setEditId(null);

    setProductName("");

    setCategory("");

    setPrice("");

    setStock("");

    setDefaultPercentage("");
  };

  const filteredProducts =
    products.filter((product) =>
      product.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div
      style={{
        backgroundColor: "#eef3f9",
        minHeight: "100vh",
        padding: "20px",
        overflowX: "hidden",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "25px",
          boxSizing: "border-box",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.08)"
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#0d47a1",
            marginBottom: "30px",
            fontSize:
              "clamp(32px,5vw,55px)"
          }}
        >
          Product Management
        </h1>

        {/* FORM */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "25px"
          }}
        >

          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) =>
              setProductName(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
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

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "25px"
          }}
        >

          <button
            onClick={saveProduct}
            style={buttonStyle}
          >
            {editId
              ? "Update Product"
              : "Add Product"}
          </button>

          <button
            onClick={clearFields}
            style={clearButton}
          >
            Clear
          </button>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Product"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            ...inputStyle,
            marginBottom: "25px"
          }}
        />

        {/* TABLE */}

        <div
          style={{
            overflowX: "auto",
            width: "100%"
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "700px"
            }}
          >

            <thead>

              <tr
                style={{
                  backgroundColor:
                    "#0d47a1",
                  color: "white"
                }}
              >

                <th style={tableHeader}>
                  Image
                </th>

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

                      <img
                        src={pistonImg}
                        alt="Product"
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "12px",
                          objectFit: "cover"
                        }}
                      />

                    </td>

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

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap"
                        }}
                      >

                        <button
                          onClick={() =>
                            editProduct(
                              product
                            )
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

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* STYLES */

const inputStyle = {

  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box"

};

const buttonStyle = {

  backgroundColor: "#1565c0",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "600"

};

const clearButton = {

  backgroundColor: "gray",
  color: "white",
  border: "none",
  padding: "14px 24px",
  borderRadius: "12px",
  fontSize: "16px",
  cursor: "pointer"

};

const editButton = {

  backgroundColor: "#1565c0",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer"

};

const deleteButton = {

  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer"

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