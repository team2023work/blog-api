const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true, 
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }, 

    phone: {
        type: String,
        required: false,
        trim: true, 
    },

    photo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref : "media",
        default: "64355651eba58341e6576b33"
    },

    birthDay: {
        type: Date,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
 
// create Index
UserSchema.index({ "localisation" : "2dsphere" })

// hash Password
UserSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
 
// compare Password
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("user", UserSchema)