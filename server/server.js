const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  department: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

// CRUD Endpoints
// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create an employee
app.post("/employees", async (req, res) => {
  const { name, position, department } = req.body;
  const newEmployee = new Employee({ name, position, department });

  try {
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an employee
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, position, department },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete an employee
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).send("Employee deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
