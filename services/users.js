const UsersModel = require("../models/users")
const { OC, FC, QC } = require("../common/getChecker")
const messages = require("../common/messages")
const mailer = require("../common/mailer")
const JWt = require("jsonwebtoken")
 

const Get = ($sort, $limit, $skip, $filter, $expend, $q) => {

    return new Promise((resolve, reject) => { // get user
        
        UsersModel.find({ ...QC("user", $q), ...FC($filter) }, {}, OC($skip, null, $sort)).populate($expend)
            .then(users => {

            resolve({ sort: $sort, skip: $skip, limit: $limit, value: users.slice(0, $limit), count: users.length })

            }).catch(err => { reject(err) })

    })
}

 
// signup
const Signup = (fullname, password, email) => {

    return new Promise((resolve, reject) => { // check email

        UsersModel.findOne({}).where("email").equals(email).then(user => {

            if (user) {
                reject("the email already exists")
            } else {

                const newUser = new UsersModel({
                    fullname, email, password: new UsersModel().hashPassword(password)
                })



                newUser.save()
                    .then(doc => {

                        resolve(doc._id)

        
                      }).catch(err => { reject(err) })

            }
        }).catch(err => { reject(err) })


    })
}



// login  
const Login = (email, password) => {

    return new Promise((resolve, reject) => { // check details

        UsersModel.findOne({}).where("email").equals(email).then(user => {

            if (!user || !user.comparePassword(password)) {
                reject("email or password is incorrect")
            } else {

                    const TOKEN = JWt.sign({ ...user._doc, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" })
                    resolve({ TOKEN })
                
            }
        }).catch(err => { reject(err) })

    })
}


// edit User
const Edit = (id, fullname, email, phone, photo, birthDay) => {

    return new Promise((resolve, reject) => { // update user

        // check id
        UsersModel.findByIdAndUpdate({}, {
            fullname, email, phone, photo, birthDay, updatedAt: Date.now()
        }).where("_id").equals(id).then(user => {

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
          UsersModel.findOne({}).where("_id").equals(id).then(user => {
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
        UsersModel.findOne({}).where("email").equals(email)
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
 


module.exports = { Get, Edit, Reset, Login, Signup, Forgot }