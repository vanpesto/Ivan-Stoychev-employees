import React, { useState } from "react";

const CsvReader = ({ getEmployeesData }) => {
  const [files, setFiles] = useState("");

  const readCSVFile = () => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function (event) {
        const csvdata = event.target.result;
        const headers = csvdata.slice(0, csvdata.indexOf("\n")).split(",");
        const rows = csvdata.slice(csvdata.indexOf("\n") + 1).split("\n");

        const data = rows.map(function (row) {
          const values = row.split(",");
          const el = headers.reduce(function (object, header, index) {
            object[header.replace("\r", "")] = values[index].replace("\r", "");
            return object;
          }, {});
          return el;
        });
        getEmployeesData(data);
      };
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <div className="csv-reader-container">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFiles(e.target.files)}
      />
      <button className="show-data-btn" onClick={() => readCSVFile()}>
        Show Data
      </button>
    </div>
  );
};

export default CsvReader;
