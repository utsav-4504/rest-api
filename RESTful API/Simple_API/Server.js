const { urlencoded } = require('body-parser')
const { error, log } = require('console')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let Items = []
let nextid = 1;

app.listen(3000, () => {
    console.log("Server running on the 3000 Port.")
})

//Display API
app.get('/api/items', (req, res) => {
    res.json({ users: Items })
})

//Insert API
app.post('/api/items', (req, res) => {
    const { name } = req.body
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newItem = { id: nextid++, name };
    Items.push(newItem);
    res.status(201).json(newItem);
});

// Delete API
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = Items.findIndex(item => item.id === id);

    if (index === -1) return res.status(404).json({ error: 'Item not found' });
    console.log(index)
    const deletedItem = Items.splice(index, 1);
    res.json(deletedItem[0]);

})

// Update API
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const item = Items.find((i) => i.id === id)

    console.log(name)
    if (!item) return res.status(401).json({ message: "Item not found" })
    if (name === '') return res.status(420).json({ message: "Name not found" })

    item.name = name
    return res.json({
        msg: "Data Updateds Sucesfully",
        user: item
    },)
})

// 404 Handler (for undefined routes)
app.use((req, res, next) => {
    console.error(`server error : ${req.originalUrl}`)
    res.status(420).json({ message: "Page not found !" })
})

// General Error Handler
app.use((err, req, res, next) => {
    console.error(`Server Error: ${err.message}`);
    res.status(500).json({ message: 'Something went wrong on the server.' });
});