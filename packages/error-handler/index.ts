export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly  details?: any;

    constructor(
        message: string,
        statusCode: number,
        isOperational: boolean = true, 
        details?: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }}

    //Not Found Error
export class NotFoundError extends AppError {
        constructor(message = "Resource not found", details?: any) {
            super(message, 404, true, details);
        }
    }
//Validation Error
export class ValidationError extends AppError {
        constructor(message = "Invalid request data", details?: any) {
            super(message, 400, true, details);
        }
    } 

    //Authentication Error
export class AuthenticationError extends AppError {
        constructor(message = "Authentication failed", details?: any) {
            super(message, 401, true, details);
        }
    }
//Forbidden Error
export class ForbiddenError extends AppError {
        constructor(message = "Access denied", details?: any) {
            super(message, 403, true, details);
        }
    }
//Database Error    
export class DatabaseError extends AppError {
        constructor(message = "Database error", details?: any) {
            super(message, 500, true, details);
        }
    }
    //Rate Limit Error
export class RateLimitError extends AppError {
        constructor(message = "Too many requests, please ntry again later", details?: any) {
            super(message, 429, true, details);
        }
    }