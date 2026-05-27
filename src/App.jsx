import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./components/Dashboard";
import CustomerPage from "./components/CustomerPage";
import ProductPage from "./components/ProductPage";
import BillPage from "./components/BillPage";
import PurchaseHistory from "./components/PurchaseHistory";
import CustomerDetails from "./components/CustomerDetails";
import BrandDiscountPage from "./components/BrandDiscountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="customers"
            element={<CustomerPage />}
          />

          <Route
            path="products"
            element={<ProductPage />}
          />

          <Route
            path="billing"
            element={<BillPage />}
          />

          <Route
            path="history"
            element={<PurchaseHistory />}
          />

          <Route
            path="customer-details"
            element={<CustomerDetails />}
          />
          <Route
  path="brand-discounts"
  element={<BrandDiscountPage />}
/>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;