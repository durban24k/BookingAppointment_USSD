require('dotenv').config({path:'./.env'});
const express=require('express');
const logger=require('morgan');

// Initiate The Express App
const app=express();

// Middleware
app.use(logger('combined'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port=process.env.PORT || 3000;

app.get('*',()=>{
     const 
});

app.listen(port,()=>{
     console.log(`USSD APP running on port ${port}`);
})