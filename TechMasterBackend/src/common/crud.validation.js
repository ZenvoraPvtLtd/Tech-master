import Joi from "joi";

export const commonValidation = ({
  required = [],
  optional = [],
}) => {
  const schema = {};

  required.forEach((field) => {
    schema[field] = Joi.any().required();
  });

  optional.forEach((field) => {
    schema[field] = Joi.any().allow("", null);
  });

  return Joi.object(schema);
};