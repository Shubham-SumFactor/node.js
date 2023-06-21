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
import * as url from "url";
import * as fs from 'fs';
import * as path from 'path' // Path-Module
import { createServer, IncomingMessage, ServerResponse } from "http";
const port = 8080;
const server = createServer((request, response ) => {
    // console.log("🚀 ~ file: app.ts:60 ~ server ~ request:", request)
// 
if (request.url == "/name") {
    if (request.method === "GET") {
        // response.end("hello world");
        // Create files:-
        fs.open('myFile.txt', 'w', function (err, file) {
            if (err)
                throw err;
            console.log('File open');
        });
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
}}});
server.listen(port, () => console.log(`server is listening at port ${port}`));