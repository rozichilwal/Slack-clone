import express, { json } from "express";
import {ENV} from "./config/env.js";
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import {inngest} from "./config/inngest.js";
import {functions} from "./config/inngest.js";
import {serve} from "inngest/express";


const app = express();


app.use(express.json());
// req.auth will be available in the request object 
app.use(clerkMiddleware()); 




app.get("/",(req,res)=>{
    res.send("hello from rozi");
});

app.use("/api/inngest",serve({
    client:inngest,
    functions,
}));


const startServer = async()=>{
    try {
        await connectDB();
        if(ENV.NODE_ENV!=="production"){
            app.listen(ENV.PORT,()=>{
            console.log(`Server started on port ${ENV.PORT}`);
            
         })
        }
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();

export default app;

