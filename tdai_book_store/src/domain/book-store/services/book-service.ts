import { BookDocument, insertBooks } from '../schema/book-schema';

class BookService {
 public async insertBook(books: BookDocument[]){
     return insertBooks(books);
 }
}

export default new BookService();
