const express = require("express");
const bodyParser = require("body-parser");
const mailer = require('nodemailer');
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const config = mailer.createTransport ({
    host: "smtp.umbler.com",
    port: 587,    
    auth: {     // Conta e senha de email remetente do dominio
        user: process.env.SMTP_USER, // Definidos em variável de ambiente por segurança
        pass: process.env.SMTP_PASS
    },
    tls: { rejectUnauthorized: false } // true para 465, falso para outras portas
});

app.get("/", (req, res) => 
    res.sendFile(`${__dirname}/contact.html`)); // Recebe dados do formulário

app.post("/send", (req, res) => {    
    var name = req.body.name; // Nome do cliente vindo do formulário
    var email = req.body.email; // Email do cliente 
    var emailContact = req.body.emailBody; // Conteúdo da mensagem
    
    var emailMessage = `Olá ${name},\n\nObrigada por nos contatar.\n\nSeu e-mail é: ${email}\n\nSua mensagem é: ${emailContact}\n`;

    const message = {
        from: process.env.SMTP_USER, // Conta remetente
        to: email, // Conta destinataria de envio do cliente
        replyTo: "meuemail@meudominio.com", // Notifica preenchimento formulario (opcional)
        subject: "Contato via formulário",
        text: emailMessage // Confirmação padrão de envio
    };

    config.sendMail(message, (error, info) => {
        if(error)
            return res.status(400).send(error);
        return res.status(200).end(info);
    });
});

app.listen(process.env.PORT || 3000 , () => {
    console.log("Server ouvindo na porta 3000!")
});