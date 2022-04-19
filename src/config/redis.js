const redis = require("redis")

const client = redis.createClient()

client.on("connect", (error) => {
  if(error) console.console(error.message)
  console.log("connected!")
})

module.exports = client