"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = void 0;

var _multer = _interopRequireDefault(require("multer"));

/* eslint-disable prettier/prettier */
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
exports.upload = upload;