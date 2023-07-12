const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "user"
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "article"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})



module.exports = mongoose.model("comment", CommentSchema)