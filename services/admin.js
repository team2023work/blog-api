const AdminsModel = require("../models/admin")
const { OC, FC, QC } = require("../common/getChecker")
const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
 
// get admin
const Get = ($sort, $limit, $skip, $filter, $q ) => {

    return new Promise((resolve, reject) => { // get admin

        AdminsModel.find({ ...QC("admin", $q), ...FC($filter) } , {}, OC($skip, null, $sort))
            .then(admins => {

                resolve({ sort: $sort, skip: $skip, limit: $limit, value: admins.slice(0, $limit), count: admins.length })

            }).catch(err => { reject(err) })

    })
}



// create
const Create = (fullname, password, email) => {

    return new Promise((resolve, reject) => { // check email

        AdminsModel.findOne({}).where("email").equals(email).then(user => {

            if (user) {
                reject("the email already exists")
            } else {

                const newUser = new AdminsModel({ fullname, email, password: new AdminsModel().hashPassword(password) })

                newUser.save()
                    .then(doc => {
                        resolve(doc.id)

                    }).catch(err => { reject(err) })

            }
        }).catch(err => { reject(err) })

    })
}



// login  
const Login = (email, password) => {

    return new Promise((resolve, reject) => { // check details

        AdminsModel.findOne({}).where("email").equals(email).then(user => {

            if (!user || !user.comparePassword(password)) {
                reject("email or password is incorrect")
            } else {
                    
                const TOKEN = JWt.sign({ ...user._doc, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" })
                resolve({ TOKEN })
        
            }
        }).catch(err => { reject(err) })

    })
}


// edit User
const Edit = (id, fullname, email) => {

    return new Promise((resolve, reject) => { // update user

        // check id
        AdminsModel.findByIdAndUpdate({}, {
            fullname, email, updatedAt: Date.now()
        }).where("_id").equals(id) .then(user => {

                if (!user) {
                    reject("did not match any document")
                } else {
                    resolve("modified")
                }
            }).catch(err => { reject(err) })

    })
}


// reset password
const Reset = (id, oldPass, newPass) => {

    return new Promise((resolve, reject) => { // update user

          // check id
          AdminsModel.findOne({}).where("_id").equals(id).then(user => {
                if (!user) {
                    reject("did not match any document")
                } else {
                    
                    if (!user.comparePassword(oldPass)) {
                        reject("old password is incorrect")

                    } else {

                        // update
                        user.password = user.hashPassword(newPass)
                        user.updatedAt = Date.now()
                        user.save()

                        resolve("modified")

                    }

                }
            }).catch(err => { reject(err) })

    })
}




// forgot Password User
const Forgot = (email) => {

    return new Promise((resolve, reject) => { // update user

        // check email
        AdminsModel.findOne({}).where("email").equals(email)
            .then(user => {

                if (!user) {
                    reject("email not exist")
                } else {
                    const password = (Math.random() + 1).toString(36).substring(4)

                    user.password = user.hashPassword(password)

                    user.save()

                    const html = messages.resetPasswordMsg(password)

                    mailer.sendMAIL(email, "new Password", html)
                    .then((succ) => resolve("sent"))
                    .catch(error => reject(error))

                }
            }).catch(err => { reject(err) })

    })
}
 


module.exports = { Get, Edit, Reset, Login, Create, Forgot }