const express = require('express');
const app = express();
const dotenv = require('dotenv');
//import route
const users = require('./routes/user');
const blogs = require('./routes/blog');
const messages = require('./routes/message');
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

app.use('/api', users);
app.use('/api/', blogs);
app.use('/api', messages)





app.listen(3002, () => console.log('Server is up and running'));