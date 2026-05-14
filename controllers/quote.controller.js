const Quote = require("../models/Quote");
const asyncHandler = require("../utils/asyncHandler");
const  imageKit  = require("../config/imagekit");

// CREATE QUOTE
exports.createQuote = asyncHandler(async (req,res) => {
    // TEXT 
    const { text } = req.body;

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

    // console.log(req.userId.id);
    

    const quotes = await Quote.find().populate("userId", "name email profilePic")
    .sort({
        createdAt : -1
    });

    res.status(200).json({
        success : true,
        data : quotes
    })
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

exports.getUserQuote = asyncHandler(async (req,res) => {
    
    const userQuotes = await Quote.find({userId:req.userId});

    if(!userQuotes){
        res.status(400);
        throw new Error(
            "You have not created any Quote"
        )
    }

    res.status(200).json({
        succes:true,
        userQuotes
    });

})