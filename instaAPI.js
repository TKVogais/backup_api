const Instagram = require('instagram-web-api')

const client = new Instagram({ username: "Carlabg4", password: "Marcos@1050" })

client
    .login()
    .then(() => {
        client
            .getProfile()
            .then(console.log)
    })