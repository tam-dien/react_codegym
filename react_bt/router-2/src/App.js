import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Employee from "./components/Employee";
import EmployeeDetail from "./components/EmployeeDetail"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee/:username" element={<Employee />} />
        <Route path="/employeedetail/:id" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;