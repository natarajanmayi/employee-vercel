import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeForm from "./EmployeeForm";
import EmployeeEdit from "./EmployeeEdit";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("http://localhost:5000/employees");
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    fetchEmployees();
    toast.success("Employee deleted successfully!");
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setModalType("add");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditEmployee(null);
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={openAddModal}
          className="btn btn-primary px-4 py-2 rounded-md text-white"
        >
          Add New Employee
        </button>
      </div>

      {/* Add or Edit Modal */}
      {isModalOpen && modalType === "add" && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <EmployeeForm refreshList={fetchEmployees} closeModal={closeModal} />
          </div>
        </div>
      )}

      {isModalOpen && modalType === "edit" && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <EmployeeEdit
              employee={editEmployee}
              refreshList={fetchEmployees}
              setEditEmployee={setEditEmployee}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-700 my-4 text-center">
        Employee List
      </h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Position</th>
              <th className="px-4 py-2 text-center">Department</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="bg-white hover:bg-gray-100">
                <td className="px-4 py-2 text-center text-gray-800">
                  {employee.name}
                </td>
                <td className="px-4 py-2 text-center text-gray-800">
                  {employee.position}
                </td>
                <td className="px-4 py-2 text-center text-gray-800">
                  {employee.department}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="btn btn-info btn-sm mr-2 "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="btn btn-error btn-sm mt-2 sm:mt-0"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
