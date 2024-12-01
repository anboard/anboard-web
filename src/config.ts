import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 3001,
    API_BASE_URL: process.env.API_BASE_URL,
    WEB_SERVER_API_KEY: process.env.WEB_SERVER_API_KEY
}
