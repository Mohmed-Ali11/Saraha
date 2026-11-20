import { config } from "dotenv";
import {resolve} from "path"

config({
    path : resolve(`.env.${process.env.NODE_ENV}`)
})

export const DB_CONFIG = {
    PORT : Number(process.env.PORT),
    URI : process.env.DB_URI,

    SALT : Number(process.env.SALT),

    ENC_KEY : process.env.ENC_KEY,
    ENC_IV_LENGTH : Number(process.env.ENC_IV_LENGTH),
    ENC_ALGO : process.env.ENC_ALGO,

    JWT_ACCESS_SECRET_USER : process.env.JWT_ACCESS_SECRET_USER,
    JWT_REFRESH_SECRET_USER : process.env.JWT_REFRESH_SECRET_USER,

    JWT_ACCESS_SECRET_ADMIN : process.env.JWT_ACCESS_SECRET_ADMIN,
    JWT_REFRESH_SECRET_ADMIN: process.env.JWT_REFRESH_SECRET_ADMIN,

    JWT_EXP_ACCESS : Number(process.env.JWT_EXP_ACCESS),
    JWT_EXP_REFRESH : process.env.JWT_EXP_REFRESH
}