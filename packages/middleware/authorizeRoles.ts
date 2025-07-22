import { AuthenticationError } from "@packages/error-handler";
import { NextFunction, Response } from "express";

export const isVendor =  async(req:any, res:Response, next:NextFunction) => {
if(req.role !== "seller"){
    return next(new AuthenticationError("Access denied: Vendors Only!"))
}
next()

}


export const isUser =  async(req:any, res:Response, next:NextFunction) => {
if(req.role !== "user"){
    return next(new AuthenticationError("Access denied: Vendors Only!"))
}
next()
}