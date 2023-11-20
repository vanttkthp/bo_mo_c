import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import moment from 'moment';
import Menu from "../../../Menu";
function BooksList () {
  const [books, setBooks] = useState([]);
  const [confirmAddBook, setConfirmAddBook] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialBooks, setInitialBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:8080/books");
    setBooks(result.data);
    setInitialBooks(result.data);
  };
  const deleteBooks = async (id) => {
    await axios.delete(`http://localhost:8080/book/${id}`);
    loadBooks();
  };
  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      deleteBooks(id);
    }
  };
  const handleAddBookClick = () => {
    const confirmAdd = window.confirm(
      "Are you sure you want to add a new book?"
    );
    if (confirmAdd) {
      setConfirmAddBook(true);
    }
  };
  if (confirmAddBook) {
    window.location.href = "/admin/book-detail";
  }

  const clearSearch = () => {
    setSearchQuery("");
    setBooks(initialBooks);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === "") {
      clearSearch();
    } else {
      searchBooks(query);
    }
  };

  const searchBooks = (query) => {
    axios
      .get(`http://localhost:8080/books/search?query=${query}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    
    <div
      className="container card shadow border mb-5"
      style={{ backgroundColor: "#white" }}
    >
   
      <div className="container">
        <div className="py-4">
          {/* <h2 className="text-center">PRODUCT Information</h2> */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control mr-2 custom-input"
                style={{ width: "630px", outlineColor: "pink" }}
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              {localStorage.getItem("isAdmin") ? (
                <div>
                  <button
                    className="btn btn-outline-dark btn-white btn-block"
                    onClick={handleAddBookClick}
                  >
                    ADD NEW PRODUCT
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <table className="table  ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Published Date</th>
                <th scope="col">Pages</th>
                <th scope="col">Price</th>
                <th scope="col">Sold Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/book/${item.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item.title}
                    </a>
                  </td>
                  <td>{item.author}</td>
                  <td>{item.category}</td>
                  <td>{moment(item.publishedDate).format("DD-MM-YYYY")}</td>
                  <td>{item.pages}</td>
                  <td>{item.bookPrice}</td>
                  <td>{item.soldQuantity}</td>
                  <td>
                    <div>
                      {localStorage.getItem("isAdmin") ? (
                        <div>
                          <Link
                            className="btn btn-outline-dark mx-2"
                            to={`/admin/book-detail/${item.id}`}
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-outline-danger mx-2 "
                            onClick={() => handleDeleteClick(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Link
            to="/book-detail"
            className="btn btn-outline-primary shadow btn-white btn-block"
            
          >
            ADD NEW BOOK
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default BooksList;