"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.newUser = exports.login = exports.getAllUsers = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var UserService = _interopRequireWildcard(require("../services/user.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-unused-vars */

/* eslint-disable quotes */

/* eslint-disable eqeqeq */

/* eslint-disable prettier/prettier */

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              UserService.getAllUsers().then(function (data) {
                res.status(_httpStatusCodes["default"].OK).json({
                  code: _httpStatusCodes["default"].OK,
                  data: data,
                  message: 'All users fetched successfully'
                });
              })["catch"](function (error) {
                next(error);
              });
            } catch (error) {
              next(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.getAllUsers = getAllUsers;

var newUser = function newUser(req, res, next) {
  try {
    var userdetail = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };
    UserService.newUser(userdetail).then(function (data) {
      res.status(_httpStatusCodes["default"].CREATED).json({
        code: _httpStatusCodes["default"].CREATED,
        data: data,
        message: 'User created successfully'
      });
    })["catch"](function (error) {
      next(error);
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to Login Admin and User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.newUser = newUser;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = {
              email: req.body.email,
              password: req.body.password
            };
            _context2.next = 4;
            return UserService.login(info);

          case 4:
            data = _context2.sent;

            if (data == "Not Registered Yet") {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Not Registered Yet'
              }); // eslint-disable-next-line quotes
            } else if (data == "Incorrect Password") {
              res.status(_httpStatusCodes["default"].UNAUTHORIZED).json({
                code: _httpStatusCodes["default"].UNAUTHORIZED,
                message: 'Incorrect Password'
              });
            } else {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Login Successful',
                token: data
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Controller to ForgotPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.login = login;

var forgotPassword = function forgotPassword(req, res, next) {
  try {
    var info = {
      email: req.body.email
    };
    UserService.forgotPassword(info).then(function (data) {
      res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Reset-code Sent to your Email'
      });
    })["catch"](function (error) {
      if (error == "Not Registered Yet") res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: 'Not Registered Yet'
      });
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to ResetPassword
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.forgotPassword = forgotPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var info;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              info = {
                email: req.body.email,
                newPassword: req.body.newPassword,
                resetcode: req.body.resetcode
              };
              UserService.resetPassword(info).then(function (data) {
                return res.status(_httpStatusCodes["default"].OK).json({
                  code: _httpStatusCodes["default"].OK,
                  message: 'Password reset successfull'
                });
              })["catch"](function (error) {
                if (error === "code expired") {
                  res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                    code: _httpStatusCodes["default"].NOT_FOUND,
                    message: 'Reset-code is expired, Request new Reset-code'
                  });
                }
              });
            } catch (error) {
              next(error);
            }

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function resetPassword(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;