// add this file to .gitignore

module.exports = {
    google: {
        clientID: "115574154375-j9fa3rb1ih6p84kunpupihc136lo2iv8.apps.googleusercontent.com",
        clientSecret: "4wbhQ0IjHO7ZUYL_dHl4UVlp"
    },
    facebook: {
        clientID: "547185282385141",
        clientSecret: "813d724ce4ad0d85b2cddbd1d030e592",
        callbackURLHost: "/users/facebook/redirect",
        callbackURLLocal: "https://localhost:3000/users/facebook/redirect",
        profileFields: ['id','name','picture.type(large)','email']
    },
    github: {
        clientID: "35c0b0a129013a3325e9",
        clientSecret: "98f8b29e1017573308ad90645b5fccd7f009ff95",
        callbackURLHost: "/users/github/callback",
        callbackURLLocal: "https://localhost:3000/users/github/callback",
        profileFields: ['id','name','picture.type(large)','email']
    }
}