const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:8000/TechDB";
const cors = require("cors");


mongoose.Types.ObjectId.isValid('63eea7a71ff123d57a444ad2');
function corsOptions(){
  origin = "http://127.0.0.1:9000/Tech"
}

const app = express();
mongoose.set("strictQuery", true);
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors(corsOptions));  

const techRouter = require("./routers/Tech");
app.use("/Tech", techRouter);

app.listen(9000, () => {
  console.log("server started");
});
