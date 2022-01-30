"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = exports.getAllUsers = void 0;

var _user = _interopRequireDefault(require("../models/user.model"));

//get all users
var getAllUsers = function getAllUsers() {
  return new Promise(function (resolve, reject) {
    _user["default"].find().then(function (data) {
      resolve(data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}; //create new user


exports.getAllUsers = getAllUsers;

var newUser = function newUser(body) {
  return new Promise(function (resolve, reject) {
    _user["default"].create(body).then(function (data) {
      resolve(data);
    })["catch"](function (error) {
      reject(error);
    });
  });
};

exports.newUser = newUser;