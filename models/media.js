const mongoose = require("mongoose")

const mediaSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    type : { 
        type: String, 
        required: false, 
    } ,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("media", mediaSchema)