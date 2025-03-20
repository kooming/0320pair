const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const router = require("./router/board.router");

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/public",express.static(path.join(__dirname,"upload")))
app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"page"))

app.use(router);

app.listen(3000, ()=> {
    console.log("server on~");
})

