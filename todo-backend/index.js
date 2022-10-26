import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config"
import { Users } from "./Users.js";

const app = express();

app.use(express.json());
app.use(express());

app.use(cors())

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
  


app.listen(process.env.DB_PORT || 3500)

app.post("/addUser",async (req,res) => {
   let name = req.body.name
   let email = req.body.email
   let password = req.body.password
   let todos = req.body.todos
   await Users.create({
      name,
      email,
      password,
      todos
   }).then(result => res.json({user:result,success:true}))
})

app.get("/getUsers",async (req,res)=>{
   await Users.find().then(result => res.json(result))
})

app.put("/update/:id",async (req,res) => {
   await Users.findByIdAndUpdate({"_id":req.params.id},req.body)
})



// #=================================================
// app.get("/all", async (req, res) => {
//     const allTodos = await Todos.find();
//     return res.status(200).json(allTodos);
//   });
//   app.post("/new", async (req, res) => {
//     const createTodo = await Todos.create({
//       text: req.body.text,
//       isChecked: req.body.isChecked,
//     });
//     res.status(200).json(createTodo);
//   });
//
