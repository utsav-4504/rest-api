const { Insert, Display, Update, Delete, Pages, Login, MiddleWare } = require('../Controllers/userController')
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

router.post("/Data", [
    // Validation is Here
    body('name')
        .notEmpty().withMessage('Name is Required')
        .isLength({ min: 2 }).withMessage('Name Must be at least 2 Characters long'),
    body('email')
        .notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Enter valid Email'),
    body('password')
        .notEmpty().withMessage('Name is Required')
        .isLength({ min: 6 }).withMessage('Password Must be at least 6 Characters long')

], Insert)
router.get("/Data", MiddleWare, Display)
router.get("/Data/Page", Pages)
router.put("/Data/:id", Update)
router.delete("/Data/:id", Delete)
router.post("/Data/Login", Login)

module.exports = router