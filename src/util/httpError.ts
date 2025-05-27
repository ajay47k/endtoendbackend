import { NextFunction, Request } from 'express'
import errorObject from './errorObject'
export default (nextFunc: NextFunction, err: Error | unknown, req: Request, errorStatuscode: number = 500): void => {
    const errorObj = errorObject(err, req, errorStatuscode)
    return nextFunc(errorObj)
}
