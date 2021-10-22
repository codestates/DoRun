//const express = require('express');
import express from "express"; 
const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send("start aasdasd,",process.env.DATABASE_HOST,process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,process.env.DATABASE_PORT);
})

app.listen(1234, () => {
  console.log("Hello, World!"); 
});
