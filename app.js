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

     // Date function
     function addDays(days){
          let date = new Date();
          return date.toLocaleDateString('en-GB',date.setDate(date.getDate()+days))
     }

     if(text==''){
          response=`CON Welcome to OPTICAL CARE
          1. Book an Appointment
          2. Exit`;
     }else if(txt[0]==='1' && count===1){
          response=`CON Enter your First Name`;
     }else if(count===2){
          response=`CON Enter your Last Name`;
     }else if(count===3){
          response=`CON Select Appointment Date:
          1. ${addDays(0)} (Today)
          2. ${addDays(1)}
          3. ${addDays(2)}
          4. ${addDays(3)}
          5. ${addDays(4)}`;
     }else if(count===4){
          response=`CON Select Appointment Time:
          1. 9:00 AM
          2. 10:00 AM
          3. 11:00 AM
          4. 12:00 NOON
          5. 2:00 PM
          6. 3:00 PM`;
     }else if(count===5){
          response=`CON Select Appointment Type:
          1. Eye Test
          2. Frame Replacement
          3. Doctor Consultation`;
     }else if(count===6){
          response=`CON Confirm Appointment:
          Name:
          Phone No:
          Date:
          Time:
          Type:
          
          1. Book Appointment
          2. Cancel`;
     }else if(count===7){
          response=`END Appointment Booked Successfully!
          Thank you for using our service.`;
     }else if(count===7){
          response=`End Booking Cancelled!
          Call +254722000000 for any assistance.`;
     }else if(txt[0]==='2'){
          response=`END Session Cancelled`;
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