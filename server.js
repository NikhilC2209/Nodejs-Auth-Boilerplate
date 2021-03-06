const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

mongoose.connect(process.env.Database_Url, { useNewUrlParser: true })
const db = mongoose.connection
db.once("open", () => {
    console.log("Connected");   
})
db.on("error", (error) => {
    console.log(error);
})

app.set("view-engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const authRoute = require("./routes/auth");
const loginRoute = require("./routes/login");
const privateRoute = require("./routes/private");
app.use("/auth", authRoute);
app.use("/login", loginRoute);
app.use("/private", privateRoute);

app.get("/", (req, res) => {
    res.render("index.ejs");    
})

app.listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
})


