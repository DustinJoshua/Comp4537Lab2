const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");

var cors = require("cors");
app.use(cors());

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(jsonParser);
app.use(urlencodedParser);

app.post("/chatbot", (req, res) => {
  const message = req.body.message;
  const number = message.match(/\d+/);
  if (number) {
    fetch(`http://numbersapi.com/${number}?type=trivia`)
      .then((response) => response.text())
      .then((data) => {
        res.json({
          text: data,
        });
      })
      .catch((error) => {
        res.json({
          text: "Sorry, I couldn't find any information about that number.",
        });
      });
  } else {
    res.json({
      text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
