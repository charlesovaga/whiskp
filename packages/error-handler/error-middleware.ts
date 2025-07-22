import prisma from "@packages/libs/prisma";
import { AppError } from "./index";
import { NextFunction, Request, Response } from "express";

/**
 * Global error handler middleware
 */
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    console.error(`AppError [${req.method} ${req.url}]:`, err.message);
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.error("Unhandled Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong, please try again.",
  });
};

/**
 * Middleware to check vendor verification before accessing protected routes
 */
export const checkVerification = async (
  req: Request & { vendorId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.vendorId) {
      return res.status(401).json({ message: "Unauthorized access. Vendor ID missing." });
    }

    const vendor = await prisma.vendors.findUnique({
      where: { id: req.vendorId },
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }

    if (vendor.verification_status !== "verified") {
      return res.status(403).json({ message: "Vendor not verified." });
    }

    next();
  } catch (error) {
    next(error);
  }
};
