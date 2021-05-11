const { check, validationResult } = require('express-validator')

exports.validateSignUpReq = [
    check('firstName')
    .notEmpty()
    .withMessage("First Name is required"),
    check('lastName')
    .notEmpty()
    .withMessage("Last Name is required"),
    check('userName')
    .notEmpty()
    .withMessage("User Name is required"),
    check('email')
    .isEmail()
    .withMessage("Valid Email is required"),
    check('password')
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 character long")
 ]

exports.validateSignInReq = [
    check('email')
    .isEmail()
    .withMessage("Valid Email is required"),
    check('password')
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 8 character long")
 ]

exports.isReqValidate = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) 
        return res.status(400).json({ errors: errors.array()[0].msg })
    next()
}
