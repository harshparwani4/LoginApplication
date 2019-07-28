import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Users from "./routes/Users";
import dotenv from 'dotenv';

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
app.use(express.static(path.join(__dirname, 'frontendBundle/build')));

const mongoURI = 'mongodb://hparwa:3121993@mongodb-2091-0.cloudclusters.net:10001/myusercollection?authSource=admin'

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use('/users', Users)

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
