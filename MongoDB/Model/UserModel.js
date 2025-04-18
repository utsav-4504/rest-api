const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/TOPS_db")
    .then(() => console.log("Connected to MongoDB Sucessfully..."))
    .catch((err) => console.log("Somethig wen wrong" + err))



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel
