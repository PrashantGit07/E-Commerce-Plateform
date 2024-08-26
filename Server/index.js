import express from "express";
import ConnectDb from "./Config/ConnectDb.js";
import dotenv from "dotenv"
import morgan from "morgan";
import authRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import categoryRoute from "./routes/CategoryRoutes.js"
import cartRoute from "./routes/CartRoutes.js"
import bodyParser from "body-parser";
import cors from "cors"
import payment from "./routes/PaymentRoutes.js"
dotenv.config();
//rest objects

const app = express();

//database connection
ConnectDb();


//middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
//rest api

app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute)
app.use('/api/product', ProductRoute);
app.use('/api/cart', cartRoute)
app.use('/api/payment/make-payment', payment)
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