const mongoose = require("mongoose");
const objetoSchema = {
    id_usuario_escrito: Number,
    id_usuario_recibido: Number,
    fecha: Date,
    mensaje: String


};
const Schema = mongoose.Schema(objetoSchema, { versionKey: false })
const comentariosa_usuarios = mongoose.model("comentarios_a_usuarios", Schema);



// para exportar

module.exports = comentariosa_usuarios;