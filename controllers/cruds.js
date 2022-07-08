const mongoose = require("mongoose");
const mysql = require('mysql');
const Me_gusta_foto = require('../models/me_gusta.model');
const Fotos = require('../models/fotos.model')
const comentarios = require('../models/comentarios_recibidos.model')
const user = require("./user.controllers2");



const cruds = {

    login: async (req, res) => {

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });
        const email = req.body.email
        const contrasena = await user.SHA1(req.body.contrasena)

        let query = `SELECT * from logins WHERE email = "${email}" AND contrasena = "${contrasena}"`;
        connection.query(query, async (err, rows) => {
            if (err) throw err;
            if (await rows.length == 0) {
                res.json({ loginOk: 0 })
            } else {
                console.log(rows)
                var token = user.autenticacion(rows.email)

                res.json({ loginOk: 1, token,usuario: rows.id })
            }

            connection.end();
        });
    },
    saveDataForm: async (req, res) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });
        const nombre = req.body.nombre
        const apellido1 = req.body.apellido1
        const apellido2 = req.body.apellido2
        const cumpleanos = req.body.cumpleanos
        const alias = req.body.alias


        const email = req.body.email
        const contrasena = await user.SHA1(req.body.contrasena)
        const pais = req.body.pais
        const estado_civil = req.body.estado_civil

        let query = `SELECT * from Logins WHERE email = "${email}"`;
        connection.query(query, async (err, rows) => {
            if (err) throw err;




            if (rows.length == 0) {


                const sql = `INSERT INTO Usuarios  VALUES (null,"${nombre}","${apellido1}","${apellido2}","${cumpleanos}","${alias}",null,null,null,null,null)`;
                connection.query(sql, (err) => {
                    if (err) throw err;


                });
                const sql1 = `INSERT INTO Logins  VALUES (null,"${email}","${contrasena}")`;
                connection.query(sql1, (err) => {
                    if (err) throw err;

                });
                const sql2 = `INSERT INTO Paises  VALUES (null,"${pais}")`;
                connection.query(sql2, (err) => {
                    if (err) throw err;

                });
                const sql3 = `INSERT INTO Estados_civiles  VALUES (null,"${estado_civil}")`;
                connection.query(sql3, (err) => {
                    if (err) throw err;
                    connection.end();

                });
                res.json({ registro: true })

            } else {
                res.json({ registro: false })
            }
        });
    },
    mejores10Fotos: async (req, res) => {
        
        var las10_fotos = []
        var cada_comentario = []
        // let userJson = {
        //     _id: new mongoose.Types.ObjectId(),
        //     id_usuario: 3,
        //     id_foto: "url",
        //     me_gusta: 300,
        //     no_me_gusta: 100
        // };
        var los_me_gusta_fotos = await Me_gusta_foto.find({})
        var los10_mas_me_gusta = user.mejores_fotos2(los_me_gusta_fotos)

       
        for await (let id of los10_mas_me_gusta) {
            
            var id10_mas_me_gusta = await Fotos.findOne({ id_foto: id })
            
            las10_fotos.push(id10_mas_me_gusta.foto)
        }
        
        var comentarios_recibidos = await comentarios.find({ id_usuario_recibido: 2 })//cuando haga login de algun modo hay que conseguir 
        //la id de usuario

        for (i = 0; i < comentarios_recibidos.length; i++) {
            cada_comentario[i] = comentarios_recibidos[i].mensaje
        }


        //         for await (let coment of comentarios_recibidos) {
        // console.log(coment.comentario)
        //             cada_comentario.push(coment)// ****************************************oooojjjoooooo*****************************
        //         }


        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });

        var nombres_comentarios = []
        for await (let id of comentarios_recibidos) {
            let query = `SELECT nombre from Usuarios WHERE id=${id.id_usuario_escrito}`;
            connection.query(query, async (err, rows) => {
                if (err) throw err;
                nombres_comentarios.push(rows[0])
                if (nombres_comentarios.length == comentarios_recibidos.length) {



                    res.json({las10_fotos, comentarios:{cada_comentario,nombres_comentarios} })//{las10_fotos:las10_fotos,comentarios_recibidos:comentarios_recibidos}
                    connection.end();
                }
            });
        }


        








    }
}



module.exports = cruds;