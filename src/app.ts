//import all modules
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

//Route
import testRoutes from './routes/all.routes'

const app = express()

// morgan that permits to see all requests POST, PUT, etc; 
//cors to let our server comunicate with external servers
app.use(cors());
app.use(morgan("dev"));

//Set templates engine
app.set('view engine','ejs')

//Set public folder to static fields
app.use(express.static('public'))

//To node process incoming data
app.use(express.urlencoded({extended:true}))
app.use(express.json());

//set environment variables
dotenv.config({path:'./env/.env'})

//to work wiyh cookies
//app.use(cookieParser())


//Route
app.use(testRoutes)

export default app;