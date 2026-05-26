const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");


const authMiddleware = asyncHandler(async (req,res,next) => {

    const token = req.cookies.token;

    if(!token) {
        throw new Error(
            "Login first"
        );
    };



    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    
    req.userId = decoded.id;


    next();
});


exports.authMiddleware =  authMiddleware ;