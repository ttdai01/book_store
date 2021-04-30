import {
    Document, Schema, Model, model
  } from 'mongoose';

export class BookDocument extends Document {
    name: string;
    author: string;
}

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true }
})

const Book: Model<BookDocument> = model<BookDocument, Model<BookDocument>>('Book', schema);

export const insertBooks = (books: BookDocument[]): Promise<BookDocument[]> => Book.insertMany(books);

export default Book;