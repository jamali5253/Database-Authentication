// ---------------------------------- Requiring Mongoose and dotenv
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//------------------------------------- Env path
dotenv.config({ path: "../config.env" });
const DATABASE = process.env.DATABASE;
//----------------------------------------- Conneting To Mongo Db Atlas
mongoose.set("strictQuery", true);
mongoose.connect(DATABASE)
    .then(() => console.log("ATLAS DATABASE CONNECTED SUCESSFULLY .....")).catch(() => console.log("SORRY NOT CONNECTED TO DATABASE"));
