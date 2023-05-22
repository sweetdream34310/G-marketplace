const express = require('express');

const path = require('path');
require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
// const path = require('path');
const mongo = require("./utils/mongo")
const Routes = require("./routes/index");
const SocketServer = require('./socket')
// const cors = require("cors");
const { PORT } = require("./constants");

app.use(express.static(path.join(__dirname, '/frontend-build')));
app.use("/api", Routes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "frontend-build", "index.html"));
});
// app.use(cors());
mongo.connect();

var http = require("http").createServer(app);
let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});

SocketServer(http);



