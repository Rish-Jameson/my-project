// const express = require('express')
import express from "express"
import { config} from 'dotenv'
import {connectDB, disconnectDB} from "./config/db.js"


//Import Routes
import movieRoutes from './routes/movieRoutes.js';

config();
connectDB();


const app = express() // this definition


//API Routes
app.use("/movies", movieRoutes);


app.get("/helo", (req, res) =>{
    res.json({ message: "Hello World"});

});

const PORT = 5001;

const server = app.listen(PORT, () => {
    console.log(`Sever running on PORT ${PORT}`)});

//GET, POST, PUT, DELETE

//Handle unhandled promise rejections
process.on("unhandledRejection", async (err)=> {
    console.error("Unhandled Rejection:", err);
    server.close(async() => {
        await disconnectDB();
        process.exist(1);
    });
});

//Handle uncaught exceptions
process.on("uncaughtException", async (err)=> {
    console.error("Uncaught Exception:", err);
        await disconnectDB();
        process.exist(1);
});

//Graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });
});

