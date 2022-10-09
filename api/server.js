const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Todo = require("./models/Todos");

const app = express();
app.use(express.json());
app.use(cors());

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-mern-no-ts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));


app.get("/todos", async(_, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post("/todos/add", (req, res) => {
    const todos = new Todo({
        text: req.body.text
    })
    todos.save().catch((e) => console.log(e));
    res.json(todos);
})

app.delete("/todos/delete/:id", async(req,res) => {
  const todos = await Todo.findByIdAndDelete(req.params.id);
  res.json(todos)
})

app.get("/todos/complete/:id", async(req,res) => {
  console.log("1", req.params.id)
  const filteredData = await Todo.findById(req.params.id);
  console.log("2")
  filteredData.complete = !filteredData.complete;
  filteredData.save();
  res.json(await Todo.find());
})

app.put("/todos/update/:id", async (req, res) => {
  const filteredData = await Todo.findById(req.params.id);
  console.log(filteredData, req.body);
  filteredData.text = req.body.text;
  filteredData.complete = req.body.complete;
  filteredData.timestamp = req.body.timestamp;
  filteredData.save();
  res.json(filteredData);
})

app.listen(process.env.PORT, () => console.log("Server started"))