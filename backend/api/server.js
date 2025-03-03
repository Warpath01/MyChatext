import express from "express";
import { connectDB } from "../config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "../routes/auth.route.js";
import messagesRoutes from "../routes/messages.route.js";
import postsRoutes from "../routes/posts.route.js";

import path from 'path';
import { fileURLToPath } from 'url';
import { app, server } from "../config/socket.js";




dotenv.config();
// OR allow all origins (for development purposes)
app.use(
    cors({
         origin: "https://my-chatext-client-two.vercel.app",
        credentials: true,
    })
);

app.options("*", cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://my-chatext-client-two.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});




app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("This Server is Ready!");
});

const PORT = process.env.PORT || 7000;


// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __otherDirname = path.resolve()

// allow static use -- 
app.use('/profile-pics', express.static(path.join(__dirname, 'uploaded', 'profilepics')));
app.use('/post-pics', express.static(path.join(__dirname, 'uploaded', 'posts')));


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__otherDirname, '../frontend/dist')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__otherDirname, '../frontend', 'dist', 'index.html'));
//     })
// }

const startServer = async () => {
    await connectDB();

    // Use routes endpoints-----
    app.use("/api/auth", authRoutes)
    app.use("/api/messages", messagesRoutes)
    app.use("/api/posts", postsRoutes)

    server.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
};
startServer();

export default app;




