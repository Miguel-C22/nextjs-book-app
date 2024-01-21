import mongoose, { Schema } from "mongoose"

const bookSchema = new Schema({
    title: String,
    author: String,
    image: String,
    description: String,
    boolean: Boolean,
    email: String,
    bookId: String,
  });
  
  //Book = mongoose.model('Book', bookSchema) kept giving this error (Cannot overwrite `Book` model once compiled.)  
  const Book = mongoose.models.Book || mongoose.model('Book', bookSchema); //Important this is the solution for the error
  
  
  export default Book;