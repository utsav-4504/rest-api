const express = require('express')

const app = express()
const userRoutes = require('./Routes/userRoutes')

const port = 3000;

app.listen(port, () => {
    console.log("Server running on the " + port)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Connecting to Mongo DB



app.use('/Users', userRoutes)


