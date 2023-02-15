// create a node server with express, cors
const express = require("express");
const cors = require("cors");

require("dotenv").config();

//import the function to fetch data from chatgpt
const { getAnswerFromChatGPT } = require("./api/chatgpt");

const app = express();
const port = process.env.PORT || 3001;

// use cors lib
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200,
  methods: "GET",
};
app.use(cors(corsOptions));

// create a route
app.get("/recipe", async (req, res) => {
  // validate the origin
  if (req.headers.origin !== process.env.ALLOWED_ORIGIN) {
    return res.status(403).send("Forbidden");
  }
  const { language, search } = req.query;
  const query = `create a detailed recipe with title, ingredients, preparation mode, how much it yields, including only the ingredients or recipe name equal to  ${search}  in ${language} language and format it to html syntax, using tags h3 for titles, h4 for subtitles, br, p, ul for ingredient list and ol for preparation instructions`;
  const response = await getAnswerFromChatGPT(query);
  res.send(response);
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
