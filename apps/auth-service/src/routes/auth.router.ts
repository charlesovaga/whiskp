import express, { Router } from 'express';
import {  createShop, createStripeConnectLink, getUser,  getVendor,  refreshToken, userForgotPassword, userLogin, userRegistration, userResetPassword, userVerification, userVerifyForgotPassword, vendorLogin, vendorRegistration, vendorVerification } from '../controller/auth.controller';   
import isAuthenticated from '@packages/middleware/isAuthenticated';
import { isVendor } from '@packages/middleware/authorizeRoles';



const router: Router = express.Router();

router.post('/user-registration', userRegistration);
router.post('/verify-user', userVerification);
router.post('/login-user', userLogin);
router.post('/refresh-token', refreshToken);
router.get('/logged-in-user', isAuthenticated, getUser);
router.post('/forgot-password-user', userForgotPassword);
router.post('/reset-password-user', userResetPassword)
router.post('/verify-forgot-password-user', userVerifyForgotPassword)
router.post('/vendor-registration', vendorRegistration)
router.post('/verify-vendor', vendorVerification )
router.post('/create-shop', createShop)
router.post('/create-stripe-link', createStripeConnectLink);
router.post('/login-vendor', vendorLogin);
router.get('/logged-in-vendor', isAuthenticated, isVendor, getVendor);
// router.get('/paystack/callback', handlePaystackOAuthCallback); // OAuth callback usually uses GET
// router.post('/paystack/subaccount', createPaystackSubaccount);




export default router;