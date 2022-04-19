const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const newToken = (user) => {
    return jwt.sign({ user: user }, "secretjwtkey", { expiresIn: 60 * 60 })
  }
  
  const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, "secretjwtkey", function (err, decoded) {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  }

  module.exports= {newToken, verifyToken};

//   Invalid login: 535-5.7.8 Username and Password not accepted. Learn more at
// 535 5.7.8  https://support.google.com/mail/?p=BadCredentials r205-20020acadad6000000b002ef824213c9sm3777280oig.55 - gsmtp