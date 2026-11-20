import { models } from "../../database/index.js";
import { verifyToken } from "../../security/jwt.js";
import { tokenTypeEnum } from "../enums/index.js";
import { BadRequistException } from "../utils/exception.js";

export const auth = ({tokenType = tokenTypeEnum.ACCESS })=>{
    return async (req,res,next)=>{
    let token = req.headers.authorization
    if(!token){
        BadRequistException("Token Not Provided")
    }
    let payload = await verifyToken({
        token,
        tokenType,
    })
    req.user =await models.userModel.findById(payload.sub)
    
    req.payload = payload
    // console.log(req.payload)
    next()
    }
}