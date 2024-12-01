import express from "express"
import Router, {Request, Response} from 'express'
import path from 'node:path'
import config from "./config"

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
app.get('/members', async (req: Request, res: Response) => {

    let photos: {upn: string, photoUrl: string}[];
    try {
        const response = await fetch(`${config.API_BASE_URL}/web/photo/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.WEB_SERVER_API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const { data } = await response.json()
        photos = data

    } catch (error) {
        console.error('Error fetching members photos:', error);
        res.status(500).render('error', { title: 'Error', message: 'Failed to fetch members photos' });
        return
    }

    let members: {
        upn: string
        name: string
        date_of_birth: string
        state_of_origin: string
        local_government: string
        post_held: string
        educational_background: string
        pfpUrl: string
      }[];
    try {
        const response = await fetch(`${config.API_BASE_URL}/web/profile/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.WEB_SERVER_API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const { data } = await response.json()
        members = data

    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).render('error', { title: 'Error', message: 'Failed to fetch members' });
        return
    }
    
    members.forEach(member => {
        const matchingPhoto = photos.find(photo => photo.upn === member.upn);
        if (matchingPhoto) {
            member.pfpUrl = matchingPhoto.photoUrl;
        } else {
            member.pfpUrl = ''; // Optional: Set a default value if no photo is found
        }
    });
    res.render('members', {
        title: 'Members',
        members
    });
})


app.get('/member/:upn', async (req: Request, res: Response) => {

    const upn = req.params.upn


    let photo: string;
    try {
        const response = await fetch(`${config.API_BASE_URL}/web/photo/${upn}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.WEB_SERVER_API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const { pfpUrl } = await response.json()
        console.log('pfpUrl: ', pfpUrl)
        photo = pfpUrl

    } catch (error) {
        console.error('Error fetching members photos:', error);
        res.status(500).render('error', { title: 'Error', message: 'Failed to fetch members photos' });
        return
    }

    let member: {
        upn: string
        name: string
        date_of_birth: string
        state_of_origin: string
        local_government: string
        post_held: string
        educational_background: string
        pfpUrl: string
      };
    try {
        const response = await fetch(`${config.API_BASE_URL}/web/profile/${upn}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.WEB_SERVER_API_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const { data } = await response.json()
        console.log('data: ', data)
        member = data

    } catch (error) {
        console.error('Error fetching member:', error);
        res.status(500).render('error', { title: 'Error', message: 'Failed to fetch member' });
        return
    }

    if (member)
    member.pfpUrl = photo

    res.render('member', {
        title: 'Member',
        member
    });
})



app.get('/login', (req: Request, res: Response) => {
    res.render('login', {title: 'Log In'})
})
app.get('/signup', (req: Request, res: Response) => {
    res.render('signup', {title: 'Sign Up'})
})

app.get('/')

export default app