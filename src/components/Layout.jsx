import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        background: "#eef3f9",
        minHeight: "100vh"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowX: "hidden"
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;