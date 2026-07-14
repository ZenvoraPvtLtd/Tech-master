// NOTE:
// This project uses Joi for request validation (see the various *.validation.js files).
// The previous implementation tried to import `express-validator`, which is not installed.
// Keeping a lightweight middleware here so routes can still call it safely.

const validationMiddleware = (req, res, next) => {
  // If a previous middleware attached validation errors, return them.
  // Conventions used across codebases:
  //  - req.validationErrors (array)
  //  - req.errors (array)
  const errors = req.validationErrors || req.errors;

  if (Array.isArray(errors) && errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

export default validationMiddleware;

