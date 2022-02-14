/* eslint-disable max-len */
/* eslint-disable prettier/prettier */

import express from 'express';
import { bookValidator } from '../validators/book.Validator'
import * as bookController from '../controllers/bookstore.controller';
import { auth, verifyRole } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/Uploads'

const router = express.Router();

// route to add book
router.post('/addbook', auth,verifyRole,upload.single('image'),bookValidator, bookController.addbook);

// route to Get all books
router.get('/findallbooks', auth,bookController.findAllbooks);

// route to Get by id books
router.get('/findbookbyid/:bookid', auth , bookController.findBookById);

// route to update book
router.post('/updatebook/:bookId',auth,verifyRole,upload.single('image'),bookValidator, bookController.updatebook)

// route to delete book
router.delete('/trashbook/:bookId',auth, verifyRole, bookController.trashBook)

// route to Search Book
router.get('/searchbook/:title',auth ,bookController.searchbook);

export default router;
