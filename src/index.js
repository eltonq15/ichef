// create a node server with express, cors
const express = require("express");
const cors = require("cors");

dotenv.config();

//import the function to fetch data from chatgpt
const { getAnswerFromChatGPT } = require("./api/chatgpt");

const app = express();
const port = process.env.PORT || 3001;

// use cors
app.use(cors());

// create a route
app.get("/recipe", async (req, res) => {
  const response = await getAnswerFromChatGPT(req.query.question);
  res.send(response);
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
