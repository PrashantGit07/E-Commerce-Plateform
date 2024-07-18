import express from "express";
import ConnectDb from "./Config/ConnectDb.js";
import dotenv from "dotenv"
import morgan from "morgan";
import authRoute from "./routes/AuthRoute.js";
dotenv.config();
//rest objects

const app = express();

//database connection
ConnectDb();


//middleware
app.use(express.json())
app.use(morgan("dev"))

//rest api

app.use('/api/register', authRoute);
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to the My Project"
    })
})
//Port
const Port = process.env.PORT

app.listen(Port, () => {
    console.log("Server started running on port " + Port);

})