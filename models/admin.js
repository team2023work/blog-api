const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
 
const AdminSchema = mongoose.Schema({
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

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})
 

// hash Password
AdminSchema.methods.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// compare Password
AdminSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("admin", AdminSchema)