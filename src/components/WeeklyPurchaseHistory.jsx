import { useEffect, useMemo, useState } from "react";
import DashboardCards from "./DashboardCards";
import CustomerFolder from "./CustomerFolder";

function WeeklyPurchaseHistory() {

  const [weeklyBills, setWeeklyBills] = useState([]);

  const [search, setSearch] = useState("");

  const [expandedCustomer, setExpandedCustomer] =
    useState(null);

  // ============================
  // LOAD WEEKLY BILLS
  // ============================

  useEffect(() => {

    fetchWeeklyBills();

  }, []);

  const fetchWeeklyBills = async () => {

    try {

      const response = await fetch(
        "https://friends-auto-backend-1utc.onrender.com/weekly-bills"
      );

      const data = await response.json();

      setWeeklyBills(data);

    }

    catch (error) {

      console.log(
        "Unable to load weekly bills",
        error
      );

    }

  };

  // ============================
  // DELETE WEEKLY BILL
  // ============================

  const deleteBill = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Weekly Bill?"
      );

    if (!confirmDelete) return;

    try {

      await fetch(

        `https://friends-auto-backend-1utc.onrender.com/weekly-bills/${id}`,

        {

          method: "DELETE"

        }

      );

      setWeeklyBills(prev =>
        prev.filter(
          bill => bill.id !== id
        )
      );

    }

    catch (error) {

      console.log(error);

      alert("Unable to delete.");

    }

  };

  // ============================
  // SEARCH
  // ============================

  const filteredBills = useMemo(() => {

    if (!search) return weeklyBills;

    return weeklyBills.filter(

      bill =>

        bill.customerName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  }, [

    weeklyBills,

    search

  ]);

  // ============================
  // GROUP CUSTOMER
  // ============================

  const groupedCustomers = useMemo(() => {

    const map = {};

    filteredBills.forEach(bill => {

      if (!map[bill.customerName]) {

        map[bill.customerName] = [];

      }

      map[bill.customerName].push(bill);

    });

    return map;

  }, [

    filteredBills

  ]);

  return (

    <div
      style={{
        background:"#eef3f9",
        minHeight:"100vh",
        padding:"20px"
      }}
    >

      <h1
        style={{
          textAlign:"center",
          color:"#0d47a1",
          fontSize:"55px",
          marginBottom:"30px"
        }}
      >

        Weekly Purchase History

      </h1>

      <DashboardCards
        bills={weeklyBills}
      />

      <div
        style={{
          background:"white",
          padding:"20px",
          borderRadius:"20px",
          marginBottom:"25px"
        }}
      >

        <input

          type="text"

          placeholder="Search Weekly Customer..."

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

          style={{

            width:"100%",

            padding:"15px",

            fontSize:"18px",

            borderRadius:"10px",

            border:"1px solid #ccc"

          }}

        />

      </div>
            {/* CUSTOMER FOLDERS */}

      {Object.keys(groupedCustomers).length === 0 ? (

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            color: "#777",
            fontSize: "20px"
          }}
        >
          No Weekly Bills Found
        </div>

      ) : (

        Object.keys(groupedCustomers).map(

          (customerName, customerIndex) => (

            <div
              key={customerIndex}
              style={{
                marginBottom: "20px"
              }}
            >

              <CustomerFolder
                customerName={customerName}
                isOpen={
                  expandedCustomer ===
                  customerName
                }
                onClick={() =>
                  setExpandedCustomer(

                    expandedCustomer ===
                    customerName

                      ? null

                      : customerName

                  )
                }
              />

              {expandedCustomer ===
                customerName && (

                <div
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    marginTop: "10px",
                    padding: "20px"
                  }}
                >

                  {groupedCustomers[
                    customerName
                  ].map((bill) => (

                    <div
                      key={bill.id}
                      style={{
                        border:
                          "1px solid #ddd",
                        borderRadius: "15px",
                        padding: "20px",
                        marginBottom: "20px"
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "15px"
                        }}
                      >

                        <div>

                          <h2
                            style={{
                              color:
                                "#0d47a1",
                              marginBottom:
                                "10px"
                            }}
                          >
                            Weekly Bill
                            #{bill.id}
                          </h2>

                          <p>

                            <b>Date :</b>{" "}

                            {bill.billDate}

                          </p>

                          <p>

                            <b>
                              Products Total :
                            </b>{" "}

                            ₹
                            {Number(
                              bill.totalAmount
                            ).toFixed(2)}

                          </p>

                          <p>

                            <b>
                              Previous Balance :
                            </b>{" "}

                            ₹
                            {Number(
                              bill.previousBalance
                            ).toFixed(2)}

                          </p>

                          <p>

                            <b>
                              Paid :
                            </b>{" "}

                            ₹
                            {Number(
                              bill.paidAmount
                            ).toFixed(2)}

                          </p>

                          <p>

                            <b>
                              Balance :
                            </b>{" "}

                            ₹
                            {Number(
                              bill.balanceAmount
                            ).toFixed(2)}

                          </p>

                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection:
                              "column",
                            gap: "10px"
                          }}
                        >
                                                      <button
                            onClick={() => {

                              alert(
                                "Weekly Invoice will be added in the next step."
                              );

                            }}
                            style={{
                              background: "#1565c0",
                              color: "white",
                              border: "none",
                              padding: "10px 15px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "bold"
                            }}
                          >
                            Download Invoice
                          </button>

                          <button
                            onClick={() =>
                              deleteBill(bill.id)
                            }
                            style={{
                              background: "red",
                              color: "white",
                              border: "none",
                              padding: "10px 15px",
                              borderRadius: "8px",
                              cursor: "pointer",
                              fontWeight: "bold"
                            }}
                          >
                            Delete Bill
                          </button>

                        </div>

                      </div>

                      {/* PRODUCTS */}

                      <div
                        style={{
                          marginTop: "25px",
                          overflowX: "auto"
                        }}
                      >

                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse"
                          }}
                        >

                          <thead>

                            <tr
                              style={{
                                background: "#0d47a1",
                                color: "white"
                              }}
                            >
                              <th style={thStyle}>
                                S.No
                              </th>

                              <th style={thStyle}>
                                Product
                              </th>

                              <th style={thStyle}>
                                Qty
                              </th>

                              <th style={thStyle}>
                                %
                              </th>

                              <th style={thStyle}>
                                Actual
                              </th>

                              <th style={thStyle}>
                                Final
                              </th>

                              <th style={thStyle}>
                                Total
                              </th>

                            </tr>

                          </thead>

                          <tbody>

                            {bill.items &&
                            bill.items.length > 0 ? (

                              bill.items.map(
                                (
                                  item,
                                  index
                                ) => (

                                  <tr
                                    key={index}
                                  >

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      {index + 1}
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      {
                                        item.productName
                                      }
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      {
                                        item.quantity
                                      }
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      {
                                        item.percentage
                                      }
                                      %
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      ₹
                                      {Number(
                                        item.actualPrice
                                      ).toFixed(
                                        2
                                      )}
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      ₹
                                      {Number(
                                        item.finalPrice
                                      ).toFixed(
                                        2
                                      )}
                                    </td>

                                    <td
                                      style={
                                        tdStyle
                                      }
                                    >
                                      ₹
                                      {Number(
                                        item.total
                                      ).toFixed(
                                        2
                                      )}
                                    </td>

                                  </tr>

                                )
                              )

                            ) : (

                              <tr>

                                <td
                                  colSpan="7"
                                  style={{
                                    textAlign:
                                      "center",
                                    padding:
                                      "20px"
                                  }}
                                >
                                  No Products
                                </td>

                              </tr>

                            )}

                          </tbody>

                        </table>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          )

        )

      )}
          </div>

  );

}

const thStyle = {

  padding: "15px",

  border: "1px solid #ddd",

  fontSize: "17px",

  fontWeight: "bold",

  textAlign: "center"

};

const tdStyle = {

  padding: "12px",

  border: "1px solid #ddd",

  textAlign: "center",

  fontSize: "16px"

};

export default WeeklyPurchaseHistory;