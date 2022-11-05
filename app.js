const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(require('./cors'));
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


// Database Connection
const mongoString = 'mongodb+srv://MansaRon:TheGreat%4095@thendocluster.1gxlw.mongodb.net/TaskManager';
mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => { console.log(error) })
db.once('connected', () => { console.log('Database Connected') })
app.listen(3500, () => { console.log('Server is listening and alive') })