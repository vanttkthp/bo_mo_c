import axios from "axios";
const BOOK_API_BASE_URL = "http://localhost:8080/books";
class BookService{
    getBooks(){
        return axios.get(BOOK_API_BASE_URL);
    }
    addNewBook(book){
        return axios.post(BOOK_API_BASE_URL,book);
    }
}
export default new BookService()