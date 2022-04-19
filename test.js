const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

let pass = "abcd";
let saltRounds = 10;


 bcrypt.hash(pass, saltRounds, function(err, hash) {
        console.log(hash);
    });
// console.log(password);