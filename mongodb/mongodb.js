const user = require("../controllers/user.controllers");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mydb = "facegus";
const col_fotos = "Fotos";
const col_me_gusta_fotos = "Me_gusta_fotos"

const url = "mongodb://localhost:27017/";

const mongodb = {

    mejores_fotos: async (req, res) => {
       
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(mydb);
            dbo.collection(col_me_gusta_fotos).find({}).toArray(async function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    return "No hay me gustas"
                    db.close()

                } else {
                     
                    var fotos = user.mejores_fotos(result)
                    console.log(fotos)
                    return  fotos
                    db.close();
                }
            })
        });

        
    }
}



module.exports = mongodb;