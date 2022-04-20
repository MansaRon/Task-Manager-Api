const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(router);

// CORS
const corsOptions ={
    origin:'http://localhost:3500', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Load middleware
app.use(bodyParser.json());

app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Allow-Credentials', true);
    // if (req.method === 'OPTIONS') {
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    //     return res.status(200).json({});
    // };
    console.log('Inside CORS...');
    next();
});

// Test Route
// app.get('/', (res, req) => {
//     req.send('Hello world');
// })

// Database Connection
const mongoString = 'mongodb+srv://MansaRon:TheGreat%4095@thendocluster.1gxlw.mongodb.net/TaskManager';
mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => { console.log(error) })
db.once('connected', () => { console.log('Database Connected') })
app.listen(3500, () => { console.log('Server is listening and alive') })