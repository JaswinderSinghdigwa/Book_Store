"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

/* eslint-disable prettier/prettier */
var bookValidator = function bookValidator(req, res, next) {
  var schema = _joi["default"].object({
    author: _joi["default"].string().required(),
    title: _joi["default"].string().required(),
    description: _joi["default"].string().required(),
    quantity: _joi["default"].number().required(),
    price: _joi["default"].number().required(),
    image: _joi["default"].string()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.bookValidator = bookValidator;