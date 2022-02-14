"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatebook = exports.trashBook = exports.searchbook = exports.findBookById = exports.findAllbooks = exports.addbook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Book = _interopRequireDefault(require("../models/Book.model"));

/* eslint-disable no-unused-vars */

/* eslint-disable quotes */

/* eslint-disable eqeqeq */

/* eslint-disable max-len */

/* eslint-disable no-trailing-spaces */

/* eslint-disable prettier/prettier */
//Add book
var addbook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _Book["default"].create(info).then(function (data) {
                resolve(data);
              })["catch"](function (error) {
                reject(error);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addbook(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Get all books 


exports.addbook = addbook;

var findAllbooks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              _Book["default"].find().then(function (data) {
                resolve(data);
              })["catch"](function (error) {
                reject(error);
              });
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllbooks() {
    return _ref2.apply(this, arguments);
  };
}(); //getbook  BY Id


exports.findAllbooks = findAllbooks;

var findBookById = function findBookById(Id) {
  return new Promise(function (resolve, reject) {
    console.log("22", Id.id);

    _Book["default"].findById(Id.id).then(function (data) {
      resolve(data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}; //Update book 


exports.findBookById = findBookById;

var updatebook = function updatebook(info) {
  return new Promise(function (resolve, reject) {
    _Book["default"].findById(info.bookId).then( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(book) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(book != null)) {
                  _context3.next = 20;
                  break;
                }

                if (!(info.title !== undefined)) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 4;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  title: info.title
                }, {
                  "new": true
                });

              case 4:
                if (!(info.description !== undefined)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  description: info.description
                }, {
                  "new": true
                });

              case 7:
                if (!(info.author !== undefined)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  author: info.author
                }, {
                  "new": true
                });

              case 10:
                if (!(info.quantity !== undefined)) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 13;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  quantity: info.quantity
                }, {
                  "new": true
                });

              case 13:
                if (!(info.price !== undefined)) {
                  _context3.next = 16;
                  break;
                }

                _context3.next = 16;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  price: info.price
                }, {
                  "new": true
                });

              case 16:
                if (!(info.image !== undefined)) {
                  _context3.next = 19;
                  break;
                }

                _context3.next = 19;
                return _Book["default"].findOneAndUpdate({
                  _id: info.bookId
                }, {
                  image: info.image
                }, {
                  "new": true
                });

              case 19:
                resolve(true);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }())["catch"](function (error) {
      reject(error);
    });
  });
};

exports.updatebook = updatebook;

var trashBook = function trashBook(Id) {
  return new Promise(function (resolve, reject) {
    _Book["default"].findByIdAndDelete(Id.id).then(function (data) {
      resolve(data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}; //Search book 


exports.trashBook = trashBook;

var searchbook = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(info) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Book["default"].find({
              title: info
            });

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", _context4.t0);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 6]]);
  }));

  return function searchbook(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.searchbook = searchbook;