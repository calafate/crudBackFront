const mongoose = require("mongoose");
require("dotenv").config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Base CONECTADA")
    } catch {
        console.log("Problemas al conectarse con la Base de Datos")
    }
}

module.exports = {connect}