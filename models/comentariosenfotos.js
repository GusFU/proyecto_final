const mongoose = require("mongoose");
const objetoSchema = {
    id_usuario_escrito: Number,
    id_foto: Number,
    fecha: Date,
    mensaje: String


};
const Schema = mongoose.Schema(objetoSchema, { versionKey: false })
const comentariosenfotos = mongoose.model("comentarios_de_fotos", Schema);



// para exportar

module.exports = comentariosenfotos;