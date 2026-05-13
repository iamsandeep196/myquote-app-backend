const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        trim : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    quoteId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quote",
        required : true
    }
},{timestamps:true});

module.exports = mongoose.model("Comment",commentSchema);