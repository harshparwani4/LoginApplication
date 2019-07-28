import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Users from "./routes/Users";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();
let app = express();
let port = process.env.PORT || 5000;


app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(express.static(path.join(__dirname, 'frontendBundle')));
const directoryPath = path.join(__dirname, './');
const directoryPath1 = path.join(__dirname, 'frontendBundle');
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
    });
});
fs.readdir(directoryPath1, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontendBundle/dist/index.html'));
  });

const mongoURI = 'mongodb://hparwa:3121993@mongodb-2091-0.cloudclusters.net:10001/myusercollection?authSource=admin'

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use('/users', Users)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
