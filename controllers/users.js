const UsersService = require("../services/users")
const codes = require("../common/codes");

 
// get user
const Get = (req, res) => {
    const { $sort, $limit, $skip, $filter, $expend, $q, $longitude, $latitude } = req.query

    UsersService.Get($sort, $limit, $skip, $filter, $expend, $q, $longitude, $latitude ).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}
 
// me
const Me = (req, res) => {

    const user = req.user

    if (user) {
        res.status(codes.ok).json({ result: user })
    } else {
        res.status(codes.badRequest).json({ err: true, msg: "empty" })
    }

}



// login
const Login = (req, res) => {
    const { email, password } = req.body

    UsersService.Login(email, password).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// signup
const Signup = (req, res) => { 
    const { fullname, password, email } = req.body

    UsersService.Signup(fullname, password, email ).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


// edit User
const Edit = (req, res) => {
    const { fullname, email, phone, photo, birthDay } = req.body
    const { id } = req.params
    
    UsersService.Edit(id, fullname, email, phone, photo, birthDay).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}

// reset password
const Reset = (req, res) => {
    const { oldPass, newPass } = req.body
    const { id } = req.params

    UsersService.Reset(id, oldPass, newPass).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


// forgot Password User
const Forgot = (req, res) => {
    const { email } = req.body

    UsersService.Forgot(email).then(result => {
        res.status(codes.ok).json({ result })
    }).catch(err => {
        res.status(codes.badRequest).json({ err: true, msg: err?.message || err })
    })
}


module.exports = { Get , Edit, Login, Signup, Forgot, Me, Reset }