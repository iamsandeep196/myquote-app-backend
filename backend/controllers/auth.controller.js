const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const { registerValidation , loginValidation } = require("../validations/user.validation");
const imageKit = require("../config/imagekit");
const Quote = require("../models/Quote");


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

    

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });

    res.status(200).json({
        success : true,
        message : "Login successful"
    });


});
// LOGUT USER
exports.userLogout = asyncHandler(async (req,res) => {

    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
    res.status(200).json({
        success:true,
        message:"Logout successfully"
    });
});
// GET ALL USERS
exports.getAllUsers = asyncHandler(async (req,res) => {


    const users = await User.find().select("name email isFollowing followers").populate("followers","name email")
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
// TOGGLE FOLLOWING
exports.toggleFollowing = asyncHandler(async (req,res) => {

    const { id } = req.params;

    const user = await User.findById(id);

    // current logged in user
    const currentUser = await User.findById(req.userId);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    // prevent self follow
    if(id === req.userId.toString()){
        res.status(400);
        throw new Error("You can't follow yourself");
    }

    // check already following
    const isAlreadyFollowing = user.followers.some(
        (f) => f.toString() === req.userId.toString()
    );

    const userName = user.name;

    // UNFOLLOW
    if(isAlreadyFollowing){

        user.followers.pull(req.userId);
        currentUser.following.pull(id);

        await user.save();
        await currentUser.save();

        return res.status(200).json({
            success : true,
            message : `You have unfollowed ${userName}`,
            followers : user.followers,
            isFollowing : false
        });
    }

    // FOLLOW
    user.followers.addToSet(req.userId);
    currentUser.following.addToSet(id);

    await user.save();
    await currentUser.save();

    

    

    return res.status(200).json({
        success : true,
        message : `You have started following ${userName}`,
        followers : user.followers,
        isFollowing : true
    });
    
   

});
// GET USER FOLLOWING
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
// SEARCH USER
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
// GET ME
exports.getMe = asyncHandler(async (req,res) => {
    
    const user = await User.find({userId : req.userId})
    res.status(200).json({
        success : true,
        user: req.userId
    })
})
// UPDATE PROFILE
exports.updateProfile = asyncHandler(async (req,res) => {
    
    // const { bio } = req.body;
    const user = await User.findById(req.userId);

    if(user.profilePicFileId){
        await imageKit.deleteFile(user.profilePicFileId)
    }


    const updateData = {};

    if(req.body.bio){
        updateData.bio = req.body.bio;
    }

    if(req.file){
        const uploadedImage = await imageKit.upload({
        file :
        req.file.buffer,

        fileName :
        req.file.originalname
       });

       updateData.profilePic = uploadedImage.url;
       updateData.profilePicFileId = uploadedImage.fileId
    }

   
    // const uploadedImage = await imageKit.upload({
    //     file :
    //     req.file.buffer,

    //     fileName :
    //     req.file.originalname
    // });

    const updatedProfile = await User.findByIdAndUpdate(
        req.userId,
        updateData
       ,
        {
            returnDocument : 'after'
        }
    ).select("-password")

    await updatedProfile.save();

    res.status(200).json({
        success : true,
        message : "updated successfully",
        profile : updatedProfile
    })

})
// LOGGED IN PROFILE 
exports.getMyProfile = asyncHandler(async (req,res) => {

    const user = await User.findById(req.userId);
    const totalPosts = await Quote.countDocuments({userId:req.userId});
    const myProfile = {
        user_id : user._id,
        userName : user.name,
        userBio : user.bio,
        userFollowers : user.followers.length,
        userFollowings : user.following.length,
        userProfilePic : user.profilePic,
        userProfilePicFileId : user.profilePicFileId,
        userPosts : totalPosts
    }

    res.status(200).json({
        success: true,
        profile : myProfile
    })
})
// REMOVE PROFILEPIC
exports.removeProfilePic = asyncHandler(async (req,res) => { 

    const user = await User.findById(req.userId);

    if(user.profilePic === ""){
        return res.status(404).json({
            success : false,
            message : "Profile pic already removed"
        })
    }

    if(!user) {
        return res.status(404).json({
            success : false,
            message : "User not found"
        })
    }
    const removeProfilePic = await User.findByIdAndUpdate(
        req.userId,
        {
            $unset : {
                profilePic : "",
                profilePicFileId : ""
            }
        }
    );

    await imageKit.deleteFile(user.profilePicFileId);

    await user.save();

    res.status(200).json({
        success : true,
        message : "profile pic deleted"
    })
     

})

// GETTING USER PROFILE
exports.getUserProfile = asyncHandler(async(req,res) => {
    const { id } = req.params;

    const user = await User.findById(id)
    .select("name bio profilePic followers following").sort({createdAt : -1})
    const totalPosts = await Quote.countDocuments({
        userId : id
    });
    
    const userQuotes = await Quote.find({userId : id});

    if(!user){
        throw new Error("User not found");
    }

    const userData = {
        userProfile : user.profilePic,
        username : user.name,
        userBio : user.bio,
        userFollowers : user.followers.length,
        userFollowings : user.following.length,
        userPosts : totalPosts,
        userQuotes : userQuotes,
        userId : id
    }

    res.status(200).json({
        success : true,
        userData

    });
})

// FORGOT PASSWORD 
exports.forgotPassword = asyncHandler(async(req,res) => {
    const { email } = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw new Error (
            "User not found"
        )
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now()+15*60*1000;
    await user.save();

    const resetUrl = `http://localhost:3000/api/auth/reset-password/${token}`;

    await sendEmail({
        email:user.email,
        subject:"Reset Password",
        html:`
        <h2>Reset Password</h2>

        <p>Click below link</p>
        <a href="${resetUrl}">"${resetUrl}"</a>
        
        `
    })

    res.status(200).json({
        success:true,
        message:"Reset email sent",
        reset_link:resetUrl
    })

})

// RESET PASSWORD 
exports.resetPassword = asyncHandler(async(req,res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpire:{$gt:Date.now()}
    })

    if(!user) {
        throw new Error(
            "Token Expired"
        )
    }

    user.password = await bcrypt.hash(password,10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success:true,
        message:"Password has been updated!"
    })
})