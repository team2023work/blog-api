const mongoose = require("mongoose")

const LikeSchema = mongoose.Schema({
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
    }
})


module.exports = mongoose.model("like", LikeSchema)