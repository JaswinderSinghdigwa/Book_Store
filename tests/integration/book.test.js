/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */

import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../../src/index';
import fs from 'fs';

chai.should();

chai.use(chaiHttp);

describe('/books', () => {
    it.only('given book details if proper should pass all API tests.', (done) => {
        const bearerToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzNDc3MDUyM0BnbWFpbC5jb20iLCJpZCI6IjYyMDQ5ZDUyYjRkMjc1ZjBjODgyOTcxOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0NDgxMDM5MH0.unmbHKNlVQZhUrfsG8flshFwo7DyEOnCx8UiYx1Y';
        //Add Book
        chai
        .request(server)
            .post('/api/v1/books/addbook')
            .set({ authorization: bearerToken })
            .set('content-type', 'multipart/form-data')
            .field('author', 'test author')
            .field('title', 'test title')
            .attach('image','tests/integration/don-image.jpg')
            .field('quantity', 1)
            .field('price', 10)
            .field('description', 'this is an integration test')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(201);
                //get book
                chai
                .request(server)
                    .get('/api/v1/books/findallbooks')
                    .set({ authorization: bearerToken })
                    .end((err, res) => {
                        expect(res.statusCode).to.be.equal(200);
                        const id = res.body.data[0]._id;
                        //get book by id
                        chai
                        .request(server)
                            .get(`/api/v1/books/findbookbyid/${id}`)
                            .set({ authorization: bearerToken })
                            .end((err, res) => {
                                expect(res.statusCode).to.be.equal(200);
                                //update book
                                chai
                                .request(server)
                                    .get(`/api/v1/books/updatebook/${id}`)
                                    .set({ authorization: bearerToken })
                                    .set('content-type', 'multipart/form-data')
                                    .field('author', 'update author')
                                    .field('title', 'test title')
                                    .attach('image','tests/integration/don-image.jpg')
                                xpect(res.statusCode).to.be.equal(200);
                                        const title = res.body.data.title;
                                            .field('quantity', 1)
                                    .field('price', 10)
                                    .field('description', 'this is an integration test')
                                    .end((err, res) => {
                                        e//search book
                                        chai
                                        .request(server)
                                            .get(`/api/v1/books/searchbook/${title}`)
                                            .set({ authorization: bearerToken })
                                            .end((err, res) => {
                                                expect(res.statusCode).to.be.equal(200);
                                                //sort book in ascending order
                                                chai
                                                .request(server)
                                                    .delete(`/api/v1/books/trashbook/${id}`)
                                                    .set({ authorization: bearerToken })
                                                    .end((err, res) => {
                                                        expect(res.statusCode).to.be.equal(200);
                                                        done();
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
});