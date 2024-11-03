import express from "express"
import Router, {Request, Response} from 'express'
import path from 'node:path'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

console.log(__dirname)

app.get('/', (req: Request, res: Response) => {
    res.render('index', { title: 'Home'})
})

app.get('/about', (req: Request, res: Response) => {
    res.render('about', {title: 'About'})
})

app.get('/contact', (req: Request, res: Response) => {
    res.render('contact', {title: "Contact"})
})
app.get('/members', (req: Request, res: Response) => {
    res.render('members', {title: 'Members'})
})

app.get('/')

export default app