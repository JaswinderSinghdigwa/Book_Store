"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUser = exports.getAllUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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

var newUser = function newUser(userdetail) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve, reject) {
      var hash;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return bcrypt.hash(userdetail.password, 10);

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
};

exports.newUser = newUser;