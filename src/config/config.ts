import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()
// console.log(process.env)
export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,
    MONGO_LOCAL_URL: process.env.MONGO_LOCAL_URL
}
