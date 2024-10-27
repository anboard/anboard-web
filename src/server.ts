import server from "./app"
import config from "./config"

server.listen(3000, () => {
    console.log(`Server listening on port http://localhost:${config.port}`)
})