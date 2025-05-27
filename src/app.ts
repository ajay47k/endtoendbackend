import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
const app: Application = express()

// Middleware app.use() is used to register middleware
app.use(express.json()) // parse incoming json requests important always use
app.use(express.static(path.join(__dirname, '../', 'public')))
// Routes defined in the
app.use('/api/v1', router)
// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})
// GLobal Error Handler
app.use(globalErrorHandler)

export default app
