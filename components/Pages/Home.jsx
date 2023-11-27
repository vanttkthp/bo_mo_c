import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./fitsize.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BookShopList from "./BookShopList";
import MobileShopList from "./MobileShopList";
import ClothesShopList from "./ClothesShopList";
function Home() {
  const [books, setBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/books/search?keyword=${searchKeyword}&page=${currentPage}&size=4&sortString=id`
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

  const bookList = books.map((book) => (
    <div className="col-md-3 mb-3 card-deck hover-zoom" key={book.id}>
      <Link
        to={`/book/${book.id}`}
        className="card d-flex flex-column align-items-center bg-white custom-link border-0 text-decoration-none text-dark"
      >
        <img
          src={book.image}
          alt={book.title}
          className="rounded border mt-2"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-title">{book.authorName}</h6>
          <h7 className="card-text position-absolute bottom-0 start-50 translate-middle-x">
            {book.price} $
          </h7>
        </div>
      </Link>
    </div>
  ));

  return (
    <div
      className="card bg-white shadow border mb-4 container"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <Tabs
        defaultActiveKey="Book"
        id="justify-tab-example"
        className="mb-3 mt-3"
        justify
      >
        <Tab eventKey="Book" title="Book">
          <BookShopList />
        </Tab>
        <Tab eventKey="Mobile" title="Mobile">
          <MobileShopList />
        </Tab>
        <Tab eventKey="Clothes" title="Clothes">
          <ClothesShopList />
        </Tab>
      </Tabs>
    </div>
  );
}
export default Home;
