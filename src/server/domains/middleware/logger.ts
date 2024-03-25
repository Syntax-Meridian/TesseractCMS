import { NextFunction, Request, Response } from "express";

const MyLogger = function(_req: Request, _res: Response, next: NextFunction) {
    console.log('LOGGED')

    next()
}

export default MyLogger
