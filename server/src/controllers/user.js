const mongoose = require('mongoose')
const User = require('../models/user')

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