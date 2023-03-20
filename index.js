
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
var cors = require('cors')



const mongoString = "mongodb+srv://gino-19:testing-pw-19@betopenly-test.qzrefqu.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})


app.use('/api', routes)

