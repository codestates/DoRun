import express from "express"; 
import 'dotenv/config'

const app = express(); 



app.get("/",(req : express.Request , res : express.Response) =>{
  res.send(`Hello, ${process.env.DATABASE_HOST,process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,process.env.DATABASE_PORT,process.env.SERVER_PORT}`);
})

app.listen(80, () => {
  console.log("Hello, World!"); 
});


