const express=require('express');
const {urlencoded} =require('body-parser');
const cors=require('cors');
require('dotenv').config();

const connectToDb=require('./db');
const DataRoute=require('./routes/dataRoute');
const MailRoute=require('./routes/mailRoute');

connectToDb();
const app=express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use('/', MailRoute);
app.use('/data', DataRoute);

module.exports=app;
