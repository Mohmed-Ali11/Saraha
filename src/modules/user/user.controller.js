import { Router } from "express";
import * as Service from "./user.service.js"
import { middleware, utils } from "../../common/index.js";
import { roleEnum, tokenTypeEnum } from "../../common/enums/index.js";



export const userRouter = Router()


userRouter.post("/profile" , middleware.auth({tokenType : tokenTypeEnum.ACCESS}) ,async (req,res)=>{
    let user = req.user
    // console.log(req.user)
    if(!user) utils.ex.BadRequistException("User Not Found")
    utils.response({res,data : req.user ,message : "found",status : 201})
})

userRouter.post("/admin-profile" , middleware.auth({tokenType : tokenTypeEnum.ACCESS}) , 
    middleware.authorization([roleEnum.admin]) ,async (req,res)=>{
        let user = req.user
        // console.log(req.user)
        if(!user) utils.ex.BadRequistException("User Not Found")
        utils.response({res,data : req.user ,message : "found",status : 201})
})



