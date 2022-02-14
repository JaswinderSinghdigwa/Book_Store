/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import Book from '../models/Book.model';

//Add book
export const addbook = async (info) => {
  return new Promise((resolve, reject) => {
    Book.create(info)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Get all books 
export const findAllbooks = async () => {
return new Promise((resolve,reject)=>{
            Book.find()
            .then(data=>{
               resolve(data);
            }).catch(error=>{
               reject(error)
            }) 
        }) 
};

//getbook  BY Id
export const findBookById = (Id) => {
    return new Promise((resolve,reject)=>{
        console.log("22",Id.id)
        Book.findById(Id.id)
        .then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
};

//Update book 
export const updatebook = (info) => {
    return new Promise((resolve,reject)=>{
        Book.findById(info.bookId)
        .then(async (book)=>{
            if(book != null){
            if (info.title !== undefined){
                await Book.findOneAndUpdate({_id:info.bookId},{title:info.title},{new:true})
            }
            if (info.description !== undefined) {
               await Book.findOneAndUpdate({_id:info.bookId},{description:info.description},{new:true});
            }
            if (info.author !== undefined) {
                 await Book.findOneAndUpdate({_id:info.bookId},{author:info.author},{new:true});
            }
            if (info.quantity !== undefined) {
                await Book.findOneAndUpdate({_id:info.bookId},{quantity:info.quantity},{new:true});
            }
            if (info.price !== undefined) {
               await Book.findOneAndUpdate({_id:info.bookId},{price:info.price},{new:true});
            }
            if(info.image !== undefined){
                await Book.findOneAndUpdate({_id:info.bookId},{image:info.image},{new:true});
            }
            resolve(true)
        }
     }).catch(error=>{
        reject(error)
     })
    })
      
};

export const trashBook = (Id) =>{
    return new Promise((resolve,reject)=>{
        Book.findByIdAndDelete(Id.id)
        .then(data=>{
            resolve(data)
        }).catch(error=>{
            reject(error)
        })
    })
}

//Search book 
export const searchbook = async (info) => {
    try {
        return await Book.find({title:info});
    } catch (error) {
        return error;
    }
};