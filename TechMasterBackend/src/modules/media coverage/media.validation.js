import Joi from "joi";

export const createMediaValidation = Joi.object().unknown(true);