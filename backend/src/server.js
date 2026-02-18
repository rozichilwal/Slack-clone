import express from "express";
import {ENV} from "./connfig/env.js";


const app = express();



app.get("/",(req,res)=>{
    res.send("hello from rozi");
});

console.log("mongo url:",ENV.MONGO_URL);

app.listen(ENV.PORT,()=>{
    console.log(`Server started on port ${ENV.PORT}`);
})