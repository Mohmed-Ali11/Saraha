import jwt from "jsonwebtoken"
import { models } from "../../database/index.js"
import { DB_CONFIG } from "../../config/config.service.js"
import *as sec from "../../security/index.js"

export const profile = async (token)=>{
    return models.userModel.findById(sub)
}

