import express from "express"; 
import 'dotenv/config'

const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send(`H, host = ${process.env.DATABASE_HOST}\n
  DBuser = ${process.env.DATABASE_USER}\n
  DBpassword = ${process.env.DATABASE_PASSWORD}\n
  DBPort = ${process.env.DATABASE_PORT}\n
  ServerPort = ${process.env.SERVER_PORT}`);
})

app.listen(process.env.SERVER_PORT, () => {
 // console.log("Hello, World!"); 
});


