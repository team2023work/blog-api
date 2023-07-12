const mongoose = require("mongoose")

const ArticleSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true, 
    }, 
    description: {
        type: String,
        required: true,  
        trim: true,
    },

    videoUrl: { 
        type: String,
        required: true,
        trim: true,
    },

    photo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "media"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "user"
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref : "category"
    },

    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tag"
    }],

    visible: {
        type: Boolean,
        required: true,
        trim: true
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


module.exports = mongoose.model("article", ArticleSchema)