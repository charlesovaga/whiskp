import express, { Router } from 'express';

import { createDiscountCodes, createProduct, deleteDiscountCodes, deleteProduct, deleteProductImage, getCateories, getDiscountCodes, getShopProducts, restoreProduct, uploadProductImage } from '../controllers/product.controller';
import isAuthenticated from '@packages/middleware/isAuthenticated';
  
// import isAuthenticated from '@packages/middleware/isAuthenticated';
// import { isVendor } from '@packages/middleware/authorizeRoles';
// import { isVendor } from '@packages/middleware/authorizeRoles';


const router: Router = express.Router();

router.get("/get-categories", getCateories);
router.post("/create-discount-code", isAuthenticated, createDiscountCodes);
router.get("/get-discount-code", isAuthenticated, getDiscountCodes);
router.delete("/delete-discount-code/:id", isAuthenticated, deleteDiscountCodes);
router.post("/upload-product-image", isAuthenticated, uploadProductImage);
router.delete("/delete-product-image", isAuthenticated, deleteProductImage);
router.post("/create-product", isAuthenticated, createProduct);
router.get("/get-shop-products", isAuthenticated, getShopProducts);
router.delete("/delete-product/:productId", isAuthenticated, deleteProduct);
router.put("/restore-product/:productId", isAuthenticated, restoreProduct);





export default router;