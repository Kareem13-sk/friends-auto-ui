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
        minWidth: "280px",
        backgroundColor: "#0d47a1",
        minHeight: "100vh"
      }}>

        <Sidebar />

      </div>

      {/* MAIN CONTENT */}

      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>

        <Header />

        {/* PAGE CONTENT */}

        <div style={{
          flex: 1,
          padding: "20px"
        }}>

          <Outlet />

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Layout;