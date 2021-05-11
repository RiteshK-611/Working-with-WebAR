const express = require('express')
const { signup, signin, requireSignin } = require('../../controllers/admin/auth')
const { validateSignInReq, isReqValidate, validateSignUpReq } = require('../../validator/auth')
const router = express.Router()

router.post('/admin/signin', validateSignInReq, isReqValidate, signin)

router.post('/admin/signup', validateSignUpReq, isReqValidate, signup)


module.exports = router