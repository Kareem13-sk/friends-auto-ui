import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ProductPage from "./components/ProductPage";
import BillPage from "./components/BillPage";
import PurchaseHistory from "./components/PurchaseHistory";
import CustomerDetails from "./components/CustomerDetails";
import CustomerPage from "./components/CustomerPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

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
            path="customers"
            element={<CustomerPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;