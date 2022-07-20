const mongoose = require("mongoose");
const objetofotoSchema = {
    foto: String,
    id_usuario: String,
    fecha: Date,
    id_foto: String
    
};
const userSchema = mongoose.Schema(objetofotoSchema, { versionKey: false })
const Fotos = mongoose.model("fotos", userSchema);
module.exports = Fotos