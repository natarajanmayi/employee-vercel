import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeEdit = ({ employee, refreshList, setEditEmployee, closeModal }) => {
  const [formData, setFormData] = useState(employee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/employees/${employee._id}`, formData);
      setEditEmployee(null);
      refreshList();
      toast.success("Employee updated successfully!");
      closeModal(); // Close modal after successful update
    } catch (error) {
      toast.error("Error updating employee!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg my-6">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        Edit Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Position"
          />
        </div>
        <div>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Department"
          />
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="btn btn-primary w-1/2 p-3 rounded-md text-white mt-4 hover:bg-blue-700 focus:outline-none"
          >
            Update
          </button>
          <button
            type="button"
            onClick={closeModal} // Close modal on Cancel
            className="btn btn-secondary w-1/2 p-3 rounded-md text-white mt-4 hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeEdit;
