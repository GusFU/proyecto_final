const mongoose = require("mongoose");
const objetoSchema={
    id_usuario: Number,
    id_foto: String,
    me_gusta: Number,
    no_me_gusta: Number

};
const me_gustaSchema = mongoose.Schema(objetoSchema, { versionKey: false })
const Me_gusta_foto = mongoose.model("me_gusta_fotos", me_gustaSchema);



// para exportar

module.exports = Me_gusta_foto;