const express = require('express')
const { signup, signin, requireSignin } = require('../controllers/auth')
const { validateSignInReq, isReqValidate, validateSignUpReq } = require('../validator/auth')
const router = express.Router()

router.post('/signin', validateSignInReq, isReqValidate, signin)

router.post('/signup', validateSignUpReq, isReqValidate, signup)

// router.post('/profile', requireSignin, (req, res) => {
   // res.status(200).json({ user: 'profile' })
// })

module.exports = router