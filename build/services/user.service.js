"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.newUser = exports.login = exports.getAllUsers = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user2 = require("../utils/user.util");

var _code = _interopRequireDefault(require("../models/code"));

/* eslint-disable no-unused-vars */

/* eslint-disable quotes */

/* eslint-disable prettier/prettier */

/* eslint-disable max-len */
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

var newUser = function newUser(userdetail) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var hash;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _bcrypt["default"].hash(userdetail.password, 10);

            case 2:
              hash = _context.sent;
              userdetail.password = hash;

              _user["default"].create(userdetail).then(function (data) {
                resolve(data);
              })["catch"](function (error) {
                reject(error);
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}; //Login Admin or User


exports.newUser = newUser;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var userPresent, match, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: info.email
            });

          case 2:
            userPresent = _context2.sent;

            if (!userPresent) {
              _context2.next = 15;
              break;
            }

            _context2.next = 6;
            return _bcrypt["default"].compare(info.password, userPresent.password);

          case 6:
            match = _context2.sent;

            if (!match) {
              _context2.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              email: userPresent.email,
              id: userPresent._id,
              role: userPresent.role
            }, process.env.SECRET_KEY);
            return _context2.abrupt("return", token);

          case 12:
            return _context2.abrupt("return", "Incorrect Password");

          case 13:
            _context2.next = 16;
            break;

          case 15:
            return _context2.abrupt("return", "Not Registered Yet");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x3) {
    return _ref2.apply(this, arguments);
  };
}(); //ForgotPassword for Admin or User


exports.login = login;

var forgotPassword = function forgotPassword(info) {
  return new Promise(function (resolve, reject) {
    _user["default"].findOne({
      email: info.email
    }, function (error, userPresent) {
      if (userPresent) {
        var mailResult = (0, _user2.sendResetEmail)(userPresent.email);
        resolve(mailResult);
      } else {
        reject("Not Registered Yet");
      }
    });
  });
}; //ResetPassword for Admin or User


exports.forgotPassword = forgotPassword;

var resetPassword = function resetPassword(credential) {
  return new Promise(function (resolve, reject) {
    _code["default"].findOne({
      email: credential.email,
      resetcode: credential.resetcode
    }).then( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        var hash;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _bcrypt["default"].hash(credential.newPassword, 10);

              case 2:
                hash = _context3.sent;

                _user["default"].findOneAndUpdate({
                  email: data.email
                }, {
                  password: hash
                }, {
                  "new": true
                }).then(function (data) {
                  resolve(data);
                })["catch"](function (error) {
                  reject("password is not update");
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }())["catch"](function (error) {
      reject("code expired");
    });
  });
};

exports.resetPassword = resetPassword;