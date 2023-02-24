const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
},
    {
        timestamp: true
    }
);

userSchema.statics.encryptPass = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}
userSchema.statics.comparePass = (pass, receivedPass) => {
    return bcrypt.compareSync(pass, receivedPass)
}


module.exports = mongoose.model("User", userSchema);