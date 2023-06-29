const express = require("express");
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname+"/public/index.html");
  } catch (error) {
    res.status(404).send({ "ok": false, "message": error.message })
  }
})

// Handle incoming messages
app.post('/message', async (req, res) => {
  const { message } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const prompt = [
    {
      role:"system",
      content:"I want you to act as a professional shyaar, and give the shyaari as per the words given to you, and also the words should be in the same language in which you have received the words."
    },
    {
      role:"user",
      content:message
    }
  ]
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });
    res.send({ message: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("server started")
})