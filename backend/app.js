const express = require("express");
const connectDB = require("./config/db");
const  authRoute  = require("./routes/auth.routes");
const  quoteRoute  = require("./routes/quote.routes");
const commentRoute = require("./routes/comment.routes");
const  errorMiddleware  = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));




app.use("/api/auth",authRoute);
app.use("/api/quotes",quoteRoute);
app.use("/api/comments",commentRoute);





app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log("server is running");
})