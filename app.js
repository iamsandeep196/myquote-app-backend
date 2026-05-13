const express = require("express");
const connectDB = require("./config/db");
const  authRoute  = require("./routes/auth.routes");
const  quoteRoute  = require("./routes/quote.routes");
const  errorMiddleware  = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());




app.use("/api/auth",authRoute);
app.use("/api/quotes",quoteRoute);





app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log("server is running");
})