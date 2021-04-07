
const { body, validationResult } = require('express-validator');
let User = require("../../models/user");
let Note = require("../../models/note");
var validator = require('validator');
const userRegistrationValidationRules = () => {

  return [
    // first name must not be empty, >6 & <25 characters
    body('FirstName').notEmpty().withMessage(' error: Field should not be empty success: 0').isAlpha().withMessage('should only contain alphabets').isLength({ max: 50 }).withMessage('should not exceed 25 characters'),
    body('LastName').notEmpty().withMessage('Field should not be empty').isAlpha().withMessage('should only contain alphabets').isLength({ max: 50 }).withMessage('should not exceed 25 characters'),
    body('Email').notEmpty().withMessage('Field should not be empty').isEmail().withMessage('must be a valid email address'),
    
    body('PasswordConfirmation').custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error('Password confirmation does not match password');
        }
    
        // Indicates the success of this synchronous custom validator
        return true;
      }),
     
]
}


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({             //The HyperText Transfer Protocol (HTTP) 422 Unprocessable Entity response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions.
    errors: extractedErrors,
  })
}

module.exports = {
  userRegistrationValidationRules,
  validate,
  
}
