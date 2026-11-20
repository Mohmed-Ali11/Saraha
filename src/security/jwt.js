import jwt from "jsonwebtoken"
import { DB_CONFIG } from "../config/config.service.js"
import { tokenTypeEnum , roleEnum } from "../common/enums/index.js"
import { BadRequistException } from "../common/utils/exception.js"




export const createTokens = async ({ payload = {}, option = {} , role}) => {  // بتعملي التوكن باستخدام ال createToken بس علي حسب ال role بتؤوح تعمل سيكريت من getRoleSecret و تعمل بيه التوكن ده 
    // console.log("secrets from create tokens", DB_CONFIG.JWT_REFRESH_SECRET, DB_CONFIG.JWT_ACCESS_SECRET)
    let secrets = getRoleSecret({role})
    
    // console.log("role",role)
    // console.log("options" , option)
    const accessToken = await createToken({
        payload,
        secret: secrets.access,
        option: {
            expiresIn: DB_CONFIG.JWT_EXP_ACCESS,
            ...option
        }
    })

    const refreshToken = await createToken({
        payload,
        secret: secrets.refresh,
        option: {
            expiresIn: DB_CONFIG.JWT_EXP_REFRESH,
            ...option
        }
    })

    // console.log({"re" : secrets.refresh , "ac" : secrets.access})

    return {
        accessToken,
        refreshToken
    }
}

const getRoleSecret = ({role = roleEnum.user})=>{ // علي حسب ال role بروح اعمل النوعين بتوع السيكرتس بتوعي و ده اللي بستخدمه فوق ونا بعمل توكن 
    let secrets 
    switch(role){
        case roleEnum.admin :
            secrets = {
                access : DB_CONFIG.JWT_ACCESS_SECRET_ADMIN,
                refresh : DB_CONFIG.JWT_REFRESH_SECRET_ADMIN
            }
        break
        case roleEnum.user : 
        secrets = {
            access : DB_CONFIG.JWT_ACCESS_SECRET_USER,
            refresh : DB_CONFIG.JWT_REFRESH_SECRET_USER
        }
        break
    }
    // console.log({"re" : secrets.refresh , "ac" : secrets.access})
    return secrets;
}

const getSecret =async ({tokenType = tokenTypeEnum.ACCESS , role = roleEnum.user})=>{  // بتاخد التوكن تايب و الرول عشان تنادي علي الفنكشن اللي فوق و تبعتلها الرول و تجيب منها السيكريت و ترجعه علي حسب النوع بتاع التوكن اكسيس ولا ريفريش
    let secrets = getRoleSecret({role})
    // console.log({"re" : secrets.refresh , "ac" : secrets.access})
    return tokenType==tokenTypeEnum.ACCESS? secrets.access : secrets.refresh  
}

export const createToken = async ({ payload = {}, option = {}, secret }) => { // بتعملي التوكين بتاعي ملهاش دعوه بالنوع 
    // console.log("secrets from create", secret)
    return jwt.sign(payload, secret, option)
}



export const verifyToken = async ({ token, tokenType = tokenTypeEnum.ACCESS }) => {
    // decode من غير verify، بس عشان نقرا الـ aud ونعرف الـ role قبل ما نختار الـ secret
    let decoded = jwt.decode(token)
    if(!decoded) BadRequistException("Invalid Token")

    let role = decoded.aud === "admin" ? roleEnum.admin : roleEnum.user

    let secret = await getSecret({tokenType, role})
    return jwt.verify(token, secret)
}