function Header() {

  return (

    <div style={{
      backgroundColor: "white",
      padding: "20px",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    }}>

      <h1 style={{
        margin: 0,
        color: "#0d47a1",
        fontSize: "42px",
        fontWeight: "bold"
      }}>
        Friends Auto Mobile
      </h1>

    </div>
  );
  <div style={{
  padding: "10px",
  backgroundColor: "#0d47a1"
}}>

  <button
    onClick={() =>
      setMobileMenu(!mobileMenu)
    }
    style={{
      backgroundColor: "white",
      color: "#0d47a1",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    ☰ Menu
  </button>

</div>
}

export default Header;