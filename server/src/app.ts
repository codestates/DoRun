//const express = require('express');
import express from "express"; 
const dotenv = require('dotenv');
//import dotenv = from "dotenv"
const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send("Hello, ");
})

app.listen(80, () => {
  console.log("Hello, World!"); 
});


