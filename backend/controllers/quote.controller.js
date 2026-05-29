const Quote = require("../models/Quote");
const asyncHandler = require("../utils/asyncHandler");
const  imageKit  = require("../config/imagekit");
const fs = require("fs");

// const buffImage = fs.readFileSync("./public/default.png")



// CREATE QUOTE
exports.createQuote = asyncHandler(async (req,res) => {
    // TEXT 
    const { text } = req.body;
    



    if(!req.file){

        req.file = {
            originalname: "default.png",
            mimetype: "image/png",
            buffer: fs.readFileSync("./public/default.png")
        }


    }


    //  const uploadedImage = await imageKit.upload({
    //     file:
    //     req.file.buffer,

    //     fileName :
    //     req.file.originalname

    // });

    // IMAGE UPLOAD
    const uploadedImage = await imageKit.upload({
        file:
        req.file.buffer,

        fileName :
        req.file.originalname

    });
    


    // SAVE IN DB
    const quote = await Quote.create({
        text,
        backgroundImage:uploadedImage.url,
        userId : req.userId
    });
  
// RESPONSE
    res.status(201).json({
        success : true,
        message : "Quote created",
        quote
    });
});

// GET ALL QUOTES
exports.getQuotes = asyncHandler(async (req,res) => {


     const quotes = await Quote.find()
    .populate("userId", "name email followers following profilePic")
    .populate({
        path : "comments",
        populate:{
            path : "userId",
            select : "name profilePic"
        }
    })
    .populate("likes","name")
    .sort({
        createdAt : -1
    });

    const updatedQuotes = quotes.map((quote) => {

        const isFollowing = quote.userId.followers.some(
            (f) => f.toString() === req.userId
        );

        return {
            ...quote._doc,

            userId : {
                ...quote.userId._doc,
                isFollowing
            }
        };
    });
   

    res.status(200).json({
        success : true,
        data : updatedQuotes
    });
// });

    // console.log(req.userId.id);
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 4;

    // skip
    // const skip = (page - 1) * limit;

    // const quotes = await Quote.find().populate("userId", "name email followers following profilePic")
    // .populate({
    //     path : "comments",
    //     populate:{
    //         path : "userId",
    //         select : "name profilePic"
    //     }

    // })
    // .populate("likes","name")
    // .sort({
    //     createdAt : -1
    // });
    // // .skip(skip)
    // // .limit(limit);



    // res.status(200).json({
    //     success : true,
    //     data : quotes
    // })
});

// DELETE QUOTE
exports.deleteQuote = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const quote = await Quote.findById(id);

    if(!quote) {
        res.status(404);
        throw new Error(
            "Quote not found"
        )
    }
    // OWNER CHECK 
    if(quote.userId.toString() !== req.userId){
        throw new Error(
            "Unauthorized"
        )
    }
    await quote.deleteOne();

    res.status(200).json({
        success : true,
        message : "Quote deleted"
    })
})

// GET USER QUOTE
exports.getUserQuote = asyncHandler(async (req,res) => {
    
    const userQuotes = await Quote.find({userId:req.userId});
    const totalUserQuotes = await Quote.countDocuments({userId:req.userId});
    
    if(!userQuotes){
        res.status(400);
        throw new Error(
            "You have not created any Quote"
        )
    }

    res.status(200).json({
        succes:true,
        userQuotes,
        totalUserQuotes
    });

});

// LIKES
// exports.doLike = asyncHandler(async (req,res) => {
    
//     const { id } = req.params;

//     const quote = await Quote.findById(id);

//     if(!quote) {
//         res.status(400);
//         throw new Error(
//             "Quote not found"
//         )
//     }

//     if(quote.likes.includes(req.userId)){
//         const disLike = await Quote.findByIdAndUpdate(id , {
//             $pull : {
//                 likes : req.userId
//             }
//         });

//         res.status(201).json({
//             success : true,
//             message : "You have disliked the Quote",
//         });
//     }
//     else {
//         res.status(400);
//         throw new Error(
//             "You have not liked this quote"
//         )
//     }


//     const newLike = await Quote.findByIdAndUpdate(id,
//         {
//             $push : {
//                 likes : req.userId
//             }
//         }
//     )
//     res.status(201).json({
//         success : true,
//         message : "you have liked Quote",
//         likes : newLike
//     });

    
// });

// TOGGLE LIKE

exports.toggleLike = asyncHandler(async (req,res) => {
    
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if(!quote){
        res.status(400);
        throw new Error(
            "Quote not found"
        )
    }


// check if already like then do dislike
    if(quote.likes.includes(req.userId)){
        quote.likes.pull(req.userId);
        await quote.save();

        return res.status(200).json({
            success : true,
            message : "You have disliked the Quote",
            likes : quote.likes
        });
    }
    // set to like 
    quote.likes.addToSet(req.userId);
    await quote.save();


    res.status(200).json({
        success : true,
        message : "You have liked the Quote",
        likes : quote.likes
    });

});
