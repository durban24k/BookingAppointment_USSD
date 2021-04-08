require('dotenv').config({path:'./.env'});
const express=require('express');
const logger=require('morgan');
const nodemailer=require('nodemailer');
const async=require('async');

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
     let fname='';
     let lname='';
     let phone_no=phoneNumber;
     let app_date='';
     let app_time='';
     let app_type='';
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
          5. 2:00 PM`;
     }else if(count===5){
          response=`CON Select Appointment Type:
          1. Eye Test
          2. Frame Replacement
          3. Doctor Consultation`;
     }else if(count===6){
          if(txt[3]=='1'){
               app_date=addDays(0);
          }else if(txt[3]=='2'){
               app_date=addDays(1);
          }else if(txt[3]=='3'){
               app_date=addDays(2);
          }else if(txt[3]=='4'){
               app_date=addDays(3);
          }else if(txt[3]=='5'){
               app_date=addDays(4);
          }

          if(txt[4]=='1'){
               app_time='9:00 AM';
          }else if(txt[4]=='2'){
               app_time='10:00 AM';
          }else if(txt[4]=='3'){
               app_time='11:00 AM';
          }else if(txt[4]=='4'){
               app_time='12:00 NOON';
          }else if(txt[4]=='5'){
               app_time='2:00 PM';
          }

          if(txt[5]=='1'){
               app_type='Eye Test';
          }else if(txt[5]=='2'){
               app_type='Frame Replacement';
          }else if(txt[5]=='3'){
               app_type='Doctor Consultation';
          }

          response=`CON Confirm Appointment:
          Name: ${txt[1]} ${txt[2]}
          Phone No: ${phoneNumber}
          Date: ${app_date}
          Time: ${app_time}
          Type: ${app_type}
          
          1. Book Appointment
          2. Cancel`;
     }else if(count===7 && txt[6]=='1'){
          fname=txt[1];
          lname=txt[2];
          if(txt[3]==='1'){
               app_date=addDays(0);
          }else if(txt[3]==='2'){
               app_date=addDays(1);
          }else if(txt[3]==='3'){
               app_date=addDays(2);
          }else if(txt[3]==='4'){
               app_date=addDays(3);
          }else if(txt[3]==='5'){
               app_date=addDays(4);
          }

          if(txt[4]=='1'){
               app_time='9:00 AM';
          }else if(txt[4]=='2'){
               app_time='10:00 AM';
          }else if(txt[4]=='3'){
               app_time='11:00 AM';
          }else if(txt[4]=='4'){
               app_time='12:00 NOON';
          }else if(txt[4]=='5'){
               app_time='2:00 PM';
          }

          if(txt[5]=='1'){
               app_type='Eye Test';
          }else if(txt[5]=='2'){
               app_type='Frame Replacement';
          }else if(txt[5]=='3'){
               app_type='Doctor Consultation';
          }
          let timestamp=new Date();
          
          async.waterfall([
               (done)=>{
                    const db=require('./config/db_config.js');
                    const sql = "INSERT INTO patient SET ?";
                    db.query(sql,{fname,lname,phone_no,app_date,app_time,app_type,timestamp},(error,results,fields)=>{
                         if(error){
                              res.status(400);
                              response =`END TRY AGAIN
                              Problem Encountered!!`;
                         }
                         done(error);
                    });
               },
               (done)=>{
                    const emailContent = `
                         <h3>New Appointment</h3>
                         <p>A new appointment has been booked<br>
                         ---DETAILS---<br>
                         Name: <b>${fname} ${lname}</b><br>
                         Phone No: <b>${phone_no}</b><br>
                         Date: <b>${app_date}</b><br>
                         Time: <b>${app_time}</b><br>
                         Type: <b>${app_type}</b><br>
                         </p>

                         <P>Regards,</P>
                         <p>The OPTICAL CARE Team.</p>
                    `;
                    // create reusable transporter object using the default SMTP transport
                    const transporter = nodemailer.createTransport({
                         host: 'mail.bevt.co.ke',
                         port: 465,
                         secure: true, // true for 465, false for other ports
                         auth: {
                              user: 'no-reply@bevt.co.ke', // generated ethereal user
                              pass: process.env.MAILPW  // generated ethereal password
                         },
                         tls:{
                              rejectUnauthorized:false
                         }
                    });
                    const mailOptions = {
                         from:'"OPTICAL CARE PLUS" <no-reply@bevt.co.ke>',
                         to: 'yieldmarket@gmail.com',
                         subject:'NO-REPLY || NEW APPOINTMENT',
                         html: emailContent
                    };
                    transporter.sendMail(mailOptions,(e,info)=>{
                         if(e){
                              return console.log(e);
                         }
                         console.log(`Message sent: ${info.messageId}`);
                         console.log('Email Sent');

                         response=`END Appointment Booked Successfully
                         Thank you for using our service.`;
                    });
               }
          ]);
          response=`END Appointment Booked Successfully!
                    Thank you for using our service.`;
     }else if(count===7 && txt[6]=='2'){
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
});