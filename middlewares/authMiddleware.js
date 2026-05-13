const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");


const authMiddleware = asyncHandler(async (req,res,next) => {
    
    const token = req.headers.authorization;

    if(!token) {
        throw new Error(
            "Token missing"
        );
    };
    const jwtToken = token.split(" ")[1];

    const decoded = jwt.verify(jwtToken,process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
});


exports.authMiddleware =  authMiddleware ;