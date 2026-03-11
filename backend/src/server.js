import "../instrument.js"; // Import Sentry instrumentation
import express, { json } from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { inngest } from "./config/inngest.js";
import { functions } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();

// ------------------- CORS Setup -------------------
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "http://localhost:5174", // Local dev (fallback)
  "https://slack-clone-five-ecru.vercel.app", // Your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow tools like Postman or mobile apps
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: Origin ${origin} not allowed`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// ------------------- Middleware -------------------
app.use(express.json());
app.use(clerkMiddleware()); // req.auth available in requests

// ------------------- Routes -------------------
app.get("/debug-sentry", (req, res) => {
  throw new Error("my first sentry error");
});

app.get("/", (req, res) => {
  res.send("hello from rozi");
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

app.use("/api/chat", chatRoutes);

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// ------------------- Start Server -------------------
const startServer = async () => {
  try {
    const PORT = ENV.PORT || 5001;

    // Listen in all environments (dev + production)
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    await connectDB();
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;


// import "../instrument.js"; // Import Sentry instrumentation
// import express, { json } from "express";
// import {ENV} from "./config/env.js";
// import { connectDB } from "./config/db.js";
// import {clerkMiddleware} from "@clerk/express";
// import {inngest} from "./config/inngest.js";
// import {functions} from "./config/inngest.js";
// import {serve} from "inngest/express";
// import chatRoutes from "./routes/chat.route.js";
// import * as Sentry from "@sentry/node";
// import cors from "cors";


// const app = express();


// app.use(express.json());
// app.use(cors({
//     origin: ENV.CLIENT_URL,
//     credentials: true,
// }));    
// // req.auth will be available in the request object 
// app.use(clerkMiddleware()); 


// app.get("/debug-sentry",(req,res)=>{
//     throw new Error("my first sentry error");
// });


// app.get("/",(req,res)=>{
//     res.send("hello from rozi");
// });

// app.use("/api/inngest",serve({
//     client:inngest,
//     functions,
// }));
// app.use("/api/chat",chatRoutes);

// Sentry.setupExpressErrorHandler(app);


// const startServer = async()=>{
//     try {
//         await connectDB();
//         if(ENV.NODE_ENV!=="production"){
//             app.listen(ENV.PORT,()=>{
//             console.log(`Server started on port ${ENV.PORT}`);
            
//          })
//         }
//     } catch (error) {
//         console.error("Error starting server:", error);
//         process.exit(1);
//     }
// }

// startServer();

// export default app;

