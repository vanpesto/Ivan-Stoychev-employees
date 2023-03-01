import React from "react";

const CustomTable = ({ data, tableTitle = "" }) => {
  return (
    <div className="custom-table-container">
      {data.length > 0 && (
        <>
          <p className="custom-table-title">{tableTitle}</p>
          <table className="custom-table">
            <thead className="custom-table-row">
              <tr>
                {Object.keys(data[0]).map((key) => {
                  return <th className="custom-table-cell">{key}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((employee) => {
                return (
                  <tr className="custom-table-row">
                    {Object.keys(data[0]).map((key) => {
                      return (
                        <td className="custom-table-cell">{employee[key]}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomTable;
