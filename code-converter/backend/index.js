const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { codeRoute } = require("./routes/code.routes");

const app = express();
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 8, // Limit each IP to 8 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.get("/", (req, res) => {
    try {
        res.status(200).send({ "ok": true, "message": "Welcome to code converter backend" })
    } catch (error) {
        res.status(400).send({ "ok": false, "message": error.message })
    }
})

// app.use(limiter)

app.use("/code", codeRoute)


app.listen(5000, () => {
    console.log("Server running at PORT 5000");
})