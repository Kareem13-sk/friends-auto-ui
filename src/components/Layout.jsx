import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#eef3f9",
      }}
    >

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          marginLeft: "280px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >

        {/* HEADER */}

        <Header />

        {/* PAGE CONTENT */}

        <div
          style={{
            flex: 1,
            padding: "25px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <Outlet />
          </div>
        </div>

        {/* FOOTER */}

        <Footer />

      </div>

    </div>
  );
}

export default Layout;