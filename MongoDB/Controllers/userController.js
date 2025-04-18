const UserModel = require('../Model/UserModel')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { use } = require('../Routes/userRoutes');

const JWT_SECRET = 'your_jwt_secret_key';


const Insert = async (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() })
    }
    try {
        const { name, email, password } = req.body
        const existinguser = await UserModel.find({ email })
        if (existinguser.length === 1) {
            return res.status(400).json({ err: "user Exist" })
        }
        const user = new UserModel({ name, email, password });
        await user.save();

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }

}

const Display = async (req, res) => {
    try {
        const obj = {}
        const { name, email } = req.query
        if (name) obj.name = new RegExp(name, 'i')
        if (email) obj.email = new RegExp(email, 'i')
        // Searching data
        let data = await UserModel.find(obj)
        if (data) {
            return res.json(data)
        }
    }
    catch (err) {
        res.status(500).json({ err: "Error.." })
    }

}

const Pages = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const skip = (page - 1) * limit

        const users = await UserModel.find().skip(skip).limit(limit)
        const totuser = await UserModel.countDocuments()
        res.json({
            CurrentPage: page,
            totpage: Math.ceil(totuser / limit),
            totuser,
            users
        })
    }
    catch (err) {
        console.log(err)
    }
}

const Update = async (req, res) => {
    let id = req.params.id
    let data = await UserModel.findByIdAndUpdate(id, req.body)
    let upddata = await UserModel.findById(id)
    if (data) {
        return res.json({
            "data": upddata,
            "msg": "Data Updated Succesfully"
        })
    }
}

const Delete = async (req, res) => {
    let id = req.params.id
    let data = await UserModel.findByIdAndDelete(id)
    if (data) {
        return res.json({
            "msg": "Data Deleted Succesfully"
        })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) return res.json({ message: "Invalid user" })
    if (password == user.password) {
        const token = jwt.sign({ userID: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
        return res.json({
            message: "Login Successfull", token
        })

    }
    else {
        return res.json("Incorrect Passoword.")
    }

}

const MiddleWare = async (req, res, next) => {
    const auth = req.headers['authorization']

    const token = auth && auth.split(' ')[1]

    if (!token) return res.json({ message: "Access Denieed,Token not Provided ." })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded; // Store payload in req.user
        next()
    }
    catch (err) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = { Insert, Display, Update, Delete, Pages, Login, MiddleWare }