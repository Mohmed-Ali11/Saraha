import { utils } from "../index.js"

export const authorization = (acceptedRole = [])=>{
    return (req,res,next)=>{
        let role = req.user.role
        if(!acceptedRole.includes(role)){
            utils.ex.UnAuthorizedException("UnAuthorized")
        }
        next()
    }
}