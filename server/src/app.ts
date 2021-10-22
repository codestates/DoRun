//const express = require('express');
import express from "express"; 
const dotenv = require('dotenv');
//import dotenv = from "dotenv"
const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send([process.env.DATABASE_HOST,process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,process.env.DATABASE_PORT]);
})

app.listen(8000, () => {
  console.log("Hello, World!"); 
});
