"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatebook = exports.trashBook = exports.searchbook = exports.findBookById = exports.findAllbooks = exports.addbook = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var BookService = _interopRequireWildcard(require("../services/book.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-unused-vars */

/* eslint-disable eqeqeq */

/* eslint-disable quotes */

/* eslint-disable prettier/prettier */

/**
 * Controller to Add book by Admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var addbook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              info = {
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image: req.file.path
              };
              BookService.addbook(info).then(function (addBook) {
                return res.status(_httpStatusCodes["default"].CREATED).json({
                  code: _httpStatusCodes["default"].CREATED,
                  message: 'Book added successfully',
                  data: {
                    author: addBook.author,
                    title: addBook.title,
                    description: addBook.description,
                    quantity: addBook.quantity,
                    price: addBook.price,
                    image: addBook.image
                  }
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

  return function addbook(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to Get all books
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.addbook = addbook;

var findAllbooks = function findAllbooks(req, res, next) {
  try {
    BookService.findAllbooks().then(function (data) {
      return res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Available books',
        data: data
      });
    })["catch"](function (error) {
      return res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: 'error while fetching book',
        error: error
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.findAllbooks = findAllbooks;

var findBookById = function findBookById(req, res, next) {
  var Id = {
    id: req.params.bookid
  };
  BookService.findBookById(Id).then(function (data) {
    res.status(_httpStatusCodes["default"].OK).json({
      code: _httpStatusCodes["default"].OK,
      data: data,
      message: 'Book fetched by Id successfully'
    });
  })["catch"](function (error) {
    next(error);
  });
};
/**
* Controller to Update Book
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/


exports.findBookById = findBookById;

var updatebook = function updatebook(req, res, next) {
  try {
    var info = {
      bookId: req.params.bookId,
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.file.path
    };
    BookService.updatebook(info).then(function (data) {
      res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Book updated successfully'
      });
    })["catch"](function (error) {
      res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: 'Book Not Found',
        error: error
      });
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to Delete book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.updatebook = updatebook;

var trashBook = function trashBook(req, res, next) {
  try {
    var Id = {
      id: req.params.bookId
    };
    BookService.trashBook(Id).then(function (data) {
      return res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Book deleted successfully'
      });
    })["catch"](function (error) {
      res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: 'Book Not Found'
      });
    });
  } catch (error) {
    next(error);
  }
};
/**
* Controller to Get all books
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/


exports.trashBook = trashBook;

var searchbook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = req.params.title;
            _context2.next = 4;
            return BookService.searchbook(info);

          case 4:
            data = _context2.sent;

            if (data.length != 0) {
              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'search results',
                data: data
              });
            } else {
              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'Book Not Found'
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

  return function searchbook(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.searchbook = searchbook;