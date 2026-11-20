import express from "express"
import { DB_CONFIG } from "./config/config.service.js"
import { DB_CONNECT } from "./database/index.js"
import { errorHandeller } from "./common/middleware/errorhandler.js"
const app = express()
app.use(express.json())
import * as Router from "./modules/index.js"

await DB_CONNECT()

app.get("/" , (req,res)=>{
    console.log("I'm Good")
    res.status(200).json({
        message : "i'm good"
    })
}) 

// let key = crypto.randomBytes(32).toString("hex")
// console.log(key)

app.use("/auth" , Router.authRouter)
app.use("/user" , Router.userRouter)











app.use(errorHandeller)
app.listen(DB_CONFIG.PORT , ()=>{
    console.log("Server Listen On PORT ",DB_CONFIG.PORT)
})