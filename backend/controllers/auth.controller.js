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
    await sendEmail({
  email: user.email,
  subject: "🎉 Welcome to MyQuote",
  html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome to MyQuote</title>
</head>

<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.1);">

<!-- Header -->
<tr>
<td align="center" style="background:#14532d;padding:45px 20px;">

<div style="width:80px;height:80px;border-radius:50%;background:#22c55e;color:#fff;font-size:36px;font-weight:bold;line-height:80px;text-align:center;">
💬
</div>

<h1 style="margin:20px 0 10px;color:#ffffff;font-size:34px;">
MyQuote
</h1>

<p style="margin:0;color:#d1fae5;font-size:16px;">
Express what you think...
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:45px 35px;color:#333;">

<h2 style="margin-top:0;color:#14532d;">
Welcome, ${user.name}! 🎉
</h2>

<p style="font-size:16px;line-height:28px;color:#555;">
Thank you for joining <strong>MyQuote</strong>.
Your account has been created successfully.
</p>

<p style="font-size:16px;line-height:28px;color:#555;">
Now you can:
</p>

<table cellpadding="8">
<tr>
<td>✅</td>
<td>Create beautiful quotes</td>
</tr>

<tr>
<td>❤️</td>
<td>Like and comment on quotes</td>
</tr>

<tr>
<td>👥</td>
<td>Follow your favorite creators</td>
</tr>

<tr>
<td>🔔</td>
<td>Receive real-time notifications</td>
</tr>

<tr>
<td>🌍</td>
<td>Share your thoughts with everyone</td>
</tr>
</table>

<div style="text-align:center;margin:40px 0;">
<a href="https://myquote.vercel.app"
style="
background:#16a34a;
color:#ffffff;
text-decoration:none;
padding:16px 40px;
border-radius:8px;
font-size:17px;
font-weight:bold;
display:inline-block;">
Start Exploring
</a>
</div>

<p style="font-size:15px;color:#666;line-height:26px;">
We're excited to have you in our community.
Keep sharing inspiring quotes and connect with people around the world.
</p>

<p style="margin-top:35px;font-size:15px;color:#444;">
Regards,<br>
<strong>Team MyQuote 💚</strong>
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center" style="background:#f8fafc;padding:25px;">

<p style="margin:0;color:#888;font-size:13px;">
© ${new Date().getFullYear()} MyQuote. All Rights Reserved.
</p>

<p style="margin-top:10px;color:#999;font-size:12px;">
This email was sent because you successfully created a MyQuote account.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
});

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
        secure:true,
        // sameSite:"lax"
        sameSite:"none",
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
       return res.status(404).json({
        success : false,
        message:"User not found"
       })
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now()+15*60*1000;
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    await sendEmail({
        email:user.email,
        subject:"Reset Password",
        html:`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f4f4;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center" style="background:#111827;padding:35px;">
                <h1 style="color:#ffffff;margin:0;font-size:32px;">
                  MyQuote
                </h1>
                <p style="color:#d1d5db;margin-top:8px;font-size:15px;">
                  Express what you think...
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">

                <h2 style="margin-top:0;color:#111827;">
                  Reset Your Password
                </h2>

                <p style="font-size:16px;color:#555;line-height:28px;">
                  Hi,
                </p>

                <p style="font-size:16px;color:#555;line-height:28px;">
                  We received a request to reset your password for your
                  <strong>MyQuote</strong> account.
                </p>

                <p style="font-size:16px;color:#555;line-height:28px;">
                  Click the button below to create a new password.
                </p>

                <div style="text-align:center;margin:40px 0;">
                  <a href="${resetUrl}"
                    style="
                      background:#2563eb;
                      color:#ffffff;
                      padding:16px 40px;
                      text-decoration:none;
                      border-radius:10px;
                      font-size:16px;
                      font-weight:bold;
                      display:inline-block;
                    ">
                    Reset Password
                  </a>
                </div>

                <p style="font-size:14px;color:#777;line-height:24px;">
                  This password reset link will expire in
                  <strong>15 minutes</strong>.
                </p>

                <p style="font-size:14px;color:#777;line-height:24px;">
                  If the button doesn't work, copy and paste this URL into your browser:
                </p>

                <p style="word-break:break-all;font-size:13px;color:#2563eb;">
                  ${resetUrl}
                </p>

                <hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

                <p style="font-size:14px;color:#888;">
                  If you didn't request a password reset, you can safely ignore this email.
                  Your password will remain unchanged.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f9fafb;padding:25px;">

                <p style="margin:0;color:#6b7280;font-size:14px;">
                  © ${new Date().getFullYear()} MyQuote. All Rights Reserved.
                </p>

                <p style="margin-top:10px;color:#9ca3af;font-size:12px;">
                  Made with ❤️ by MyQuote Team
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
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

// FOLLOERS LISTS

exports.followersLists = asyncHandler(async(req,res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if(!user){
        throw new Error(
            "User not found"
        )
    }

    if(user.followers.length === 0){
        return res.status(200).json({
            success:true,
            message:"No followers",
            followers:user.followers.length
        })
    }

    res.status(200).json({
        success:true,
        message:"followers lists",
        followers:user.followers
    })

})

exports.followingsLists = asyncHandler(async(req,res) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if(!user) {
        throw new Error(
            "User not found"
        )
    }

    if(user.following.length === 0){
        return res.status(200).json({
            success:true,
            message: "No Followings",
            following:user.following.length
        })
    }

    res.status(200).json({
        success:true,
        message:"followings lists",
        following:user.following
    })
})