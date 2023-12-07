const nodemailer = require("nodemailer")

const smtp = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,

    auth: {
        user: "cherrysocial@kullesoft.com",
        pass: "Kailly@2311"
    }
})

const initHTMLTrocaSenha = (dados) => {
    return `
    <div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="header" style="padding: 0 15px; width: 100%;flex-direction: row; align-items: center;">
    <img src="cid:logomarca" style="height: 50px; width: 50px" />
    </div>
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">Recuperação de senha</h3>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Você solicitou a recuperação da sua senha cadastrada em nossa plataforma.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;">Utilize o seguinte token para
            confirmar a alteração da sua senha:
        </p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 14pt; text-align: center; background: rgb(231, 231, 231);">${dados.token}</h4>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
        O token é válido por apenas 24 horas ou a primeira alteração!.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
    </div>
</div>   
    `
}

const initHTMLCadastro = (dados) => {
    return `<div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="header"
        style="padding: 0 15px; width: 100%;flex-direction: row; align-items: center;">
        <img src="cid:logomarca" style="height: 50px; width: 50px" />
    </div>
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">Boas Vindas!</h3>
        <p
            style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify; text-indent: 20px;">
            Primeiramente gostaríamos de desejar as boas vindas ao nosso site.
            Temos o objetivo de entregar uma ótima experiência com nossa plataforma e o mais importante,
            lhe proporcionar uma renda extra realizando tarefas simples e desafios épicos.</p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua confiança e
            preferência!</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Cherry Social</h4>
    </div>
    <div class="footer">

    </div>
</div>`
}
const initHTMLSaque = (dados) => {
    return `<div class="content" style="width: 600px; height: 500px;margin-top: 70px">
    <div class="header" style="padding: 0 15px; width: 100%;flex-direction: row; align-items: center;">
        <img src="../../public/images/logo_cherry.png" style="height: 50px; width: 50px" />
    </div>
    <div class="content-body" style="padding: 5px 20px 10px 20px;">
        <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
        <h3 style="font-family: Arial, Helvetica, sans-serif;">O seu saque foi solicitado!</h3>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Você solicitou um saque no valor de R$ ${dados.valor} em ${dados.data} e se encontra PENDENTE, aguardando para ser processado!
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;">Caso você não
            tenha efetuado a solicitação deste saque, altere a sua senha em nosso site e cancele o saque na aba
            Histórico de Saques.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
            Em caso de dúvidas, abra um chamado em nosso painel na aba de suporte.
        </p>
        <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
        <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
    </div>
</div>`
}
const initHTMLSaqueRecusado = (dados) => {
    return `
        <div class="content" style="width: 600px; height: 500px;margin-top: 70px">
        <div class="header" style="padding: 0 15px; width: 100%;flex-direction: row; align-items: center;">
            <img src="../../public/images/logo_cherry.png" style="height: 50px; width: 50px" />
        </div>
        <div class="content-body" style="padding: 5px 20px 10px 20px;">
            <h2 style="font-family: Arial, Helvetica, sans-serif;">Olá ${dados.usuario}, tudo bem?</h2>
            <h3 style="font-family: Arial, Helvetica, sans-serif;">O seu saque foi recusado!</h3>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Você solicitou um saque no valor de R$ ${dados.valor}. No entanto, nossa equipe recusou o mesmo pelo motivo a abaixo:
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; font-weight: 600;text-align: justify;">
                Foram encontradas divergências nos dados bancários fornecidos, sugerimos solicitar novamente o saque e conferir os dados fornecidos.
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt; text-align: justify;">
                Em caso de dúvidas, abra um chamado em nosso painel na aba de suporte e informe o número do saque: .
            </p>
            <p style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Agradecemos a sua compreensão</p>
            <h4 style="font-family: Arial, Helvetica, sans-serif;font-size: 11.5pt;">Atenciosamente, Cherry Social</h4>
        </div>
    </div>
    `
}
const renderHTML = (mode, dados) => {
    let html = ""
    switch (mode) {
        case "cadastro":
            html = initHTMLCadastro(dados)
            break;
        case "saque-solicitado":
            html = initHTMLSaque(dados)
            break;
        case "saque-recusado":
            html = initHTMLSaqueRecusado(dados)
            break;
        case "saque-pago":
            html = initHTMLSaqueRecusado(dados)
            break;
        case "token-troca-senha":
            html = initHTMLTrocaSenha(dados)
    }
    return html
}
const initConfig = (html, destinatario, titulo) => {
    return configEmail = {
        from: "cherrysocial@kullesoft.com",
        to: destinatario,
        subject: titulo,
        html: html,
        attachments: [{
            filename: 'logo_cherry.png',
            path: 'public/images/logo_cherry.png',
            cid: 'logomarca' //same cid value as in the html img src
        }]
    }
}


const enviarEmail = async (destinatario, titulo, mode, dados) => {
    const html = renderHTML(mode, dados)
    const config = initConfig(html, destinatario, titulo)
    const response = new Promise((resolve, reject) => {
        smtp.sendMail(config).then(res => {
            smtp.close()
            return resolve(res)
        }).catch(error => {
            smtp.close()
            return reject(error)
        })
    })
    return response
}

module.exports = enviarEmail
