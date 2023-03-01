import { useState } from "react";
import moment from "moment";
import CustomTable from "./components/CustomTable";
import "./style/index.css";
import CsvReader from "./components/CsvReader";

function App() {
  const [data, setData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const calcDaysWorked = (employee) => {
    const dateTo =
      employee.DateTo !== "NULL" ? employee.DateTo : new Date().getTime();
    var start = moment(employee.DateFrom);
    var end = moment(dateTo);
    return end.diff(start, "days");
  };

  const getEmployeesData = (employees) => {
    setData(employees);
    let employeesData = [];
    employees.forEach((employee) => {
      let foundSameProject = false;
      let days = calcDaysWorked(employee);
      for (let i = 0; i < employeesData.length; i++) {
        if (employeesData[i]?.projectId === employee.ProjectID) {
          employeesData[i].employeeId += `, ${employee.EmpID}`;
          employeesData[i].daysWorked += days;
          foundSameProject = true;
        }
      }
      if (!foundSameProject) {
        employeesData.push({
          employeeId: employee.EmpID,
          projectId: employee.ProjectID,
          daysWorked: days,
        });
      }
      setEmployeeData(employeesData);
    });
  };

  return (
    <div className="main-content">
      <CsvReader getEmployeesData={getEmployeesData} />
      <div>
        <CustomTable
          data={employeeData}
          tableTitle="Employees with days worked"
        />
      </div>
      <div>
        <CustomTable data={data} tableTitle="Original employees table" />
      </div>
    </div>
  );
}

export default App;
