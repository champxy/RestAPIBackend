const express = require('express');
const  { readdirSync } = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');


const app = express();

connectDB();


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));

readdirSync('./routes').map((r)=> app.use('/api' , require('./routes/' + r)));



app.listen(4900, () => {
    console.log('Server running on port 4900');
})