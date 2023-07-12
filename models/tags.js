const mongoose = require("mongoose")

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,  
        trim: true,
        unique: true,
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


module.exports = mongoose.model("tag", TagSchema)