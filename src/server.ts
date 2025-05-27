import app from './app'
import config from './config/config'

const server = app.listen(config.PORT)

;(() => {
    try {
        // eslint-disable-next-line no-console
        console.info(`APPLICATION STARTED`, {
            meta: {
                PORT: config.PORT,
                SEVRER_URL: config.SERVER_URL
            }
        })
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(`APPLICATION_ERROR`, { meta: err })
        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error(`APPLICATION ERROR`, { meta: error })
            }
            process.exit(1)
            // Terminates application with error code
        })
    }
})()
