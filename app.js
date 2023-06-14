// Configuration  
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = dotenv.parsed.PORT
const bodyParser = require('body-parser')
const session = require("express-session");
const secret = process.env.SESSION_SECRET;
const store = new session.MemoryStore();



// List Router
const UserRouter = require('./routers/UserRouter')

// Json Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// App Session
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true, 
    store,
  })
)

// App Router
app.use("/", UserRouter)




// Port Server Running  
app.listen(port, () => {
  console.log(`pesanmakan app listening on port ${port}`)
})

module.exports = app