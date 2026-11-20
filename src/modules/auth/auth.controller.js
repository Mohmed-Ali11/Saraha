import { Router } from "express";
import * as Service from "./auth.service.js"
import { middleware, utils } from "../../common/index.js";
import { tokenTypeEnum } from "../../common/enums/index.js";



export const authRouter = Router()


authRouter.post("/signup" ,async (req,res)=>{
    let data = await Service.signup(req.body)
    utils.response({res,data,message : "User Created Successfully",status : 201})
})

authRouter.post("/login" ,async (req,res)=>{
    let data = await Service.login(req.body)
    utils.response({res,data,message : "Found",status : 201})
})

authRouter.post("/rotate-token" , middleware.auth({tokenType : tokenTypeEnum.REFRESH}) , async (req,res)=>{
    let token = await Service.rotateToken(req.user , req.payload)
    utils.response({res,data : token ,message : "Token Rotated"})
})
