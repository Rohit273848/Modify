
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import app from './src/app.js'
import connectDB from './config/database.js'

connectDB();
console.log("PRIVATE KEY:", process.env.IMAGEKIT_PRIVATE_KEY);
app.listen(3000,()=>{
    console.log('✅ Server is running on port 3000');
})