const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let isAuthenticated = false;

// 🔐 Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy credentials
    const validUsername = 'admin';
    const validPassword = '1234';

    if (username === validUsername && password === validPassword) {
        isAuthenticated = true;
        res.json('Login successful!');
    } else {
        res.status(401).json('Unauthorized: Invalid credentials.');
    }
});

function authMiddleware(req, res, next) {
    if (isAuthenticated) {
        next(); // Let them in
    } else {
        res.status(401).send(' Access denied. Please log in.');
    }
}

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json('Welcome to the protected content!');
});

app.post('/logout', (req, res) => {
    isAuthenticated = false;
    res.send('Logged out successfully.');
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
