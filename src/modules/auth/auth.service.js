
import { ex } from "../../common/utils/index.js";
import { models } from "../../database/index.js";
import * as sec from "../../security/index.js";
import { DB_CONFIG } from "../../config/config.service.js";
import { encryption } from "../../security/encryption.js";
import { utils } from "../../common/index.js";
import { roleEnum } from "../../common/enums/index.js";


export const signup = async (data)=>{
    // console.log(data)
    let exist = await models.userModel.findOne({email : data.email})
    if(exist) ex.ConflictException("Email Already Exist")
    // console.log(encryption(data.email)) // if you want to encrypt any data like user email
    data.password = await sec.myHash({plainText :data.password})
    return await models.userModel.create(data)
}


export const login = async ({email , password})=>{
    let user = await models.userModel.findOne({email : email })
    if(!user) ex.BadRequistException("User Not Found")
    let matchPassword = await sec.myCompare({plainText : password , encrypted : user.password})
    if(!matchPassword) ex.NotFoundException("User Not Found")
    // let token = jwt.sign({sub : user.id},DB_CONFIG.JWT_SECRET)


    let token = await sec.createTokens({
        option : {subject : user.id , issuer : "Mohamed _Ali" , audience : user.role === roleEnum.admin ? "admin" : "user"},
        role : user.role
    })
    return token
}

export const rotateToken = (user , payload)=>{
    let accessIat = payload.iat *1000
    let accessExpIn = DB_CONFIG.JWT_EXP_ACCESS *1000
    let accessExpAt = accessIat + accessExpIn
    let currentTime = Date.now()
    if(currentTime < accessExpAt ){
        utils.ex.ConflictException("Access Token is still active")
    }

    // console.log(roleEnum.admin)
    // console.log("role" , user.role)

    return sec.createTokens({
        option : {subject : user.id , issuer : "Mohamed _Ali" , audience : user.role === roleEnum.admin ? "admin" : "user"},
        role : user.role
    })
}