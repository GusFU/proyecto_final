const mysql = require('mysql');
const user = require("../controllers/user.controllers");
const mongodb = require("../mongodb/mongodb");


const crudsql = {

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
                res.send("email o contraseña incorectos")
            } else {
                res.send(rows)
             //   var fotos1 = await mongodb.mejores_fotos()
              //  console.log("aqui: "+fotos1)
              //  res.send(fotos1)
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
        const foto_perfil = req.body.foto_perfil
        const comentario_perfil = req.body.comentario_perfil
        const email = req.body.email
        const contrasena = await user.SHA1(req.body.contrasena)
        const pais = req.body.pais
        const estado_civil = req.body.estado_civil

        let query = `SELECT * from Logins WHERE email = "${email}"`;
        connection.query(query, async (err, rows) => {
            if (err) throw err;




            if (rows.length == 0) {


                const sql = `INSERT INTO Usuarios  VALUES (null,"${nombre}","${apellido1}","${apellido2}","${cumpleanos}","${alias}","${foto_perfil}","${comentario_perfil}",null,null,null)`;
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
                res.send("registro correcto")

            } else {
                res.send("Usuario ya existe")
            }
        });
    }

}

module.exports = crudsql;