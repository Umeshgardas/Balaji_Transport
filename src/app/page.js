"use client";
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
  const [success, setSuccess] = useState("");
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
        setSuccess(res.status);
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
  ];
  const columns1 = [
    {
      name: "LR_date",
      selector: (row) => row.LR_date,
      sortable: true,
    },
    {
      name: "Party_name",
      selector: (row) => row.Party_name,
      sortable: true,
    },
    {
      name: "Cash",
      selector: (row) => row.Cash,
      sortable: true,
    },
  ];

  const data1 = [
    {
      id: 1,
      name: "jamil",
      email: "jamil@gmail.com",
      age: "20",
    },

    {
      id: 4,
      name: "Sanju",
      email: "Sanju@gmail.com",
      age: "20",
    },
    {
      id: 2,
      name: "Umesh",
      email: "Umesh@gmail.com",
      age: "30",
    },
    {
      id: 3,
      name: "Manohar",
      email: "mano@gmail.com",
      age: "30",
    },
  ];
  const [records, setRecords] = useState(data1);

  function handleFilter(event) {
    const newData = data1.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }
  const data4 = [
    { id: 1, name: "John Doe", age: 30, profession: "Developer" },
    { id: 2, name: "Jane Smith", age: 25, profession: "Designer" },
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
    if (event.target.value.length > 0) {
      const newData = data.filter((row) => {
        return row.Party_name.toLowerCase().includes(
          event.target.value.toLowerCase()
        );
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
      LR_Number : product.LR_number,
      Party_name: product.Party_name,
      
      Cash: product.Cash,
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "data");

    // customize header names
    XLSX.utils.sheet_add_aoa(worksheet, [
      ["LR Number", "Party Name", "Cash"],
    ]);

    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  };
  return (
    <>
      <div className="main">
        {/* <ExcelExport data={data4} /> */}
        <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
        <div className="content">
          <h1>Registration Form</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form_container">
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
            </div>
            <button className="button" type="submit">
              Submit
            </button>
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
        <input type="text" onChange={handleFilter1} />
        <DataTable
          columns={columns1}
          data={data}
          selectableRows
          fixedHeader
          pagination
        ></DataTable>
      </div>
    </>
  );
}
