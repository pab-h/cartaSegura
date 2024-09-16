const express = require("express");
const bodyParser = require("body-parser");
const { resolve } = require("path");
const { randomBytes } = require("crypto");
const { encrypt, decrypt } = require("./lib");

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));    

const letters = [];

server.set("view engine", "ejs");
server.set("views", resolve(__dirname, "view"));

server.get("/", (req, res) => {
    res.status(200).render("list", {letters});
});

server.get("/see", (req, res) => {
    const { password, id } = req.query;

    const letter = letters
        .find(letter => letter.id == id);

    const decodedLetter = {
        id,
        subject: letter.subject,
        content: decrypt(password, letter.content)
    };

    res.status(200).render("see", {letter: decodedLetter});
});

server.get("/write", (req, res) => {
    res.status(200).render("write");
});

server.post("/write", (req, res) => {
    const {subject, content, password} = req.body;

    const letter = {
        id: randomBytes(10).toString("hex"),
        subject,
        content: encrypt(password, content)
    }

    letters.push(letter);

    res.status(200).redirect("/");
});

server.listen(3000, () => {
    console.log("server running on http://localhost:3000/")
});

