import { ErrorRequestHandler, NextFunction, Response, Request } from "express";
import { HttpException } from "../common/exceptions";

export const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof HttpException) {
        const { status, message } = err.getErrorResponse();
        res.status(status).json({ status, message })
    }
    next(err);
}

