import mongoose from "mongoose";

const {Schema, model} = mongoose;

let user = new Schema ({
   name: String,
   email: String,
   password: String,
   todos: Array
})


export const Users = model('user', user)