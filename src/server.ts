import app from './app'
import config from './config/config'
import mongoService from './service/mongoService'
import logger from './util/logger'
const server = app.listen(config.PORT)

;(async () => {
    try {
        // LOCAL MONGO Connection
        const connection = await mongoService.connect()
        logger.info(`LOCAL_MONGO_CONNECTION`, {
            meta: {
                CONNECTION_NAME: connection.name
            }
        })
        logger.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SEVER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        logger.error(`APPLICATION_ERROR`, { meta: err })
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION ERROR`, { meta: error })
            }
            process.exit(1)
            // Terminates application with error code
        })
    }
})()
