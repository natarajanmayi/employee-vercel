import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // This is needed for styling

const EmployeeForm = ({ refreshList, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.position || !formData.department) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/employees", formData);
      setFormData({ name: "", position: "", department: "" });
      refreshList();
      toast.success("Employee added successfully!");
      closeModal(); // Close modal after successful addition
    } catch (error) {
      toast.error("Error adding employee!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
        Add New Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="input input-bordered w-full p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between gap-4">
          <button
            type="submit"
            className="btn btn-primary w-1/2 p-3 rounded-md text-white mt-4 hover:bg-blue-700 focus:outline-none"
          >
            Add
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

export default EmployeeForm;
