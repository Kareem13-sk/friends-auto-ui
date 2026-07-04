import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./components/Dashboard";
import CustomerPage from "./components/CustomerPage";
import WeeklyCustomers from "./components/WeeklyCustomers";
import ProductPage from "./components/ProductPage";
import BillPage from "./components/BillPage";
import WeeklyBilling from "./components/WeeklyBilling";
import PurchaseHistory from "./components/PurchaseHistory";
import CustomerDetails from "./components/CustomerDetails";
import BrandDiscountPage from "./components/BrandDiscountPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* PROTECTED PAGES */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="customers"
            element={<CustomerPage />}
          />

          <Route
            path="weekly-customers"
            element={<WeeklyCustomers />}
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
            path="weekly-billing"
            element={<WeeklyBilling />}
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