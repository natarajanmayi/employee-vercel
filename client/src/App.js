import React from "react";
import EmployeeList from "./components/EmployeeList";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

function App() {
  return (
    <div className="bg-gray-100 min-h-screen sm:p-5">
      <div className="max-w-5xl mx-auto bg-white rounded shadow sm:p-5">
        <h1 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Employee Management System
        </h1>
        <ToastContainer /> {/* Add this to the top-level component */}
        <EmployeeList />
      </div>
    </div>
  );
}

export default App;
