import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./components/Dashboard";
import CustomerPage from "./components/CustomerPage";
import ProductPage from "./components/ProductPage";
import BillPage from "./components/BillPage";
import PurchaseHistory from "./components/PurchaseHistory";
import CustomerDetails from "./components/CustomerDetails";
import LoginPage from "./components/LoginPage";

function PrivateRoute({ children }) {

  const isLoggedIn =
    localStorage.getItem("loggedIn");

  return isLoggedIn
    ? children
    : <Navigate to="/login" />;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="*"
          element={

            <PrivateRoute>

              <Layout>

                <Routes>

                  <Route
                    path="/"
                    element={<Dashboard />}
                  />

                  <Route
                    path="/customers"
                    element={<CustomerPage />}
                  />

                  <Route
                    path="/products"
                    element={<ProductPage />}
                  />

                  <Route
                    path="/billing"
                    element={<BillPage />}
                  />

                  <Route
                    path="/history"
                    element={<PurchaseHistory />}
                  />

                  <Route
                    path="/customer-details"
                    element={<CustomerDetails />}
                  />

                </Routes>

              </Layout>

            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;