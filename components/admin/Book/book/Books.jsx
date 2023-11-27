import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Menu from "../../../Menu";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/books/search?keyword=${searchKeyword}&page=${currentPage}&size=2&sortString=id`
        );

        if (response.data && Array.isArray(response.data.listBooks)) {
          setBooks(response.data.listBooks);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching Books:", error);
      }
    };

    fetchData();
  }, [currentPage, searchKeyword]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0); // Đặt currentPage về trang đầu tiên khi searchKeyword thay đổi
  };
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
 
 
  return (
    
    <div
      className="container card shadow border mb-5"
      style={{ backgroundColor: "#white" }}
    >
     
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">Book Information</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                style={{ width: "100%", outlineColor: "pink" }}
                type="text"
                className="form-control"
                placeholder="Search for books..."
                value={searchKeyword}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-6 mb-3">
              {localStorage.getItem("isAdmin") ? (
                <Link
                  to="/books/add"
                  className="btn btn-outline-dark btn-white btn-block"
                >
                  ADD NEW
                </Link>
              ) : null}
            </div>
          </div>
          <table className="table table-hover ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>

                <th scope="col">Publisher</th>
                <th scope="col">Published Year</th>
                <th scope="col">Pages</th>
                <th scope="col">Cover</th>
                <th scope="col">Language</th>
                <th scope="col">Category</th>

                <th scope="col">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td style={{ verticalAlign: "middle" }}>{book.id}</td>
                  <td style={{ verticalAlign: "middle" }}>{book.title}</td>
                  <td style={{ verticalAlign: "middle" }}>{book.authorName}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {book.publisherName}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {book.publishYear}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {book.numerOfPages}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className="rounded border mt-2"
                      style={{ maxWidth: "60px", maxHeight: "100px" }}
                    />
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{book.language}</td>
                  <td style={{ verticalAlign: "middle" }}>
                  {book.categoryName && Array.isArray(book.categoryName) ? (
                      book.categoryName.length > 2 ? (
                        book.categoryName.slice(0, 2).join(', ') + '...'
                      ) : (
                        book.categoryName.join(', ')
                      )
                    ) : (
                      'No categories'
                    )}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{book.price}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <div>
                      {localStorage.getItem("isAdmin") ? (
                        <div>
                          <Link
                            className="btn btn-outline-dark mx-2"
                            to={`/books/update/${book.id}`}
                          >
                            Update
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <nav
              aria-label="Page navigation example"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handlePrevious}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages - 1 ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={handleNext}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
