
const fs = require("fs");
const crudsql = require("../sql/sql");

const user = {
    home: (req,res)=>{

        res.render("index");

    },
     registro: (req,res)=>{

        res.render("registro");

    },
    login: (emailLogin, contrasenaLogin, rows)=> {
        let cont = 0;
        let test = true;
        let encontrado = false;
        let cont1;
        let contrasena = SHA1(contrasenaLogin)
    
        while (test) {//mientras test sea verdadero se hará todo lo que hay dentro.
            test = test && (cont < rows.length-1) && ((emailLogin != rows[cont].email) || (contrasena != rows[cont].contrasena))
            if ((emailLogin == rows[cont].email) && (contrasena == rows[cont].contrasena)) {
                encontrado = true
                cont1 = cont
            }
            cont++
    
        }
    
        return { "encontrado": encontrado, "id":rows[cont].id }
    },
    registrarse: (email, rows)=> {
        let cont1 = 0;
        let test = true;
        while (test) {
    
            if (email == rows[cont1].email) {
    
                return cont1
            } else {
    
                cont1++
            }
            test = test && (email != rows[cont1].email) && cont1 < rows.length
        }
    
    }

}






module.exports = user;
