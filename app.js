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

// TEST GET METHOD TO CHECK WHETHER THE PROGRAM WORKS
app.get('*',(req,res)=>{
     const consoleMessage='Booking Appointment Running........';
     res.send(consoleMessage);
});

app.post('*',(req,res)=>{
     let {
          sessionId,
          serviceCode,
          phoneNumber,
          text
     }=req.body;
     
     let response='';
     console.log(`Session ID: ${sessionId}\nService Code: ${serviceCode}\nPhone Number: ${phoneNumber}\nText String: ${text}`);

     let count=text.split('*').length;
     let txt=text.split('*');

     if(text==''){
          response=`CON Welcome to YIELD OPTICAL
          1. Continue
          2. Exit`;
     }else if(txt[0]==='1' && count===1){
          response=`CON Enter your First Name`;
     }else if(txt[0]==='2'){
          response=`END You did not book an appointment.
          Thank you for using our service`;
     }else{
          res.status(400);
          response=`END TRY AGAIN
          Invalid Entry/Choice`;
     }

     res.set('Content-Type:text/plain');
     res.status(200).send(response);
});

app.listen(port,()=>{
     console.log(`USSD APP running on port ${port}`);
})