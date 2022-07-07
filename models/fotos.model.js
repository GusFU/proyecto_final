const mongoose = require("mongoose");
const objetofotoSchema = {
    foto: String,
    id_usuario: Number,
    fecha: Date
    
};
const userSchema = mongoose.Schema(objetofotoSchema, { versionKey: false })
const Fotos = mongoose.model("Fotos", userSchema);
module.exports = Fotos