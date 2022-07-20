const mongoose = require("mongoose");
const mysql = require('mysql');
const Me_gusta_foto = require('../models/me_gusta.model');
const Fotos = require('../models/fotos.model')
const comentarios = require('../models/comentarios_recibidos.model')
const user = require("./user.controllers2");
const comentariosenfotos = require("../models/comentariosenfotos");
const jwt = require("jsonwebtoken");
const SECRET = "tallerjwt";
const sendMail = require("../email");
const multer = require('multer')({
    dest: 'public/images'
})


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



                res.json({ loginOk: 1, usuario: rows[0].id })
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
        var todo = []
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

        var comentarios_recibidos = await comentarios.find({ id_usuario_recibido: req.body.usuario })//cuando haga login de algun modo hay que conseguir 
        //la id de usuario
        var fotosMuro = await Fotos.find({ id_usuario: req.body.usuario })

        for (i = 0; i < comentarios_recibidos.length; i++) {
            cada_comentario[i] = comentarios_recibidos[i].mensaje
        }





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
                    for (let i = 0; i < cada_comentario.length; i++) {
                        todo[i] = { nombre: nombres_comentarios[i], comentario: cada_comentario[i] }
                    }
                    todo.reverse()


                    let query1 = `SELECT * from Usuarios_usuarios WHERE (fk_id_usuario = ${req.body.usuario} or fk_id_amigo = ${req.body.usuario})`;
                    connection.query(query1, async (err, rows1) => {
                        if (err) throw err;
                        if (rows1.length == 0) {
                            connection.end();
                            res.json({ amigos: 0, las10_fotos, todo, fotosMuro })

                        } else {
                            col_amigos = await rows1

                            var id_amigos = []
                            for (let i = 0; i < col_amigos.length; i++) {

                                if (col_amigos[i].fk_id_usuario == req.body.usuario) {
                                    id_amigos.push(col_amigos[i].fk_id_amigo)
                                }
                                if (col_amigos[i].fk_id_amigo == req.body.usuario) {
                                    id_amigos.push(col_amigos[i].fk_id_usuario)
                                }
                            }
                            var todoamigos = [];
                            for await (let id3 of id_amigos) {
                                
                                let query2 = `SELECT * from Usuarios WHERE (id = ${id3})`;
                                connection.query(query2, async (err, rows2) => {
                                    if (err) throw err;
                                    todoamigos.push(rows2)

                                    if(id_amigos[id_amigos.length-1]==id3){
                                    connection.end()
                                    res.json({ amigos: todoamigos[0], las10_fotos, todo, fotosMuro, })
                                }
                                });
                            }
                        }





                        //{las10_fotos:las10_fotos,comentarios_recibidos:comentarios_recibidos}

                    });
                }
            });
        }
    },
    subirComentario: async (req, res) => {
        let comentario = req.body.subircomentario
        let usuario1 = req.body.usuarioescrito
        let usuario2 = req.body.usuariorecibido
        let fecha = new Date()
        var fecha1 = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
        let userJson = {
            fecha: fecha1,
            id_usuario_escrito: usuario1,
            id_usuario_recibido: usuario2,
            mensaje: comentario
        };
        let subir1comentario = new comentarios(userJson)

        subir1comentario.save(function (err, subir1comentario) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(subir1comentario);
        })

    },
    comentFotos: async (req, res) => {
        var id = parseInt(req.body.id_foto);

        var coment_fotos = await comentariosenfotos.find({ id_foto: id })
        if (coment_fotos.length == 0) {
            res.json({ comentariosf: 0 })
        } else {

            res.json({ comentariosf: coment_fotos })
        }
    },
    subircomentfotos: async (req, res) => {

        let idfoto = req.body.id_foto
        let comentario = req.body.comentario
        let fecha = new Date()
        var fecha1 = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
        let userJson1 = {
            id_usuario_escrito: req.body.usuario,
            id_foto: req.body.id_foto,
            fecha: fecha1,
            mensaje: comentario
        };
        let subir1comentarioenfoto = new comentariosenfotos(userJson1)
        subir1comentarioenfoto.save(function (err, subir1comentarioenfoto) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(subir1comentarioenfoto);
        })

    },
    subirFoto: async (req, res) => {

        var fotosMuro = await Fotos.find({})
        var id_foto1 = fotosMuro.length + 1



        let fecha = new Date()
        var fecha1 = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate();
        let userJson1 = {
            foto: req.body.image,
            fecha: fecha1,
            id_usuario: req.body.usuario,
            id_foto: id_foto1
        };

        let subir1foto = new Fotos(userJson1)

        subir1foto.save(function (err, subir1foto) {
            if (err) return res.send(500, err.message);

        })

        let userJson2 = {
            id_usuario: req.body.usuario,
            id_foto: id_foto1,
            me_gusta: 0,
            no_me_gusta: 0
        };

        let megusta = new Me_gusta_foto(userJson2)
        megusta.save(function (err, megusta) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(megusta);
        })






    },
    megusta: async (req, res) => {
        var me_gustasinfo = await Me_gusta_foto.findOne({ id_foto: req.body.id })
        var me_gusta = me_gustasinfo.me_gusta + 1
        await Me_gusta_foto.updateOne({ id_foto: req.body.id }, {
            me_gusta: me_gusta
        });
    },
    nomegusta: async (req, res) => {
        var me_gustasinfo = await Me_gusta_foto.findOne({ id_foto: req.body.id })
        var no_me_gusta = me_gustasinfo.no_me_gusta + 1
        await Me_gusta_foto.updateOne({ id_foto: req.body.id }, {
            no_me_gusta: no_me_gusta
        });
    },
    buscaramigo: async (req, res) => {
        var email = req.body.amigo
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });
        let query = `SELECT * from Logins WHERE email = "${email}"`;
        connection.query(query, async (err, rows) => {
            if (err) throw err;
            if (await rows.length == 0) {
                connection.end
                res.json({ amigo: 0 })
            } else {

                let query = `SELECT * from Usuarios WHERE id = "${rows[0].id}"`;
                connection.query(query, async (err, rows1) => {
                    if (err) throw err;


                    connection.end

                    res.json({ amigo: 1, infoamigo: rows1[0] })
                });
            }







        });
    },
    haceramigo: async (req, res) => {

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });
        let query = `SELECT * from Usuarios_usuarios WHERE (fk_id_usuario = ${req.body.usuario} and fk_id_amigo = ${req.body.infoamigo.id})`;
        connection.query(query, async (err, rows1) => {
            if (err) throw err;
            if (rows1.length > 0) {
                res.json({ ok: 2 })
            } else {
                const sql = `INSERT INTO Usuarios_usuarios  VALUES (null,"${req.body.usuario}","${req.body.infoamigo.id}")`;
                connection.query(sql, (err) => {
                    if (err) throw err;

                    connection.end()
                    res.json({ ok: 1 })
                });
            }
        });

    },
    compararmail: async (email) => {

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });


        let query = `SELECT email from logins WHERE email = "${email}" `;
        connection.query(query, async (err, rows) => {
            if (err) throw err;
            if (await rows.length == 0) {
                connection.end();
                return 0
            } else {
                connection.end();
                return 1

            }


        });

    },
    checkUserPost: (req, res) => {
        const { email, contrasena, token } = req.body;
        var contrasena1 = user.SHA1(contrasena)
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'Facegus'
        });
        let query = `SELECT * from Logins WHERE email = '${email}' `;
        connection.query(query, async (err, rows1) => {
            if (err) throw err;
            if (rows1[0].email == email) {

                const check = jwt.verify(token, SECRET);
                let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                let query1 = mysql.format(updateQuery, ["Logins", "contrasena", `${contrasena1}`, "id", `${rows1[0].id}`]);
                connection.query(query1, (err, res1) => {
                    if (err) throw err;
                    connection.end();
                    sendMail("gustavokakoka7@gmail.com", `${email}`, "Cambio de contraseña", "tu contraseña se ha cambiado")
                    res.json({
                        message: "Contraseña cambiada cierra la ventana y haz login"
                    });
                })
            }
        });
    },

}



module.exports = cruds;