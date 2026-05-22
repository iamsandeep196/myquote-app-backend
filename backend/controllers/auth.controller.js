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

    const userData = {
        _id : user._id,
        name : user.name,
        email : user.email,
        followers : user.followers
    };

    res.status(201).json({
        success : true,
        message : "User registered successfully",
        user : userData
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
        success : true,
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


    const users = await User.find().select("name email followers").populate("followers","name email")
    .populate("following","name email");
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

    // current user
    const currentUser = await User.findById(req.userId);


    if(!user){
        res.status(400);
        throw new Error(
            "User not found"
        );
    }

// check if user try to follow himself
    if(id === req.userId) {
        // res.status(400);
        throw new Error(
            "You can't follow yourself"
        )
    }


    // check if user has already followed the user then unfollow
    if(user.followers.includes(req.userId)){    

        user.followers.pull(req.userId);
        currentUser.following.pull(id);
        await user.save();
        await currentUser.save();

        return res.status(200).json({
            success : true,
            message : "You have unfollowed the user",
            followers : user.followers
        });

    }

    // following the user 
    user.followers.addToSet(req.userId);
    currentUser.following.addToSet(id);
    await user.save();
    await currentUser.save();

    res.status(200).json({
        success : true,
        message : "you have followed the user",
        follower : user.followers
    });

});

exports.getUserFollowing = asyncHandler(async (req,res) => {
    
    const user = await User.findById(req.userId).select("name email following")
    .populate("following", "name email");


    if(user.following.length > 0){
       return res.status(200).json({
            success : true,
            message : "you started following the user",
            user
        })
    }

    if(user.following.length === 0){
        console.log(user.following.length);

        return res.status(200).json({
            success:true,
            message:"you are not following any one"
        })
    }

    user.following.pull(req.userId);
    await user.save();

    res.status(200).json({
        success : true,
        user
    });   

});

exports.searchUser = asyncHandler(async (req,res) => {

    const keyword = req.query.name;

    const user = await User.find({
        name : {
            $regex : `^${keyword}`,
            $options :"i"
        }
    }).select("-password");

    if(!user) {
        res.status(400).json({
            success : false,
            message : "User not found",
        });
    }

    res.status(200).json({
        success : true,
        message : "All users",
        user
    });

});