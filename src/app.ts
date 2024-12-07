import express from "express";
import Router, { Request, Response } from "express";
import path from "node:path";
import config from "./config";


const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

console.log(__dirname);

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req: Request, res: Response) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("contact", { title: "Contact" });
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
    console.log(members)
    
      res.render("members", {
        title: "Members",
        members,
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

    const {memberInfo}  = await response.json();

    let member = {
      upn: "string",
      name: "string",
      date_of_birth: "string",
      state_of_origin: "string",
      local_government: "string",
      post_held: "string",
      educational_background: "string",
      pfpUrl: "string"
    };
        const pfpUrl = memberInfo.pfpUrl
        const id = memberInfo.id
        const stationData = memberInfo.stationData
        const videos = memberInfo.videos
        const audios = memberInfo.audios

        console.log(memberInfo)
    
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
    });
  } catch (error) {
    console.log('personal member ERROR: ', error)
  }
});

app.get("/login", (req: Request, res: Response) => {
  res.render("login", { title: "Log In" });
});
app.get("/signup", (req: Request, res: Response) => {
  res.render("signup", { title: "Sign Up" });
});

app.get("/");

export default app;
