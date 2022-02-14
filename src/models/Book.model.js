/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Available'
  },
  image:{
    type:String,
    required:true
  }
});

export default model('book', bookSchema);
