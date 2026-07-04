import { useEffect, useState } from "react";

export default function WeeklyBilling() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {

    fetch("https://friends-auto-backend-1utc.onrender.com/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));

    fetch("https://friends-auto-backend-1utc.onrender.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }, []);

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1
        style={{
          color: "#1565c0"
        }}
      >
        Weekly Billing
      </h1>

      <br />

      <label>

        Customer

      </label>

      <br />

      <select
        value={selectedCustomer}
        onChange={(e)=>
          setSelectedCustomer(
            e.target.value
          )
        }
      >

        <option value="">
          Select Customer
        </option>

        {customers.map(customer=>(

          <option
            key={customer.id}
            value={customer.customerName}
          >
            {customer.customerName}
          </option>

        ))}

      </select>

      <br /><br />

      <label>

        Product

      </label>

      <br />

      <select
        value={selectedProduct}
        onChange={(e)=>
          setSelectedProduct(
            e.target.value
          )
        }
      >

        <option value="">
          Select Product
        </option>

        {products.map(product=>(

          <option
            key={product.id}
            value={product.productName}
          >
            {product.productName}
          </option>

        ))}

      </select>

      <br /><br />

      <button>

        Add Product

      </button>

    </div>

  );

}