const express = require("express");
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.get("/", (req, res) => {
  try {
    res.sendFile(__dirname+"/public/index.html");
  } catch (error) {
    res.status(404).send({ "ok": false, "message": error.message })
  }
})

// Handle incoming messages
app.post('/message', limiter,async (req, res) => {
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
    res.send({ ok:true,message: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ ok:false,error: error.message });
  }
});

app.listen(5000, () => {
  console.log("server started")
})