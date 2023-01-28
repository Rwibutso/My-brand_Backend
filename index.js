const express = require('express');
const app = express();
const dotenv = require('dotenv');
//import route
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');

dotenv.config();
//connect db
mongoose.set('strictQuery', false);

mongoose.connect(
process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('connected to db!'));

//middleware 
app.use(express.json());

app.use('/api/user', authRoute);



app.listen(3000, () => console.log('Server is up and running'));