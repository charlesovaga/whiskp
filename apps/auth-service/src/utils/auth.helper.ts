import crypto from 'crypto';
import { ValidationError } from '@packages/error-handler';
import redis from '@packages/libs/redis';

import { sendEmail } from './sendMail';
import { NextFunction, Request, Response } from 'express';
import prisma from '@packages/libs/prisma';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ValidationResgistrationData = (data: any, userType: "user" | "seller") => {
    const {name,  email, password, phone_number, country } = data;

    if (!name || !email || !password || (userType === "seller" &&  (!phone_number  || !country))) {
       throw new ValidationError("Please provide all required fields")
    }
    if (!emailRegex.test(email)) {
        throw new ValidationError("Please provide a valid email address", { email });
}
}

export const checkOtpRestrictions = async (email:string, next:NextFunction) => {
    if (await redis.get(`otp_lock:${email}`)) {
        return next(new ValidationError("Account locked due to multiple failed attempts! Try again after 30 minutes"));
}
if (await redis.get(`otp_spam_lock:${email}`)) {
        return next(new ValidationError("Too many OTP requests! Please wait 1 hour before requesting again"));
}

if (await redis.get(`otp_cooldown:${email}`)) {
        return next(new ValidationError("Please wait 1 minute before requesting another OTP"));
}
}

export const sendOtp = async (name:string, email:string, template:string) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    await sendEmail(email, "Verify Your Email", template, { name, otp });
    await redis.set(`otp:${email}`, otp, 'EX', 300); // Store OTP in Redis with a 5-minute expiration
   await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60); // Set cooldown for OTP sending
}

export const trackOtpRequests = async (email:string, next:NextFunction) => {
    const otpRequestKey = `otp_request_count:${email}`;
    let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");
    if (otpRequests >= 2) {
        await redis.set(`otp_spam_lock:${email}`, "locked", "EX", 3600); // Set expiration to 1 hour
        return next(new ValidationError("Too many OTP requests! Please wait 1 hour before requesting again"));
    }
  
await redis.set(otpRequestKey, (otpRequests + 1).toString(), "EX", 3600); // Set expiration to 1 hour
}

export const verifyOtp = async (email:string, otp:string, next:NextFunction) => {
    const isOtpValid = await redis.get(`otp:${email}`);
    if (!isOtpValid) {
        throw new ValidationError("Invalid or expired OTP", { email });
    }

    const failedAttemptsKey = `otp_failed_attempts:${email}`;
    let failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || "0"); 
    if (isOtpValid !== otp) {
        if (failedAttempts >= 2) {
            await redis.set(`otp_lock:${email}`, "locked", "EX", 1800); // Lock account for 30 minutes
            // Delete OTP from Redis after successful verification
            await redis.del(`otp:${email}`, failedAttemptsKey);
            throw new ValidationError("Account locked due to multiple failed attempts! Try again after 30 minutes");
        }
        await redis.set(failedAttemptsKey, failedAttempts + 1, "EX", 3000)
        throw new ValidationError(`Incorrect OTP. ${2 - failedAttempts} attempts left`
        )


}
await redis.del(`otp:${email}`, failedAttemptsKey)
}

export const handleForgotPassword = async (req:Request, res:Response, next:NextFunction, userType: "user" | "seller")  => {
    try {
        const { email } = req.body;
        // Validate request body
        if (!email) throw new ValidationError("Email is required");
    
        // Check if user/seller already exists
        const existingUser = userType === "user" ? await prisma.users.findUnique({
            where: { email }
        }): await prisma.vendors.findUnique({where: {email}})

        if (!existingUser) {
            return next(new ValidationError(`${userType} does not exist`));
        }

    
        await checkOtpRestrictions(email, next)
        await trackOtpRequests(email, next)
        await sendOtp(existingUser.name, email, userType === "user" ? "forgot-password-email" : "forgot-password-vendor-email");

        res.status(200).json({
            success: true,
            message: "OTP sent successfully, Please verify your account"
        })
    } catch (error) {
        return next(error);
    }
}

export const verifyForgotPasswordOtp = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, otp} = req.body;
        // Validate request body
        if (!email || !otp ) {
            throw new ValidationError("All fields are required");
        }
        await verifyOtp(email, otp, next)
        res.status(200).json({
            success: true,
            message: "OTP verified successfully. You can reset your password"
        })
    } catch (error) {
        return next(error);
    }
}