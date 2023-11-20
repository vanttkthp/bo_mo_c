import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./fitsize.css";
import { FaSearch } from "react-icons/fa";


function BookShopList () {
  const [books, setBooks] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/books")
      .then((res) => {
        setBooks(res.data);
        setInitialBooks(res.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const clearSearch = () => {
    setSearchQuery(""); 
    setBooks(initialBooks);
  };

  const bookList = books.map((book) => (
    <div className="col-md-3 mb-3 card-deck hover-zoom" key={book.id}>
      <Link
        to={`/book/${book.id}`}
        className="card d-flex flex-column align-items-center bg-white custom-link border-0 text-decoration-none text-dark"
      >
        <img
          src={book.bookCover}
          alt={book.title}
          className="rounded border mt-2"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-title">{book.author}</h6>
          <h7 className="card-text position-absolute bottom-0 start-50 translate-middle-x">
            {book.bookPrice} VND
          </h7>
        </div>
      </Link>
    </div>
  ));
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      clearSearch();
    }
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`http://localhost:8080/books/search?query=${searchQuery}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="card bg-white shadow border mb-4 container"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <h1 className="my-5 text-center">Online Market</h1>
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSearchSubmit} className="d-flex">
          <input
            type="text"
            className="form-control rounded-pill mr-2 custom-input"
            style={{ width: "500px", outlineColor: "pink" }}
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="btn btn-outline-dark rounded-pill">
            <FaSearch />
          </button>
        </form>
      </div>
      <hr />
      <div className="row justify-content-center">{bookList}</div>
    </div>
  );
};
export default BookShopList;

