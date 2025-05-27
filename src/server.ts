import app from './app'
import config from './config/config'
import logger from './util/logger'
const server = app.listen(config.PORT)

;(() => {
    try {
         
        logger.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SEVRER_URL: config.SERVER_URL
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
