import express from "express"; 
import 'dotenv/config'

const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send(`H, host = ${process.env.DATABASE_HOST}
  DBuser = ${process.env.DATABASE_USER}
  DBpassword = ${process.env.DATABASE_PASSWORD}
  ServerPort = ${process.env.DATABASE_PORT,process.env.SERVER_PORT}`);
})

app.listen(80, () => {
  console.log("Hello, World!"); 
});


