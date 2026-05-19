import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {

  return (

    <div style={{
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f4f7fb"
    }}>

      {/* SIDEBAR */}

      <div style={{
        width: "280px",
        flexShrink: 0
      }}>
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}>

        <Header />

        <div style={{
          flex: 1,
          padding: "30px"
        }}>

          <Outlet />

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Layout;