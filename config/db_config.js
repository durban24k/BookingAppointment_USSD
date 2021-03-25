const mysql=require('mysql');
require('dotenv').config();

// Database Connection
const db=mysql.createConnection({
     host : process.env.DB_HOST,
     user : process.env.DB_USER,
     password : process.env.DB_PASSWORD,
     database : process.env.DB,
     debug:false,
     multipleStatements : true
});

db.connect((err)=>{
     if(!err){
          console.log(`Database Connected Successfully!!\nConnected as ${dbConnection.threadId}`);
     }else{
          console.error(`Database Connection Failed!!!\nError connecting: ${err.stack}`);
          return;
     }
});

module.exports=db;