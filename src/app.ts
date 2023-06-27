// import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express'
// import { Server } from 'http'
// import createHttpError from 'http-errors'
// import {config} from 'dotenv'
// 
// config()
// 
// const app: Application = express()
// 
// app.get('/', (req: Request, res: Response, next: NextFunction) =>{
    // res.send('Hello from ts app')
// } )
// 
// app.use((req: Request, res: Response, next: NextFunction) => {
    // next(new createHttpError.NotFound())
// })
// 
// const errorHandler: ErrorRequestHandler = ( err, req, res, next ) => {
    // res.status(err.status || 500)
    // res.send({
        // status: err.status || 500,
        // message: err.message
    // })
// }
// 
// app.use(errorHandler)
// 
// const PORT: Number = Number(process.env.PORT) || 3000
// const server: Server = app.listen(PORT, () => console.log(`Server on Port ${PORT}`))
// 

//import { EventEmitter } from 'events';
// import * as url from "url";
// import * as fs from 'fs';
// import * as path from 'path' // Path-Module
//import { createServer, IncomingMessage, ServerResponse } from "http";
//const port = 8080;
// const server = createServer((request, response ) => {
    //console.log("🚀 ~ file: app.ts:60 ~ server ~ request:", request)

// if (request.url == "/name") {
    // if (request.method === "GET") {
        // response.end("hello world");
        // Create files:-
        // fs.open('myFile.txt', 'w', function (err, file) {
            // if (err)
                // throw err;
            // console.log('File open');
        // });
        //Update files:-
        //  fs.appendFile('appendfile.txt', ' File appended', function (err) {
            // if (err)
                // throw err;
            // console.log('File append');
        // });
        //  fs.writeFile("nodeFile2.txt", "NodeFile2", function (err) {
            // if (err)
                //  throw err;
            // console.log("File written Successfully ");
        //  });
        // Read files:-
    //    const readFile = fs.readFileSync(path.join(__dirname, 'nodeFile2.txt'), { encoding: 'utf-8' })
        // console.log(readFile)
        // Delete files:-
        // fs.unlink('nodeFile.txt', function (err) {
            // if (err)
                // throw err;
            // console.log('File deleted!');
        // });
        //Rename files:-
        // fs.rename('nodeFile.txt', 'nodeFile2.txt', function (err) {
            // if (err)
                // throw err;
            // console.log('File Renamed!');
        // });
        // var adr = 'http://localhost:8080/default.htm?year=2023&month=July&name=Shubham&tech=frontend';
        // var q = url.parse(adr, true);
        // console.log("🚀 ~ file: app.ts:105 ~ server ~ q:", q);
    // }
    // else {
        // response.end("Wrong method for this api");
    // }
// }
// }}});
// server.listen(port, () => console.log(`server is listening at port ${port}`));

// import { EventEmitter } from 'events'; //defined at the top as well
// const eventBroker = new EventEmitter();
// 
// eventBroker.on('event-1', () => {
    // console.log("event 1 is fired")
// })
// 
// eventBroker.on('event-2', (ar1, ar2) => {
    // console.log(`event 2 is fired ${ar1} ,${ar2}`)
// })
// eventBroker.emit('event-1')
// eventBroker.emit('event-2', 'hello', 'world')

// 
// import express, { Request, Response, NextFunction, Application } from 'express';
// import multer from 'multer';
//  
// const app: Application = express();
// 
// const port = 9800;
// const port = 9700;
// 

// const storage = multer.diskStorage({
    // destination(req, file, callback) {
        // callback(null, './src')
    // },
    // filename(req, file, callback) {
        // callback(null, file.originalname)
    // },
// });

// const upload = multer({ storage: storage });

// app.get('/uploadFile', upload.single('myFile'), (req: Request, res: Response, next: NextFunction) => {

    // try {
        // const file = req.file;
        // console.log("🚀 ~ file: app.ts:46 ~ app.get ~ file:", file)
        // res.status(200).send("file is sucessfully saved")
    // } catch (error) {
        // console.log("🚀 ~ file: app.ts:51 ~ app.get ~ error:", error)
    // }
// });

// app.listen(port, () => console.log(`server is listening at port ${port}`));
// 

//Nodemailer

// import express, { Request, Response, NextFunction } from 'express';
// import nodemailer from 'nodemailer';
// 
// const port = 9800;
// const app = express();
// 
// const transporter = nodemailer.createTransport({
    // service: 'gmail',
    // auth: { user: "Shubham.sumfactor@gmail.com", pass: "hgscsvvqtpqvieyk" }
// });
// 
// let mailOptions = {
    // from: "shubham.sumfactor@gmail.com",
    // to: "shubhi6767@gmail.com",
    // subject: "NODE-JS",
    // text: "THIS IS NODEJS TUTORIAL nodemailer."
// }
// 
// app.get('/sendEmail', (req: Request, res: Response, next: NextFunction) => {
// 
    // transporter.sendMail(mailOptions, (error, info) => {
        // if (error) return res.status(500).send({ error: error })
// 
        // console.log("🚀 ~ file: app.ts:80 ~ transporter.sendMail ~ info:", info)
// 
        // return res.status(200).send({ info: info });
    // });
// });
// 
// app.listen(port, () => console.log(`server is listening at port ${port}`));

import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import {  createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { config } from 'dotenv';
config();

const app: Application = express();

import { connectNodeDatabase } from "../src/Database/ConnectDatabase"

import router from './Routes/routes'
import bodyParser from 'body-parser';
import path from 'path'

app.use(bodyParser.json(),bodyParser.urlencoded({extended:false}))

app.set("views", path.join(__dirname, "public"))

app.set('views-engine', "ejs")

app.use(express.json()); //parse JSON request bodies, allowing you to access the properties sent in the request body through req.body.


app.use('/', router)

const port: number = Number(process.env.PORT);


connectNodeDatabase().then((response) => {

    console.log(response)
    const server: Server = app.listen(port, () => console.log(`server is running at port http://127.0.0.1:${port}`))

}).catch((error) => {
    console.log("🚀 ~ file: app.ts:102 ~ connectNodeDatabase ~ error:", error)
})
