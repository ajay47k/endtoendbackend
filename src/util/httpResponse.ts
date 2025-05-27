import { Request, Response } from 'express'
import { THttpResponse } from '../types/types'
import { EApplicationEnvironment } from '../constant/application'
import config from '../config/config'
import logger from './logger'
export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.url
        },
        message: responseMessage,
        data: data
    }
    // Log the requests
     
    logger.info(`CONTROLLER_RESPONSE`, {
        meta: response
    })
    // Production Env Check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
