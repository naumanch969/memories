import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import postRoutes from "./routes/post.js"
import userRoutes from "./routes/user.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })) //to limit the size of req.body to 30mb
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })) // i don t know
app.use(cors())
app.use("/posts", postRoutes)   // it should specify after app.use(cors())
app.use("/user", userRoutes)   // it should specify after app.use(cors())
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send("App is Working")
})


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"))
}


const COMPASS_URL = "mongodb://localhost:27017/Memories"
// process.env.CONNECTION_URL   -    COMPASS_URL
mongoose.connect(COMPASS_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is running on the port ${PORT}`)))
    .catch((err) => console.log(`error in connection to mongo ${err} and message ${err.message}`))

//  mongoose.set('useFindAndModify',false)