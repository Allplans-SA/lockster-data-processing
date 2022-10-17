const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

var cors = require("cors");
app.use(cors());
//middlewares
app.use(express.static("public"));
app.use(express.json()); // JSON Body Parser

// routes
app.get("/", (req, res) => res.send("Hey, API is working!!"));
app.use("/webhookHandler", require("./routes/MainApiRoutes"));

const server = app.listen(PORT, () => console.log("APP is running"));
