const express = require("express")
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const codeRoute = express.Router()

codeRoute.post("/convert/:language", async (req, res) => {
    try {
        const { code } = req.body;
        const { language } = req.params;
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const prompt = [
            {
                role: "system",
                content: "I want you to act as a fully functional code converter application, You will be provided with a code in one language and you need to convert it to another language."
            },
            {
                role: "user",
                content: `convert the given code to ${ language }: ${ code }`
            }
        ]
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: prompt,
        });
        const response = completion.data.choices[0].message.content;
        res.status(200).send({"ok":true, code: response})
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

codeRoute.post("/debug", async (req, res) => {
    try {
        const { code } = req.body;
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const prompt = [
            {
                role: "system",
                content: "I want you to act as a fully functional code debugger application, You will be provided with a block of code and I want you to debug the given code also give proper explaination of the bug, what changes you made and the new executable code."
            },
            {
                role: "user",
                content: `Debug the given code with proper explanation: ${ code }`
            }
        ]
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: prompt,
        });
        const response = completion.data.choices[0].message.content;
        res.status(200).send({"ok":true, code: response})
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

codeRoute.post("/quality", async (req, res) => {
    try {
        const { code } = req.body;
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const prompt = [
            {
                role: "system",
                content: "I want you to act as a fully functional code quality checker application, You will be provided with a block of code and I want you to check the quality of the code with respect to implementation, improvements and other industrial prespective."
            },
            {
                role: "user",
                content: `Check the quality of the given code: ${ code }`
            }
        ]
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: prompt,
        });
        const response = completion.data.choices[0].message.content;
        res.status(200).send({"ok":true, code: response})
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

module.exports = {
    codeRoute
}