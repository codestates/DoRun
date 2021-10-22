//const express = require('express');
import express from "express"; 
const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send("start aasdasd");
})

app.listen(1234, () => {
  console.log("Hello, World!"); 
});
