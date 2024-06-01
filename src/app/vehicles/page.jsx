"use client";
import { compareAsc, format } from "date-fns";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useReactToPrint } from "react-to-print";
import * as XLSX from "xlsx";

const Home = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const printRef = useRef();
  const [printContent, setPrintContent] = useState(null);
  const [triggerPrint, setTriggerPrint] = useState(false);

  const handlePrintRef = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  function handleFilter1(event) {
    const filterValue = event.target.value;
    if (filterValue.length > 0) {
      const newData = data.filter((row) => {
        return row.LR_number && String(row.LR_number).includes(filterValue);
      });
      setData(newData);
    } else {
      setData(data2);
    }
  }

  const handleDownload = () => {
    const rows = data.map((product) => ({
      LR_Number: product.LR_number,
      LR_date: format(new Date(product.LR_date), "yyyy-MM-dd"),
      Party_name: product.Party_name,
      Address: product.Address,
      State: product.State,
      District: product.District,
      City: product.City,
      Pincode: product.Pincode,
      GST_number: product.GST_number,
      Material: product.Material,
      Quantity: product.Quantity,
      Truck_number: product.Truck_number,
      Source_location: product.Source_location,
      Destination_location: product.Destination_location,
      Dep_time: format(new Date(product.Dep_time), "HH:mm"),
      Arr_time: format(new Date(product.Arr_time), "HH:mm"),
      Driver_number: product.Driver_number,
      Cash: product.Cash,
      RTGS: product.RTGS,
      Disel: product.Disel,
      Lorry_Freight: product.Lorry_Freight,
      Loading_charges: product.Loading_charges,
      Driver_allowance: product.Driver_allowance,
      Contonment: product.Contonment,
      Other_charges: product.Other_charges,
      Total: product.Total,
      Advance_paid: product.Advance_paid,
      Balance: product.Balance,
      Ruppes_in_words: product.Ruppes_in_words,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "data");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        "LR Number",
        "LR_date",
        "Party Name",
        "Address",
        "State",
        "District",
        "City",
        "Pincode",
        "GST_number",
        "Material",
        "Quantity",
        "Truck_number",
        "Source_location",
        "Destination_location",
        "Dep_time",
        "Arr_time",
        "Driver_number",
        "Cash",
        "RTGS",
        "Disel",
        "Lorry_Freight",
        "Loading_charges",
        "Driver_allowance",
        "Contonment",
        "Other_charges",
        "Total",
        "Advance_paid",
        "Balance",
        "Ruppes_in_words",
      ],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  const handleDownloadSelected = () => {
    const rows = selectedRows.map((product) => ({
      LR_Number: product.LR_number,
      LR_date: product.LR_date,
      Party_name: product.Party_name,
      Address: product.Address,
      State: product.State,
      District: product.District,
      City: product.City,
      Pincode: product.Pincode,
      GST_number: product.GST_number,
      Material: product.Material,
      Quantity: product.Quantity,
      Truck_number: product.Truck_number,
      Source_location: product.Source_location,
      Destination_location: product.Destination_location,
      Dep_time: product.Dep_time,
      Arr_time: product.Arr_time,
      Driver_number: product.Driver_number,
      Cash: product.Cash,
      RTGS: product.RTGS,
      Disel: product.Disel,
      Lorry_Freight: product.Lorry_Freight,
      Loading_charges: product.Loading_charges,
      Driver_allowance: product.Driver_allowance,
      Contonment: product.Contonment,
      Other_charges: product.Other_charges,
      Total: product.Total,
      Advance_paid: product.Advance_paid,
      Balance: product.Balance,
      Ruppes_in_words: product.Ruppes_in_words,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "data");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        "LR Number",
        "Party Name",
        "Cash",
        "LR_date",
        "Address",
        "State",
        "District",
        "City",
        "Pincode",
        "GST_number",
        "Material",
        "Quantity",
        "Truck_number",
        "Source_location",
        "Destination_location",
        "Dep_time",
        "Arr_time",
        "Driver_number",
        "RTGS",
        "Disel",
        "Lorry_Freight",
        "Loading_charges",
        "Driver_allowance",
        "Contonment",
        "Other_charges",
        "Total",
        "Advance_paid",
        "Balance",
        "Ruppes_in_words",
      ],
    ]);

    XLSX.writeFile(workbook, "SelectedRecords.xlsx", { compression: true });
    setSelectedRows([]);
  };

  const handlePrint = (row) => {
    setPrintContent(
      <div>
        <div>
          <div className="Main-Container">
            <div className="Page-Size">
              <div className="header-Container">
                <h3 className="Heading-Name">BALAJI TRANSPORT AGENCY</h3>
                <h5 className="Head-Add">
                  No. 6-3-663/15/A, Jaffar Ali Bagh, Somajiguda, Hyderbad - 500
                  482.
                </h5>
              </div>
              <div className="No-Date-Container">
                <h2 className="Letter-Heading">FREIGHT LETTER</h2>
                <h3 className="No-Name">
                  No.{" "}
                  <span className="Page-No" style={{ border: "none" }}>
                    {row.LR_number}
                  </span>
                </h3>
                <div className="Date-Box">
                  <h3 className="Date-Name">
                    Date:{" "}
                    <span className="Date-Here">
                      {format(new Date(row.LR_date), "yyyy-MM-dd")}
                    </span>
                  </h3>
                </div>
              </div>
              <p className="To">To,</p>

              <div className="Second-Container">
                <h2 className="MS">M/S. </h2>
                <div className="Details-Box">
                  <h1 className="LTD-Name">
                    <span className="Info Info-Bold-Name Ltd-Name-Line-Height Ltd-First-Bold">
                      {row.Party_name}
                    </span>
                  </h1>
                  <h1 className="LTD-Name">
                    <span className="Info Ltd-Name-Line-Height">MALKAPUR</span>
                  </h1>
                  <h1 className="LTD-Name">
                    <span className="Info Ltd-Name-Line-Height">
                      Tandur (M), Ranga Reddy Dist, T.S. 500157
                    </span>
                  </h1>
                  <h1 className="LTD-Name">
                    <span className="Info Ltd-Name-Line-Height">
                      GSTIN:{row.GST_number}{" "}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="Mid-Container">
                <p className="Dear-Sir">Dear Sir,</p>
                <h2 className="info-Heading">
                  We are despatching <span className="des-Name">28.760</span>
                  M.T. of Coal/Gypsum through <br />
                </h2>
                <h2 className="info-From">
                  Lorry <span className="Lorry-No">{row.Truck_number}</span>
                </h2>
                <h2 className="info-From">
                  From:{" "}
                  <span className="from-Name Form-Name-To-Bold">
                    {row.Source_location}{" "}
                  </span>
                  To{" "}
                  <span className="To-Name Form-Name-To-Bold">
                    {row.Destination_location}
                  </span>
                </h2>
                <h2 className="info-From">
                  Kindly ----- unload and pay the Freight Charges as following
                </h2>
              </div>
              <div className="Total-Count-Container">
                <div className="Total-Contaoner-one Total-Info">
                  <h2
                    className="Dept-Time Dep-Time "
                    style={{ marginTop: "3%" }}
                  >
                    <span className="Mid-Align">Dep. Time: </span>
                    <span className="DepTime UnderLine-Info">
                      {format(row.Dep_time, "HH:mm")}
                    </span>
                  </h2>
                  <h2 className="Dept-Time">
                    <span className="Mid-Align">Arr. Time: </span>
                    <span className="ArrTime UnderLine-Info">
                      {format(row.Arr_time, "HH:mm")}
                    </span>
                  </h2>
                  <span className="Approx">(Approx)</span>
                  <h2 className="Dept-Time">
                    <span className="Mid-Align">Driver's No: </span>
                    <span className="DriverNo UnderLine-Info">
                      {row.Driver_number}
                    </span>
                  </h2>
                  <h2 className="Dept-Time">
                    <span className="Mid-Align">Cash:</span>{" "}
                    <span className="Cash UnderLine-Info">{row.Cash}</span>
                  </h2>
                  <h2 className="Dept-Time">
                    <span className="Mid-Align">RTGS:</span>{" "}
                    <span className="Rtgs UnderLine-Info">{row.RTGS}</span>
                  </h2>
                  <h2 className="Dept-Time">
                    <span className="Mid-Align">Diesel:</span>{" "}
                    <span className="Diesel UnderLine-Info">{row.Disel}</span>
                  </h2>
                  {/* <h2 className="Dept-Time Total-Amount Total-Amount-Left-Side">Total: <span className="Total-Amount-LeftSide"></span></h2> */}
                </div>
                <div className="Total-Contaoner-two Total-Info">
                  <h2
                    className="Dept-Time Dep-Time Right-Amout-Box"
                    style={{ marginTop: "3%" }}
                  >
                    <span className="Mid-Align">Lorry Freight: </span>
                    <span className="Lorry-Freight UnderLine-Info">
                      {row.Lorry_Freight}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Dep-Time Right-Amout-Box">
                    <span className="Mid-Align">Loading Charges: </span>
                    <span className="Loading-Charges UnderLine-Info">
                      {row.Loading_charges}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Dep-Time Right-Amout-Box">
                    <span className="Mid-Align">Driver Allowance: </span>
                    <span className="Driver-Allowance UnderLine-Info">
                      {row.Driver_allowance}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Dep-Time Right-Amout-Box">
                    <span className="Mid-Align">Contonment: </span>
                    <span className="Contonment UnderLine-Info">
                      {row.Contonment}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Dep-Time Right-Amout-Box">
                    <span className="Mid-Align">Other Charges: </span>
                    <span className="Other-Charges UnderLine-Info">
                      {row.Other_charges}{" "}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Total-Amount Total-Amount-Right-Side">
                    <span className="Mid-Align Total-Align-Margin">
                      Total:{" "}
                    </span>
                    <span className="Total-Amount-RightSide UnderLine-Info Amout-Total-Bold">
                      {row.Total}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Total-Amount Advance-Paid-Right-Side">
                    <span className="Mid-Align Total-Align-Margin ">
                      Advance Paid:{" "}
                    </span>
                    <span className="Advance-Paid UnderLine-Info Amout-Total-Bold">
                      0{row.Advance_paid}
                    </span>
                  </h2>
                  <h2 className="Dept-Time Total-Amount Balance-Right-Side">
                    <span className="Mid-Align Total-Align-Margin">
                      Balance:
                    </span>{" "}
                    <span className="Balance UnderLine-Info Amout-Total-Bold">
                      {row.Balance}
                    </span>
                  </h2>
                </div>
              </div>
              <div className="Rupees-Words-Container">
                <h2 className="Rupees-in-Words">
                  Rupees in words:{" "}
                  <span className="Rupees-In-Words">
                    One thousand seven hundered eighty five
                  </span>
                </h2>
                <h4 className="Digital-Sign-Line">BALAJI TRANSPORT AGENCY</h4>
                <div className="Digital-Sign-Box"></div>
                <h2 className="Condition">Conditions:</h2>
                <p className="First-Consition">
                  1. Wastage of 100 Kgs, to be allowed over and above deduct
                  from Freight Charges.
                </p>
                <p className="First-Consition">2. Unloading at Your Cost.</p>
                <h2 className="End-Line">Tandur Office : 95026 50320</h2>
              </div>
            </div>
          </div>
        </div>
        {/* <table>
          <thead>
            <tr>
              <th>LR Number</th>
              <th>LR Date</th>
              <th>Party Name</th>
              <th>Address</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Source Location</th>
              <th>Destination Location</th>
              <th>Dep Time</th>
              <th>Arr Time</th>
              <th>Cash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{row.LR_number}</td>
              <td>{row.LR_date}</td>
              <td>{row.Party_name}</td>
              <td>{row.Address}</td>
              <td>{row.Material}</td>
              <td>{row.Quantity}</td>
              <td>{row.Source_location}</td>
              <td>{row.Destination_location}</td>
              <td>{row.Dep_time}</td>
              <td>{row.Arr_time}</td>
              <td>{row.Cash}</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    );
    setTriggerPrint(true); // Trigger print after updating content
  };

  useEffect(() => {
    if (triggerPrint) {
      handlePrintRef();
      setTriggerPrint(false); // Reset the trigger
    }
  }, [triggerPrint, handlePrintRef]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-letters")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: "LR Number",
      selector: (row) => row.LR_number,
      sortable: true,
    },
    {
      name: "Party Name",
      selector: (row) => row.Party_name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.Address,
      sortable: true,
    },
    {
      name: "Material",
      selector: (row) => row.Material,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.Quantity,
      sortable: true,
    },
    {
      name: "Source location",
      selector: (row) => row.Source_location,
      sortable: true,
    },
    {
      name: "Destination location",
      selector: (row) => row.Destination_location,
      sortable: true,
    },
    {
      name: "Dep time",
      selector: (row) => format(new Date(row.Dep_time), "HH:mm"),
      sortable: true,
    },
    {
      name: "Arr time",
      selector: (row) => format(new Date(row.Arr_time), "HH:mm"),
      sortable: true,
    },
    {
      name: "Cash",
      selector: (row) => row.Cash,
      sortable: true,
      maxWidth: "10px",
    },
    {
      cell: (row) => (
        <button
          className="printButton"
          onClick={() => {
            handlePrint(row);
          }}
        >
          Print
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#4CAF50",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Vehicle Records
      </h2>

      <div className="list_header">
        <input
          className="customInput"
          placeholder="Search by LR number"
          type="text"
          onChange={handleFilter1}
        />
        <div>
          <button className="customButton" onClick={handleDownload}>
            DOWNLOAD EXCEL
          </button>
          <button
          className={`customButton ${selectedRows.length === 0 ? "disabledButton" : ""}`}
          onClick={handleDownloadSelected}
            disabled={selectedRows.length === 0} // Disable if no rows are selected
          >
            DOWNLOAD SELECTED EXCEL
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        fixedHeader
        pagination
        onSelectedRowsChange={({ selectedRows }) =>
          setSelectedRows(selectedRows)
        }
      />
      <div style={{ display: "none" }}>
        <div ref={printRef}>{printContent}</div>
      </div>
    </div>
  );
};

export default Home;
