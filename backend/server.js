const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://anisha:Anisha375541.@taskmanager.znfrweq.mongodb.net/?appName=taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const taskSchema = new mongoose.Schema({
  title: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.send("Student Task Manager API is running");
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = await Task.create({ title: req.body.title });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});