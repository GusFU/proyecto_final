const nodemailer = require("nodemailer")
const sendMail = (from,to, subject, html) =>{

     

      const transporter = nodemailer.createTransport({
        service:  "gmail",
        auth : {
            user : "gustavokakoka7@gmail.com",
            pass : "rgyjbfvzqccmmylu"
        }
    })

    const options = {
        from, 
        to ,
        subject,    
        html
    }

    transporter.sendMail(options, (error, info) =>{
        if(error) console.log(error)
        
    })  

}

 

module.exports =sendMail