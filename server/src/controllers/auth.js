const mongoose = require('mongoose')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if(user) 
                return res.status(200).json({
                    message: "User already available!"
                })
            
            const { firstName, lastName, userName, email, password } = req.body

            const _user = new User({
                firstName,
                lastName,
                userName,
                email,
                password
            })

            _user.save((err, data) => {
                if(err) 
                    return res.status(400).json({
                        message: err.message
                    })
                
                if(data)
                    return res.status(201).json({
                        message: "User created successfully!"
                    })
            })
        })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) =>{
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                 const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
                 const { _id, firstName, lastName, userName, email, role, fullName } = user;
                 res.status(200).json({
                     token, 
                     user: {
                        _id, firstName, lastName, userName, email, role, fullName
                     }
                 })
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        }else{
            return res.status(400).json({message: 'something went wrong'})
        }
    })
}


exports.requireSignin = (req, res, next) => {
    const token= req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next();
    //jwt.decode()
}