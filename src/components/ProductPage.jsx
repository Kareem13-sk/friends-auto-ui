import { useEffect, useState } from "react";
import axios from "axios";

import BrandFolder from "../components/BrandFolder";

function ProductPage() {

  const [products, setProducts] =
    useState([]);

  const [productName,
    setProductName] =
    useState("");
  
  const [brand, setBrand] = useState("");

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
          "https://friends-auto-backend-sg.onrender.com/products"
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const saveProduct = async () => {

    const productData = {
  productName,
  brand: brand.trim(),
  category,
  price,
  stock,
  defaultPercentage
};

    try {

      if (editId) {

        await axios.put(
          `https://friends-auto-backend-sg.onrender.com/products/${editId}`,
          productData
        );

        alert("Product Updated");

      } else {

        await axios.post(
          "https://friends-auto-backend-sg.onrender.com/products",
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
        `https://friends-auto-backend-sg.onrender.com/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }
  };

  const editProduct = (product) => {

  setEditId(product.id);
  setProductName(product.productName);
  setBrand(product.brand);
  setCategory(product.category);
  setPrice(product.price);
  setStock(product.stock);
  setDefaultPercentage(product.defaultPercentage);

  setTimeout(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, 50);

};
  const clearFields = () => {

    setEditId(null);

    setProductName("");

    setBrand("");

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

    const groupedProducts = filteredProducts.reduce(
  (acc, product) => {

    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }

    acc[product.brand].push(product);

    return acc;

  },
  {}
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
          Products
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
  placeholder="Brand"
  value={brand}
  onChange={(e) =>
    setBrand(e.target.value)
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

          {Object.entries(groupedProducts).map(
  ([brand, products]) => (

    <BrandFolder
      key={brand}
      brand={brand}
      products={products}
      onEdit={editProduct}
      onDelete={deleteProduct}
    />

  )
)}

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