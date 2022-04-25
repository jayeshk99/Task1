require("dotenv").config

const {verifyToken} = require('../utils/jwt');


module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
    return res.json({message: "Token is not provided! Please login "});

  const bearerToken = req?.headers?.authorization
  if (!bearerToken)
  return res.json({message: "Token is not provided! Please login "});

  const token = bearerToken.split(" ")[1]


    let user = await verifyToken(token);
    if(!user) return res.json({message: "Unable to fetch user from token"})
    req.user = user.user

    next()
  } catch (error) {
    return res.status(401).send({ message: "token is not valid" })
  }

}