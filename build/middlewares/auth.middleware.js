"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRole = void 0;

var setRole = function setRole(role) {
  return function (req, res, next) {
    console.log('role ', role);
    req.body.role = role;
    next();
  };
};

exports.setRole = setRole;