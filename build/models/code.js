"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

/* eslint-disable prettier/prettier */
var codeSchema = new _mongoose.Schema({
  email: {
    type: String
  },
  resetcode: {
    type: String
  },
  expireAt: {
    type: Date,
    "default": Date.now,
    index: {
      expireAfterSeconds: 1800
    }
  }
});

var _default = (0, _mongoose.model)('code', codeSchema);

exports["default"] = _default;