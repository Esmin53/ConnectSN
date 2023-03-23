require("dotenv").config();
const express = require("express");
const connectdb = require("./db/connectdb");
const {verifyToken, verifyTokenAndUser} = require("./middleware/authorization");
const cors = require("cors");
const PORT = process.env.PORT || 6001;

// Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(express.json());

//ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);

const start = () => {
    connectdb(process.env.MONGO_URI).then(() => {
        app.listen(process.env.PORT, () => console.log(`Server is listening on port ${PORT}...`));
    });   
}
start(); 
