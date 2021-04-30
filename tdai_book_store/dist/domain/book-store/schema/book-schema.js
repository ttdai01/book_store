"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBooks = exports.BookDocument = void 0;
const mongoose_1 = require("mongoose");
class BookDocument extends mongoose_1.Document {
}
exports.BookDocument = BookDocument;
const schema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    author: { type: String, required: true }
});
const Book = mongoose_1.model('Book', schema);
const insertBooks = (books) => Book.insertMany(books);
exports.insertBooks = insertBooks;
exports.default = Book;
//# sourceMappingURL=book-schema.js.map