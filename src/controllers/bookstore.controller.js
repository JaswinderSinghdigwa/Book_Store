/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';


/**
 * Controller to Add book by Admin
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addbook = async (req, res, next) => {
    try {
        const info = {
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            image:req.file.path
        };
        BookService.addbook(info)
            .then(addBook => {
                return res.status(HttpStatus.CREATED).json({
                    code: HttpStatus.CREATED,
                    message: 'Book added successfully',
                    data: {
                        author: addBook.author,
                        title: addBook.title,
                        description: addBook.description,
                        quantity: addBook.quantity,
                        price: addBook.price,
                        image:addBook.image
                    }
                });
            }).catch(error => {
                next(error)
            })
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
export const findAllbooks = (req, res, next) => {
    try {
        BookService.findAllbooks()
            .then(data => {
                return res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    message: 'Available books',
                    data:data
                });
            }).catch(error => {
                return res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'error while fetching book',
                    error: error
                });
            })
    } catch (error) {
        next(error);
    }
};

export const findBookById = (req, res, next) => {
    const Id = {
        id: req.params.bookid
    }
    BookService.findBookById(Id)
        .then(data => {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Book fetched by Id successfully'
            });
        }).catch(error => {
            next(error);
        })
};

/**
* Controller to Update Book
* @param  {object} req - request object
* @param {object} res - response object
* @param {Function} next
*/
export const updatebook = (req, res, next) => {
    try {
        const info = {
                bookId: req.params.bookId,
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                image: req.file.path
        }

        BookService.updatebook(info)
            .then(data => {
                res.status(HttpStatus.OK).json({
                    code: HttpStatus.OK,
                    message: 'Book updated successfully'
                });
            }).catch(error => {
                res.status(HttpStatus.NOT_FOUND).json({
                    code: HttpStatus.NOT_FOUND,
                    message: 'Book Not Found',
                    error:error
                });
            })
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
 export const trashBook = (req, res, next) => {
    try {
        const Id = {
            id: req.params.bookId
        }
      BookService.trashBook(Id)
      .then(data=>{
       return res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Book deleted successfully'
        })
      }).catch(error=>{
        res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Book Not Found'
          })
      })
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
 export const searchbook = async (req, res, next) => {
    try {
      const info = req.params.title
        const data = await BookService.searchbook(info);
        if (data.length != 0) {
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'search results',
            data
          });
        } else {
          res.status(HttpStatus.NOT_FOUND).json({
            code: HttpStatus.NOT_FOUND,
            message: 'Book Not Found'
          });
        }
      }catch (error) {
      next(error);
    }
  };