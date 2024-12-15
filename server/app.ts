import express from "express";
import Router, { Request, Response } from "express";
import path, { dirname } from "node:path";
import config from "./config";
import { client } from "./src/sanity/client";
import { FilteredResponseQueryOptions, SanityDocument } from "@sanity/client";
// import cors from 'cors'
// import { default } from './config';

const app = express();
// const allowedOrigins = `http://localhost:4423`;

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// };

// app.use(cors(corsOptions))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use('/client', express.static(path.join(__dirname, 'public/client')))
// app.use('/events', express.static(path.join(__dirname, '../client/build')))

// app.use(
//   ['/events', '/news', '/obrigado', '/news/:slug'],
//   express.static(path.join(__dirname, '../client/build'), {
//       setHeaders: (res) => {
//           res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//       },
//   })
// )

app.use(
 '/obrigado/*',
  express.static(path.join(__dirname, '../client/build'), {
      setHeaders: (res) => {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      },
  })
)

app.get('/api/newslist', async (req: Request, res: Response) => {
  try {
    const POSTS_QUERY = `*[
      _type == "anboard_news"]|order(publishedAt desc)[0...12]{_id, title, slug, image, description, publishedAt}`;

    const options = { next: { revalidate: 30 } };

    const newsList = await client.fetch<SanityDocument[]>(
      POSTS_QUERY,
      {},
      options as unknown as FilteredResponseQueryOptions
    );
    res.json({ newsList });
  } catch (error) {
    console.error('Error fetching news list: ', error);
        res.status(500).send('Error fetching news');
    return;
  }
})

app.get('/api/news/:slug', async (req: Request, res: Response) => {

  const { slug } = req.params
  try {
    const POSTS_QUERY = `*[
      _type == "anboard_news" && slug.current == "${slug}"]{_id, title, image, description, body, publishedAt}`;

    const options = { next: { revalidate: 30 } };

    const article = await client.fetch<SanityDocument[]>(
      POSTS_QUERY,
      {},
      options as unknown as FilteredResponseQueryOptions
    );
    res.json({ article });
  } catch (error) {
    console.error('Error fetching news: ', error);
        res.status(500).send('Error fetching news');
    return;
  }
})
const configuration = require('./config').default; // Import the configuration file
app.get("/", async (req: Request, res: Response) => {
  try {
    const POSTS_QUERY = `*[
      _type == "anboard_news"]|order(publishedAt desc)[0...12]{_id, title, body, publishedAt}`;

    const options = { next: { revalidate: 30 } };

    const newsList = await client.fetch<SanityDocument[]>(
      POSTS_QUERY,
      {},
      options as unknown as FilteredResponseQueryOptions
    );
    res.render("index", { 
      title: "Home",
      newsList,
      configuration
    });
  
  } catch (error) {
    console.error("Error fetching ANBROAD news list:", error);
    res
      .status(500)
      .render("error", { title: "Error", message: "Failed to fetch ANBROAD news" });
    return;
  }

});

app.get("/about", (req: Request, res: Response) => {
  res.render("about", { title: "About",configuration });
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("contact", { title: "Contact",configuration });
});
app.get("/members", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.WEB_SERVER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const { members } = await response.json();

    res.render("members", {
      title: "Members",
      members,configuration
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res
      .status(500)
      .render("error", { title: "Error", message: "Failed to fetch members" });
    return;
  }
});

app.get("/member/:upn", async (req: Request, res: Response) => {
  const upn = req.params.upn;

  try {
    const response = await fetch(`${config.API_BASE_URL}/member/${upn}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.WEB_SERVER_API_KEY}`,
      },
    });

    const { memberInfo } = await response.json();

    let member = {
      upn: "string",
      name: "string",
      date_of_birth: "string",
      state_of_origin: "string",
      local_government: "string",
      post_held: "string",
      educational_background: "string",
      pfpUrl: "string",
    };
    const pfpUrl = memberInfo.pfpUrl;
    const id = memberInfo.id;
    const stationData = memberInfo.stationData;
    const videos = memberInfo.videos;
    const audios = memberInfo.audios;


    res.render("member", {
      title: "Member",
      pfpUrl,
      id,
      stationData,
      videos,
      audios,
      member: {
        upn: memberInfo.id.upn || "N/A",
        name: memberInfo.id.name || "N/A",
        date_of_birth: memberInfo.id.date_of_birth || "N/A",
        state_of_origin: memberInfo.id.state_of_origin || "N/A",
        local_government: memberInfo.id.local_government || "N/A",
        post_held: memberInfo.id.post_held || "N/A",
        educational_background: memberInfo.id.educational_background || "N/A",
        pfpUrl: pfpUrl,
      },
      upn,
      configuration
    });
  } catch (error) {
    res
      .status(500)
      .render("error", { title: "Error", message: `Failed to fetch member ${upn}` });
    return;
  }
});

app.get("/login", (req: Request, res: Response) => {
  res.render("login", { title: "Log In" });
});
app.get("/signup", (req: Request, res: Response) => {
  res.render("signup", { title: "Sign Up" });
});


app.get(['/news', '/news/:slug', '/events'], (req, res) => {
  console.log('we get here')
  res.sendFile(path.join(__dirname, 'public/client/index.html'));
});


export default app;
