const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(3000, () => {
    console.log('Server is listening and alive');
})