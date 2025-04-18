const express = require('express')
const app = express()
const path = require('path')

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on the ${port} server. `)
})

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit', (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res.status(400).send('Both name and Email Required !')
    }
    // Friendly message
    res.send(`
        <h2>Success</h2>
        <p>
            Thanks,<strong>${name}</strong>.
        </p>
        <p>We recived your Email : <strong>${email}</strong></p>
        <a href="/">Go back</a>
        `)
})

// ✅ 404 Handler
app.use((req, res) => {
    res.status(404).send('<h1>404 - Page not found!</h1>');
});


