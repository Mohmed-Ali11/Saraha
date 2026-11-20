import { hash , compare } from "bcrypt";
import { DB_CONFIG } from "../config/config.service.js";
import { enums } from "../common/index.js";
import argon2 from "argon2"



export const myHash = async ({plainText , lib = enums.hashEnum.pycrpt})=>{
    // console.log("data:", plainText);
    switch(lib){
    case enums.hashEnum.pycrpt:
        return await hash(plainText , DB_CONFIG.SALT )
        break;
    case enums.hashEnum.argon:
        return await argon2.hash(plainText)
    }
}

export const myCompare = async ({plainText , encrypted , lib = enums.hashEnum.pycrpt })=>{
        switch(lib){
    case enums.hashEnum.pycrpt:
            return await compare(plainText , encrypted)
        break;
    case enums.hashEnum.argon:
        return await argon2.verify(encrypted,plainText)
}

}