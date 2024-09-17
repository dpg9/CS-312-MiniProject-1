import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // Temporary storage for blog posts

app.get("/", (req, res) => {
  res.render("home", { posts });
});

app.post("/create", (req, res) => {
  const { title, author, content } = req.body;
  const newPost = {
    id: posts.length + 1, // Unique ID for each post
    title,
    author,
    content,
    date: new Date().toLocaleString(), // Date created
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  let post = posts.find((p) => p.id == id);
  post.title = title;
  post.author = author;
  post.content = content;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  posts = posts.filter((post) => post.id != req.params.id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
