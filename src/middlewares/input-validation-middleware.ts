import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array({onlyFirstError: true}).map(el => {
            return {
                message: el.msg,
                field: el.param
            }
        })
        res.status(400).json({errorsMessages: error})
    } else {
        next()
    }
}