"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./globals.css";
import { useReactToPrint } from "react-to-print";
import TextInput from "@/common/components/InputText";
import axios from "axios";
import { compareAsc, format } from "date-fns";
import converter from "number-to-words";
import DataTable from "react-data-table-component";
// import ExcelExport from "./ExcelExport";
import * as XLSX from "xlsx";

export default function Home() {
  const [details, setDetails] = useState({
    LR_date: "",
    Party_name: "",
    Address: "",
    State: "",
    District: "",
    City: "",
    Pincode: "",
    GST_number: "",
    Material: "",
    Quantity: "",
    Truck_number: "",
    Source_location: "",
    Destination_location: "",
    Dep_time: "",
    Arr_time: "",
    Driver_number: "",
    Cash: "",
    RTGS: "",
    Disel: "",
    Lorry_Freight: "",
    Loading_charges: "",
    Driver_allowance: "",
    Contonment: "",
    Other_charges: "",
    Total: "",
    Advance_paid: "",
    Balance: "",
    Ruppes_in_words: "",
  });

  const contentToPrint = useRef(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentTab, setCurrentTab] = useState(0); // State to keep track of the current tab index
  const totalTabs = 3; // Total number of tabs
  const handleNext = () => {
    if (currentTab < totalTabs - 1) {
      setCurrentTab((prevTab) => prevTab + 1);
    }
  };
  const handleBack = () => {
    if (currentTab > 0) {
      setCurrentTab((prevTab) => prevTab - 1);
    }
  };
  const handleSaveAndNext = () => {
    handleNext();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const convertedDetails = {
      ...details,
      Pincode: parseInt(details.Pincode) || 0,
      Quantity: parseInt(details.Quantity) || 0,
      Driver_number: parseInt(details.Driver_number) || 0,
      Cash: parseFloat(details.Cash) || 0,
      RTGS: parseFloat(details.RTGS) || 0,
      Disel: parseFloat(details.Disel) || 0,
      Lorry_Freight: parseFloat(details.Lorry_Freight) || 0,
      Loading_charges: parseFloat(details.Loading_charges) || 0,
      Driver_allowance: parseFloat(details.Driver_allowance) || 0,
      Contonment: parseFloat(details.Contonment) || 0,
      Other_charges: parseFloat(details.Other_charges) || 0,
      Total: parseFloat(details.Total) || 0,
      Advance_paid: parseFloat(details.Advance_paid) || 0,
      Balance: parseFloat(details.Balance) || 0,
    };

    console.log(convertedDetails);

    axios
      .post("http://localhost:3000/all-letters", convertedDetails)
      .then((res) => {
        console.log(res.status, "resss");
        console.log(details.Party_name);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

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
      selector: (row) => format(new Date(row.Dep_time), "yyyy-mm-dd"),
      sortable: true,
    },
    {
      name: "Arr time",
      selector: (row) => row.Arr_time,
      sortable: true,
    },
    {
      name: "Cash",
      selector: (row) => row.Cash,
      sortable: true,
    },
    {
      cell: (row) => <button onClick={() => handlePrint(row)}>Print</button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-letters")
      .then((response) => {
        setData(response.data);
        setData2(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // const [products, setProducts] = useState([]);

  //   useEffect(() => {
  //     fetch("https://fakestoreapi.com/products")
  //       .then((res) => res.json())
  //       .then((json) => setProducts(json));
  //   }, []);
  const handleDownload = () => {
    const rows = data.map((product) => ({
      LR_Number: product.LR_number,
      LR_date: formatproduct.LR_date,
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
  };

  return (
    <>
      <div className="main">
        {/* <ExcelExport data={data4} /> */}

        <div className="content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form_container">
              {currentTab === 0 && (
                <>
                  <TextInput
                    type="date"
                    label="LR date"
                    name="LR_date"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Party name"
                    name="Party_name"
                    required
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Address"
                    name="Address"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="State"
                    name="State"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="District"
                    name="District"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="City"
                    name="City"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Pincode"
                    name="Pincode"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    name="GST_number"
                    label="GST number"
                    onChange={handleInputChange}
                  />
                </>
              )}
              {currentTab === 1 && (
                <>
                  <TextInput
                    type="text"
                    label="Material"
                    name="Material"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Quantity"
                    name="Quantity"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Truck number"
                    name="Truck_number"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Source location"
                    name="Source_location"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Destination location"
                    name="Destination_location"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="datetime-local"
                    label="Arr time"
                    name="Arr_time"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="datetime-local"
                    label="Dep time"
                    name="Dep_time"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Driver number"
                    name="Driver_number"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Cash"
                    name="Cash"
                    onChange={handleInputChange}
                  />
                </>
              )}
              {currentTab === 2 && (
                <>
                  <TextInput
                    type="number"
                    label="RTGS"
                    name="RTGS"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Diesel"
                    name="Disel"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Lorry freight"
                    name="Lorry_Freight"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Loading charges"
                    name="Loading_charges"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Driver allowance"
                    name="Driver_allowance"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Contonment"
                    name="Contonment"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Other charges"
                    name="Other_charges"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Total"
                    name="Total"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Advance paid"
                    name="Advance_paid"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="number"
                    label="Balance"
                    name="Balance"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    type="text"
                    label="Rupees in words"
                    name="Ruppes_in_words"
                    onChange={handleInputChange}
                  />
                </>
              )}
              {/* Render more tabs as needed */}
            </div>
            {/* Render Next button for all tabs except the last one */}
            <div className="buttons">
              {currentTab > 0 && (
                <button className="button" type="button" onClick={handleBack}>
                  Back
                </button>
              )}
              {/* Render Next button for all tabs except the last one */}
              {currentTab < totalTabs - 1 && (
                <button className="button" type="button" onClick={handleNext}>
                  Next
                </button>
              )}
              {/* Render Save and Next button for the last tab */}
              {currentTab === totalTabs - 1 && (
                <button
                  className="button"
                  type="submit"
                  // onClick={handleSaveAndNext}
                >
                  Submit
                </button>
              )}
            </div>

            {/* <div className="form_container">
              <TextInput
                type="date"
                label="LR date"
                name="LR_date"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Party name"
                name="Party_name"
                required
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Address"
                name="Address"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="State"
                name="State"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="District"
                name="District"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="City"
                name="City"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Pincode"
                name="Pincode"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                name="GST_number"
                label="GST number"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Material"
                name="Material"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Quantity"
                name="Quantity"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Truck number"
                name="Truck_number"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Source location"
                name="Source_location"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Destination location"
                name="Destination_location"
                onChange={handleInputChange}
              />
              <TextInput
                type="datetime-local"
                label="Arr time"
                name="Arr_time"
                onChange={handleInputChange}
              />
              <TextInput
                type="datetime-local"
                label="Dep time"
                name="Dep_time"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Driver number"
                name="Driver_number"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Cash"
                name="Cash"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="RTGS"
                name="RTGS"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Diesel"
                name="Disel"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Lorry freight"
                name="Lorry_Freight"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Loading charges"
                name="Loading_charges"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Driver allowance"
                name="Driver_allowance"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Contonment"
                name="Contonment"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Other charges"
                name="Other_charges"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Total"
                name="Total"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Advance paid"
                name="Advance_paid"
                onChange={handleInputChange}
              />
              <TextInput
                type="number"
                label="Balance"
                name="Balance"
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                label="Rupees in words"
                name="Ruppes_in_words"
                onChange={handleInputChange}
              />
            </div> */}
            {/* <button className="button" type="submit">
              Submit
            </button> */}
          </form>
        </div>
        <div className="receipt" ref={contentToPrint}>
          {/* Printing section here */}
        </div>
        {/* <table style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>LT Date</th>
              <th>Party name</th>
              <th>Address</th>
              <th>State</th>
              <th>District</th>
              <th>City</th>
              <th>Pincode</th>
              <th>GST number</th>
              <th>Material</th>
              <th>Quantity</th>
              <th>Truck number</th>
              <th>Source location</th>
              <th>Destination location</th>
              <th>Dep time</th>
              <th>Arr time</th>
              <th>Driver number</th>
              <th>Cash</th>
              <th>RTGS</th>
              <th>Disel</th>
              <th>Lorry Freight</th>
              <th>Loading charges</th>
              <th>Driver allowance</th>
              <th>Contonment</th>
              <th>Other charges</th>
              <th>Total</th>
              <th>Advance paid</th>
              <th>Balance</th>
              <th>Ruppes in words</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{e.LR_date}</td>
                  <td>{e.Party_name}</td>
                  <td>{e.Address}</td>
                  <td>{e.State}</td>
                  <td>{e.District}</td>
                  <td>{e.City}</td>
                  <td>{e.Pincode}</td>
                  <td>{e.GST_number}</td>
                  <td>{e.Material}</td>
                  <td>{e.Quantity}</td>
                  <td>{e.Truck_number}</td>
                  <td>{e.Source_location}</td>
                  <td>{e.Destination_location}</td>
                  <td>{e.Dep_time}</td>
                  <td>{e.Arr_time}</td>
                  <td>{e.Driver_number}</td>
                  <td>{e.Cash}</td>
                  <td>{e.RTGS}</td>
                  <td>{e.Disel}</td>
                  <td>{e.Lorry_Freight}</td>
                  <td>{e.Loading_charges}</td>
                  <td>{e.Driver_allowance}</td>
                  <td>{e.Contonment}</td>
                  <td>{e.Other_charges}</td>
                  <td>{e.Total}</td>
                  <td>{e.Advance_paid}</td>
                  <td>{e.Balance}</td>
                  <td>{e.Ruppes_in_words}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}
        <div> {/* <input type="text" onChange={handleFilter} /> */}</div>
        {/* <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
        ></DataTable> */}
        {/* <input type="text" onChange={handleFilter1} />
        <div>
          <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
          <button onClick={handleDownloadSelected}>
            DOWNLOAD SELECTED EXCEL
          </button>
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
        ></DataTable> */}
      </div>
    </>
  );
}
