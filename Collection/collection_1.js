const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// ------------------------------------- Schema 
const Reg_Schema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        minLength: 2
    },
    age: {
        type: Number,
        minLength: 2,
        maxLength: 3,
        min: 15,
        max: 80,
        require: true
    },
    phone: {
        type: Number,
        minLength: 8,
        maxLength: 11,
        require: true
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female"],
    },
    email: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new alert("Plz Enter Your Correct Email");
            }
        }
    },
    pass: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 8
    },
    cpass: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 8
    }


});
//---------------------------------- Bcrypt For Password
Reg_Schema.pre("save", async function (next) {
    console.log("BCRYPT CONNETED SUCCESSFULLY");

    if (this.isModified("pass")) {
        this.pass = await bcrypt.hash(this.pass, 12);
        this.cpass = await bcrypt.hash(this.cpass, 12);
    }
    
    next();
})

Reg_Schema.pre("updateOne", async function (next) {
    console.log("BCRYPT UPDATE PASSWORD CONNECTED....");
    const update = this.getUpdate("pass");
    if (update.pass) {
        update.pass = await bcrypt.hash(update.pass, 12);
        update.cpass = await bcrypt.hash(update.cpass, 12);
    }
    delete update._id;
    next();
});


// Reg_Schema.pre("updateOne", async function (next) {
//     console.log("BCRYPT UPDATE PASSWORD CONNECTED....");
//     if (this.updateOne('pass')) {
//         this.pass = await bcrypt.hash(this.pass, 12);
//         this.cpass = await bcrypt.hash(this.cpass, 12);
//     }
//     next();
// })
// --------------------------------------- Export Module
const Collect1 = new mongoose.model("Reg_Data_1", Reg_Schema);
module.exports = Collect1;