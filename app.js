// Configuration  
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = dotenv.parsed.PORT
const bodyParser = require('body-parser')
const session = require("express-session");
const secret = process.env.SESSION_SECRET;
const store = new session.MemoryStore();
const cors = require('cors')


app.use(cors({
  origin: "*", 
  credentials: "*",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}))

// List Router
const UserRouter = require('./routers/UserRouter')
const SellerRouter = require('./routers/SellerRouter')
const ProductRouter = require('./routers/ProductRouter')
const PaymentRouter = require('./routers/PaymentRouter')

// QRCODE
app.use("/qrcode", express.static('assets'))

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
app.use("/seller", SellerRouter)
app.use("/product", ProductRouter)
app.use("/payment", PaymentRouter )



// Port Server Running  
app.listen(port, () => {
  console.log(`pesanmakan app listening on port ${port}`)
})

module.exports = app