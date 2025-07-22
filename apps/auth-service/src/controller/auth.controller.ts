import { NextFunction, Request, Response } from "express";
import { checkOtpRestrictions, handleForgotPassword, sendOtp, trackOtpRequests, ValidationResgistrationData, verifyForgotPasswordOtp, verifyOtp } from "../utils/auth.helper";
import prisma from "@packages/libs/prisma";
import { AuthenticationError, ValidationError } from "@packages/error-handler";
import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { setCookie } from "../utils/cookies/setCookies";
import Stripe from "stripe";
// import { Paystack } from 'paystack-api';



// const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!, {
//     apiVersion: "2025-02-24.acacia",
// })

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "2025-02-24.acacia",
// });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


// @desc    User Registration
export const userRegistration = async (req:Request, res:Response, next:NextFunction) => {
    try {
        ValidationResgistrationData(req.body, "user");
    const { name, email } = req.body;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
        where: { email }
})
if (existingUser) {
    return next(new ValidationError("User already exists with", { email }));
}

await checkOtpRestrictions(email, next)
await trackOtpRequests(email, next)
await sendOtp(name, email, "user-verification-email");
res.status(200).json({  message: "OTP sent successfully, Please verify your account" });
    } catch (error) {
        return next(error);
    }
}


// @desc    User Verification
export const userVerification = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, otp, password, name } = req.body;
        // Validate request body
        if (!email || !otp || !password || !name) {
            return next(new ValidationError("All fields are required"));
        }
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        })
        if (existingUser) {
            return next(new ValidationError("User already exists with this email"));
        }

        await verifyOtp(email, otp, next)
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.create({
            data: {name, email, password: hashedPassword}
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })
       
    } catch (error) {
        return next(error);
    }
}

// @desc    User Login
export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;
        // Validate request body
        if (!email || !password) {
            return next(new ValidationError("All fields are required"));
        }
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        })
        if (!existingUser) {
            return next(new AuthenticationError("User does not exist"));
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password!)
        if (!isPasswordValid) {
            return next(new AuthenticationError("Invalid credentials"));
        }
        res.clearCookie("vendor_access_token")
        res.clearCookie("vendor_refresh_token")

        // Generate access and refresh token 
        const accessToken = jwt.sign({ id: existingUser.id, role: "user" }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: existingUser.id, role: "user" }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

        // Store refresh token in httpOnly secure cookies
        setCookie(res, "refresh_token", refreshToken)
        setCookie(res, "access_token", accessToken)

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            existingUser: {id: existingUser.id, email: existingUser.email, name: existingUser.name}
        })
    } catch (error) {
        return next(error);
    }
}



export const refreshToken = async (req: any, res: Response, next: NextFunction) => {
    try {
        const refreshToken =
        req.cookies["refresh_token"] ||
        req.cookies["vendor_refresh_token"] || req.headers.authorization?.split(" ")[1]


        if (!refreshToken) {
            return next(new ValidationError("Unauthorized: Refresh token missing."));
        }

     
     const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET as string
            ) as { id: string; role: string };
        

            if (!decoded || !decoded.id || !decoded.role) {
                return new JsonWebTokenError("Forbidden! Invalid refresh token.")
            }

    let account
    if (decoded.role === "user") {
        
        account = await prisma.users.findUnique({
            where: { id: decoded.id }
        });

    } else if (decoded.role === "seller"){
        account = await prisma.vendors.findUnique({
            where: {id: decoded.id},
            include: {shop: true}
        })
    }

        if (!account) {
            return next(new AuthenticationError("Forbidden! User/Vendor not found."))
        }

        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "15m" }
        );

      if (decoded.role === "user"){
        setCookie(res, "access_token", newAccessToken);
      } else if(decoded.role === "seller") {
        setCookie(res, "vendor_access_token", newAccessToken);
      }

      req.role = decoded.role

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully.",
        });

    } catch (error) {
        return next(error);
    }
};


// @desc    logged in user
export const getUser = async (req: any, res: Response, next: NextFunction) => {
    try {
        const existingUser = req.existingUser
        res.status(201).json({
            success: true,
            existingUser,
        })
    } catch (error) {
        next(error)
    }
}

// @desc    User forgot password
export const userForgotPassword = async (req:Request, res:Response, next:NextFunction) => {
    await handleForgotPassword(req, res, next, "user")
}

// @desc    User verify forgot password
export const userVerifyForgotPassword = async (req:Request, res:Response, next:NextFunction) => {  
   await verifyForgotPasswordOtp(req, res, next)
}

// @desc    Reset user password
export const userResetPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, newPassword } = req.body;
        // Validate request body
        if (!email  || !newPassword) {
            return next(new ValidationError("All fields are required"));
        }
        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        })
        if (!existingUser) {
            return next(new ValidationError("User does not exist"));
        }


// compare new password with the existing one
const isSamePassword = await bcrypt.compare(newPassword, existingUser.password!)
if (isSamePassword) {   
    return next(new ValidationError("New password cannot be same as old password"));
}


        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.users.update({
            where: { email },
            data: { password: hashedPassword }
        })

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        return next(error);
    }
}





// Register a new seller
export const vendorRegistration = async (req:Request, res:Response, next:NextFunction) => {
    try {
        ValidationResgistrationData(req.body, "seller");
    const { name, email } = req.body;
    const existingVendor = await prisma.vendors.findUnique({
        where: {email},
    })


     if (existingVendor) {
            throw new ValidationError("Vendor already exists with", { email });
        }


await checkOtpRestrictions(email, next)
await trackOtpRequests(email, next)
await sendOtp(name, email, "vendor-verification-email");
res.status(200).json({  message: "OTP sent successfully, Please verify your account" });



    } catch (error) {
        return next(error);
    }
}


// @desc    Vendor Verification
export const vendorVerification = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, otp, password, name, phone_number, country } = req.body;
        // Validate request body
        if (!email || !otp || !password || !name || !phone_number || !country) {
            return next(new ValidationError("All fields are required"));
        }
        // Check if user already exists
        const existingVendor = await prisma.vendors.findUnique({
            where: { email }
        })
        if (existingVendor) {
            return next(new ValidationError("Vendor already exists with this email"));
        }

        await verifyOtp(email, otp, next)
        const hashedPassword = await bcrypt.hash(password, 10)

        const vendor = await prisma.vendors.create({
            data: {name, email, password: hashedPassword, country, phone_number}
        })

        res.status(201).json({
            vendor,
            success: true,
            message: "Vendor registered successfully"
        })
       
    } catch (error) {
        return next(error);
    }
}

// @desc    Vendor Verification
export const createShop = async (req:Request, res:Response, next:NextFunction) => {
    try {
        
        const {name, bio, address, opening_hours, website, category, vendorId,} = req.body
        console.log("Received data:", req.body);

        if (
            !name || !address || !opening_hours || !bio  || !category || !vendorId
        ) {
        return next(new ValidationError("All fields are required"));
    }
    
    const shopData:any ={
        name, bio, address, opening_hours, category, vendorId,}
    
        if (website && website.trim() !== "") {
            shopData.website = website
        }

        const shop = await prisma.shops.create({
            data: shopData
        })

        res.status(201).json({
            success: true,
           shop,
        })
        
    } catch (error) {
        next(error)
    }
}

// Create Stripe Connect Account Link
export const createStripeConnectLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vendorId } = req.body;
        if (!vendorId) return next(new ValidationError("Vendor ID is required!"));

        const vendor = await prisma.vendors.findUnique({
            where: {
                id: vendorId,
            }
        });

        if (!vendor) {
            return next(new ValidationError("Vendor is not available with this ID!"));
        }

        // Create Stripe account
        const account = await stripe.accounts.create({
            type: "express",
            email: vendor?.email,
            country: vendor?.country || "US", // Default to US if country is not provide
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            }
        });

        // Update vendor with Stripe account ID
        await prisma.vendors.update({
            where: {
                id: vendorId,
            },
            data: {
                stripeId: account.id,
            }
        });

        // Create account link
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `http://localhost:3000/success`,
            return_url: `http://localhost:3000/success`,
            type: "account_onboarding",
        });

        res.json({ url: accountLink.url });

    } catch (error) {
        return next(error);
    }
}

// //create stripe connect account link

// // export const createPaystackConnectLink = async (req:Request, res:Response, next:NextFunction) => {
// //     try {
// //         const {vendorId} = req.body
// //         if(!vendorId) return next (new ValidationError("Seller ID is required!"))

// //         const vendor = await.prisma.vendors.findUnique({
// //             where: {
// //                 id: vendorId,
// //             }
// //         })

// //         if(!vendor){
// //             return next (new ValidationError("Vendor is not available with this id!"))
// //         }

// //         const account = await paystack.accounts.create({
// //             type: "express",
// //             email: vendor?.email,
// //             country: "NGN",
// //             capabilities: {
// //                 card_payments: {requested: true},
// //                 transfers: {requested: true}
// //             }
// //         })

// //         await prisma.vendors.update({
// //             where: {
// //                 id: vendorId,
// //             },
// //             data: {
// //                 paystackId: account.id,
// //             }
// //         })

// //         const accountLinkn = await stripe.accountLinks.create({
// //             account: account.id,
// //             refersh_url: `http://localhost:3000/success`,
// //             return_url: `http://localhost:3000/success`,
// //             type: "account_onboarding",
// //         })

// //         res.json({url: accountLinkn.url})

// //     } catch (error) {
// //         return next
// //     }
// // }


// // Controller to generate Paystack OAuth URL


// export const createPaystackConnectLink = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { vendorId } = req.body;
//     console.log("Received vendorId:", vendorId);
//     if (!vendorId) return next(new ValidationError("Vendor ID is required!"));
//     console.log("Vendor ID is missing");
//     const vendor = await prisma.vendors.findUnique({
//       where: {
//         id: vendorId,
//       },
//     });

//     if (!vendor) {
//         console.log("Vendor not found with ID:", vendorId);
//       return next(new ValidationError("Vendor is not available with this id!"));
//     }

//     // Create Paystack account via axios
//     const accountResponse = await axios.post(
//       "https://api.paystack.co/merchant",
//       {
//         type: "express",
//         email: vendor?.email,
//         country: "NGN",
//         capabilities: {
//           card_payments: { requested: true },
//           transfers: { requested: true },
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const account = accountResponse.data.data;

//     // Save Paystack account ID
//     await prisma.vendors.update({
//       where: {
//         id: vendorId,
//       },
//       data: {
//         paystackId: account.id,
//       },
//     });

//     // Create account link
//     const accountLinkResponse = await axios.post(
//       "https://api.paystack.co/account_links",
//       {
//         account: account.id,
//         refresh_url: `http://localhost:3000/success`,
//         return_url: `http://localhost:3000/success`,
//         type: "account_onboarding",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const accountLink = accountLinkResponse.data.data;

//     res.json({ url: accountLink.url });
//   } catch (error) {
//     return next(error);
//   }
// };


// export const handlePaystackOAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
//   const { code, state } = req.query; // state === vendorId

//   if (!code || !state) return next(new ValidationError("Missing code or vendor ID"));

//   try {
//     const tokenRes = await axios.post('https://connect.paystack.com/token', {
//       grant_type: 'authorization_code',
//       client_id: process.env.PAYSTACK_CLIENT_ID,
//       client_secret: process.env.PAYSTACK_SECRET_KEY,
//       code,
//       redirect_uri: process.env.PAYSTACK_REDIRECT_URI,
//     });

//     const { access_token, account_id } = tokenRes.data;

//     // Save vendor Paystack details
//     await prisma.vendors.update({
//       where: { id: state.toString() },
//       data: {
//         paystackAccessToken: access_token,
//         paystackAccountId: account_id,
//       },
//     });

//     return res.redirect(`/dashboard?vendorId=${state}&connected=true`);
//   } catch (error) {
//     return next(error);
//   }
// };


// export const createPaystackSubaccount = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { vendorId } = req.body;
//       if (!vendorId) return next(new ValidationError("Vendor ID is required!"));
  
//       const vendor = await prisma.vendors.findUnique({
//         where: { id: vendorId },
//       });
  
//       if (!vendor) return next(new ValidationError("Vendor not found!"));
  
//       // Create Paystack subaccount via axios
//       const subaccountResponse = await axios.post(
//         "https://api.paystack.co/subaccount",
//         {
//           business_name: vendor.businessName,
//           settlement_bank: vendor.bankCode,
//           account_number: vendor.accountNumber,
//           percentage_charge: 80,
//           description: "Vendor subaccount for split payments",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       const subaccount = subaccountResponse.data.data;
  
//       // Save subaccount code to DB
//       await prisma.vendors.update({
//         where: { id: vendorId },
//         data: {
//           paystackSubaccountCode: subaccount.subaccount_code,
//         },
//       });
  
//       res.status(200).json({ message: "Subaccount created successfully", subaccount });
//     } catch (error) {
//       return next(error);
//     }
//   };
  


// @desc    Vendor Login


export const vendorLogin = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;
        // Validate request body
        if (!email || !password) {
            return next(new ValidationError("All fields are required"));
        }
        // Check if user already exists
        const existingVendor = await prisma.vendors.findUnique({
            where: { email }
        })
        if (!existingVendor) {
            return next(new AuthenticationError("Vendor does not exist"));
        }

        const isPasswordValid = await bcrypt.compare(password, existingVendor.password!)
        if (!isPasswordValid) {
            return next(new AuthenticationError("Invalid credentials"));
        }

        res.clearCookie("access_token")
        res.clearCookie("refresh_token")

        // Generate access and refresh token 
        const accessToken = jwt.sign({ id: existingVendor.id, role: "seller" }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: existingVendor.id, role: "seller" }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

        // Store refresh token in httpOnly secure cookies
        setCookie(res, "vendor_refresh_token", refreshToken)
        setCookie(res, "vendor_access_token", accessToken)

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            existingUser: {id: existingVendor.id, email: existingVendor.email, name: existingVendor.name}
        })
    } catch (error) {
        return next(error);
    }
}

// @desc    logged in Vendor
export const getVendor = async (req: any, res: Response, next: NextFunction) => {
    try {
        const existingVendor = req.existingVendor
        res.status(201).json({
            success: true,
            existingVendor: req.vendor
        })
    } catch (error) {
        next(error)
    }
}














































































// import { NextFunction, Request, Response } from "express";
// import { checkOtpRestrictions, handleForgotPassword, sendOtp, trackOtpRequests, ValidationResgistrationData, verifyForgotPasswordOtp, verifyOtp } from "../utils/auth.helper";
// import prisma from "@packages/libs/prisma";
// import { AuthenticationError, ValidationError } from "@packages/error-handler";
// import bcrypt from "bcryptjs";
// import jwt, { JsonWebTokenError } from "jsonwebtoken"
// import { setCookie } from "../utils/cookies/setCookies";



// // @desc    User Registration
// export const userRegistration = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         ValidationResgistrationData(req.body, "user");
//     const { name, email } = req.body;

//     // Check if user already exists
//     const user  = await prisma.user.findUnique({
//         where: { email }
// })
// if (user) {
//     return next(new ValidationError("User already exists with", { email }));
// }

// await checkOtpRestrictions(email, next)
// await trackOtpRequests(email, next)
// await sendOtp(name, email, "user-verification-email");
// res.status(200).json({  message: "OTP sent successfully, Please verify your account" });
//     } catch (error) {
//         return next(error);
//     }
// }


// // @desc    User Verification
// export const userVerification = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         const { email, otp, password, name } = req.body;
//         // Validate request body
//         if (!email || !otp !|| !password || !name) {
//             return next(new ValidationError("All fields are required"));
//         }
//         // Check if user already exists
//         const user = await prisma.users.findUnique({
//             where: { email }
//         })
//         if (user) {
//             return next(new ValidationError("User already exists with this email"));
//         }

//         await verifyOtp(email, otp, next)
//         const hashedPassword = await bcrypt.hash(password, 10)

//         await prisma.users.create({
//             data: {name, email, password: hashedPassword}
//         })

//         res.status(201).json({
//             success: true,
//             message: "User registered successfully"
//         })
       
//     } catch (error) {
//         return next(error);
//     }
// }

// // @desc    User Login
// export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         const { email, password } = req.body;
//         // Validate request body
//         if (!email || !password) {
//             return next(new ValidationError("All fields are required"));
//         }
//         // Check if user already exists
//         const user = await prisma.users.findUnique({
//             where: { email }
//         })
//         if (!user) {
//             return next(new AuthenticationError("User does not exist"));
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password!)
//         if (!isPasswordValid) {
//             return next(new AuthenticationError("Invalid password"));
//         }

//         // Generate access and refresh token 
//         const accessToken = jwt.sign({ id: user.id, role: "user" }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
//         const refreshToken = jwt.sign({ id: user.id, role: "user" }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

//         // Store refresh token in httpOnly secure cookies
//         setCookie(res, "refreshToken", refreshToken)
//         setCookie(res, "accessToken", accessToken)

//         res.status(200).json({
//             success: true,
//             message: "Logged in successfully",
//             user: {id: user.id, email: user.email, name: user.name}
//         })
//     } catch (error) {
//         return next(error);
//     }
// }

// export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const refreshToken = req.cookies.refresh_token;
//         if (!refreshToken) {
//             return next(new ValidationError("Unauthorized! No refresh token."));
//         }

//         const decoded = jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET as string
//         ) as { id: string; role: string };

//         if (!decoded?.id || !decoded?.role) {
//             return next(new JsonWebTokenError("Forbidden! Invalid refresh token."));
//         }

//         const user = await prisma.users.findUnique({
//             where: { id: decoded.id }
//         });

//         if (!user) {
//             return next(new AuthenticationError("Forbidden! User/Seller not found."));
//         }

//         const newAccessToken = jwt.sign(
//             { id: decoded.id, role: decoded.role },
//             process.env.ACCESS_TOKEN_SECRET as string,
//             {
//                 expiresIn: "15m"
//             }
//         );

//         setCookie(res, "access_token", newAccessToken);

//         return res.status(201).json({ success: true });

//     } catch (error) {
//         return next(error);
//     }
// };

// // @desc    logged in user
// export const getUser = async (req: any, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user
//         res.status(201).json({
//             success: true,
//             user,
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// // @desc    User forgot password
// export const userForgotPassword = async (req:Request, res:Response, next:NextFunction) => {
//     await handleForgotPassword(req, res, next, "user")
// }

// // @desc    User verify forgot password
// export const userVerifyForgotPassword = async (req:Request, res:Response, next:NextFunction) => {  
//    await verifyForgotPasswordOtp(req, res, next)
// }

// // @desc    Reset user password
// export const userResetPassword = async (req:Request, res:Response, next:NextFunction) => {
//     try {
//         const { email, newPassword } = req.body;
//         // Validate request body
//         if (!email  || !newPassword) {
//             return next(new ValidationError("All fields are required"));
//         }
//         // Check if user already exists
//         const user = await prisma.users.findUnique({
//             where: { email }
//         })
//         if (!user) {
//             return next(new ValidationError("User does not exist"));
//         }


// // compare new password with the existing one
// const isSamePassword = await bcrypt.compare(newPassword, user.password!)
// if (isSamePassword) {   
//     return next(new ValidationError("New password cannot be same as old password"));
// }


//         const hashedPassword = await bcrypt.hash(newPassword, 10)

//         await prisma.users.update({
//             where: { email },
//             data: { password: hashedPassword }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Password reset successfully"
//         })
//     } catch (error) {
//         return next(error);
//     }
// }
