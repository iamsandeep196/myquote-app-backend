const mongoose = require("mongoose");


const quoteSchema = new mongoose.Schema({

    text : {
        type : String,
        required : true
    },
    
    backgroundImage : {
        type : String,
        default : ""
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
    ]

},{timestamps:true})

module.exports = mongoose.model("Quote",quoteSchema);