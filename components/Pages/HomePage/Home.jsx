import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./fitsize.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BookShopList from "../BookPages/BookShopList";
import MobileShopList from "../MobilePages/MobileShopList";
import ClothesShopList from "../ClothesPages/ClothesShopList";
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
