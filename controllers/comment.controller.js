const Comment = require("../models/Comment");
const Quote = require("../models/Quote");
const asyncHandler = require("../utils/asyncHandler");

// ADD COMMENT
exports.addComment = asyncHandler(async (req,res) => {
    
    const { comment } = req.body;
    const { quoteId } = req.params;
    

    if(!comment){
        res.status(400);
        throw new Error (
            "Commnet is required"
        )
    }

    const newComment = await Comment.create({
        comment,
        userId:req.userId,
        quoteId:quoteId
    });

    await Quote.findByIdAndUpdate(
        quoteId,
        {
            $push : {
                comments : newComment
            }
        }
    );

    res.status(201).json({
        success:true,
        message:"Comment add successfully",
        comments:newComment
    });

});

// DELETE COMMENT
exports.deleteComment = asyncHandler(async (req,res) => {

    const { commentId } = req.params;
    
    const userComment = await Comment.findByIdAndDelete(commentId);

    if(!userComment){
        res.status(400);
        throw new Error(
            "There is no comments on this Quote"
        )
    }

    res.status(200).json({
        success:true,
        message : "comment deleted successfully"
    });

});
