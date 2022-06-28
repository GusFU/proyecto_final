const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Facegus'
});


const crudsql = {

    search: (tabla) => {

        let query = `SELECT * from ${tabla}`;
        connection.query(query, async (err, rows) => {
            if (err) throw err;
            return await rows
            connection.end();
        });
    },
    saveDataForm: async (req,res) => {
        const nombre = req.body.nombre
        const apellido1=req.body.apellido1
        const apellido2=req.body.apellido2
        const cumpleanos=req.body.cumpleanos
        const alias=req.body.alias
        const foto_perfil=req.body.foto_perfil
        const comentario_perfil=req.body.comentario_perfil

        const sql = `INSERT INTO Usuarios  VALUES (null,"${nombre}","${apellido1}","${apellido2}","${cumpleanos}","${alias}","${foto_perfil}","${comentario_perfil}",null,null,null)`;
        connection.query(sql, (err, response, fields) => {
            if (err) throw err;
            res.send("ok")
            connection.end();
          });
    }

}

module.exports = crudsql;