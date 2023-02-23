//--------------------------- Package Import Section 
const express = require('express');
const app = express();
const path = require('path');
//------------------------------- Env Section
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Portnum = process.env.PORT
//-------------------------------
app.set('views', path.join(__dirname, "../Templates/views"));
app.set("view engine", "hbs");
//-------------------------------- Router Section 
app.use(require("../Routers/auth0"));
//---------------------------------- Port Section 
app.listen(Portnum, (() => console.log(`Port ${Portnum} Connected Successfully`)));
