require("dotenv").config

const {verifyToken} = require('../utils/jwt');


module.exports = async (req, res, next) => {

  if (!req.headers.authorization)
    return res.json({message: "Token is not provided! Please login "});

  const bearerToken = req.headers.authorization
  if (!bearerToken)
  return res.json({message: "Token is not provided! Please login "});

  const token = bearerToken.split(" ")[1]

  let user
  try {
    user = await verifyToken(token);
  } catch (error) {
    return res.status(401).send({ message: "token is not valid" })
  }
  req.user = user.user

  next()
}