const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { registerValidation , loginValidation } = require("../validations/user.validation");


// REGISTER USER
exports.registerUser = asyncHandler( async (req,res) => {


    const { error } = registerValidation.validate(req.body);
    if(error) {
        return res.status(400).json({
            success : false,
            message : error.details[0].message
        });
    }
    
    const { name , email , password } = req.body;

    const alreadyExists = await User.findOne({email});

    if(alreadyExists) {
        res.status(400);
        throw new Error(
            "User already exists"
        )
    }
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashPassword
    });

    res.status(201).json({
        success : true,
        message : "User registered",
        user
    });
});

// LOGIN USER 

exports.loginUser = asyncHandler(async (req,res) => {

    const { error } = loginValidation.validate(req.body);

    if(error){

        return res.status(400).json({
            success:false,
            message : error.details[0].message
        });
    }
    
    const { email , password } = req.body;

    const user = await User.findOne({email});
    
    if(!user){
        res.status(404);
        throw new Error(
            "User not found"
        )
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(401);
        throw new Error(
            "Invalid credentials"
        );
    };

    const token = jwt.sign(
        {
            id : user._id
        },
        process.env.SECRET_KEY,
        {
            expiresIn:"7d"
        }
    )

    

    res.cookie("token",token);

    res.status(200).json({
        message : "Login successful"
    });


});


exports.userLogout = asyncHandler(async (req,res) => {

    res.clearCookie("token");
    res.status(200).json({
        success:true,
        message:"Logout successfully"
    });
});



// get all users
exports.getAllUsers = asyncHandler(async (req,res) => {


    const users = await User.find().select("name email followers");
    if(!users) {
        throw new Error(
            "Their is no users"
        )
    }
    res.status(200).json({
        success : true,
        message : "All users data",
        users
    })

})

exports.toggleFollowing = asyncHandler(async (req,res) => {
    
    // userId for whom we want to follow
    const { id } = req.params;
    const user = await User.findById(id);


    if(!user){
        res.status(400);
        throw new Error(
            "User not found"
        );
    }
    // check if user has already followed the user then unfollow
    if(user.followers.includes(req.userId)){
        user.followers.pull(req.userId);
        await user.save();

        return res.status(200).json({
            success : true,
            message : "You have unfollowed the user",
            followers : user.followers
        });

    }
    // following the user 
    user.followers.addToSet(req.userId);
    await user.save();

    res.status(200).json({
        success : true,
        message : "you have followed the user",
        follower : user.followers
    });

});