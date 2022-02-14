"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _book = require("../validators/book.Validator");

var bookController = _interopRequireWildcard(require("../controllers/bookstore.controller"));

var _auth = require("../middlewares/auth.middleware");

var _Uploads = require("../middlewares/Uploads");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable max-len */

/* eslint-disable prettier/prettier */
var router = _express["default"].Router(); // route to add book


router.post('/addbook', _auth.auth, _auth.verifyRole, _Uploads.upload.single('image'), _book.bookValidator, bookController.addbook); // route to Get all books

router.get('/findallbooks', _auth.auth, bookController.findAllbooks); // route to Get by id books

router.get('/findbookbyid/:bookid', _auth.auth, bookController.findBookById); // route to update book

router.post('/updatebook/:bookId', _auth.auth, _auth.verifyRole, _Uploads.upload.single('image'), _book.bookValidator, bookController.updatebook); // route to delete book

router["delete"]('/trashbook/:bookId', _auth.auth, _auth.verifyRole, bookController.trashBook); // route to Search Book

router.get('/searchbook/:title', _auth.auth, bookController.searchbook);
var _default = router;
exports["default"] = _default;