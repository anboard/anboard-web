import express from "express"
import Router, {Request, Response} from 'express'
import path from 'node:path'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

console.log(__dirname)

app.get('/', (req: Request, res: Response) => {
    res.render('index', { artist: 'Kendrick Lamar'})
})

export default app