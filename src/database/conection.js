import mongoose from "mongoose";
import { DB_CONFIG } from "../config/config.service.js";

export const DB_CONNECT = async ()=>{
    try{
        await mongoose.connect(DB_CONFIG.URI)
        await mongoose.syncIndexes()
        console.log("DB Connectd")
    }catch(e){
        console.log("DB Connection Faild")
        console.log(e)
        process.exit(-1)
    }
}