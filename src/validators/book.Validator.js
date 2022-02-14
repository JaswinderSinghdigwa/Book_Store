/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';

export const bookValidator = (req, res, next) => {
    const schema = Joi.object({
        author:Joi.string()
        .required(),
        title:Joi.string()
        .required(),
        description:Joi.string()
        .required(),
        quantity:Joi.number()
        .required(),
        price:Joi.number()
        .required(),
        image:Joi.string()
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
      next(error);
    } else {
      req.validatedBody = value;
      next();
    }
}