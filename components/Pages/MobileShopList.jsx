import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

function MobileShopList() {
  const [mobiles, setMobiles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/mobiles/search?keyword=${searchKeyword}&page=${currentPage}&size=2&sortString=id`
        );

        if (response.data && Array.isArray(response.data.listMobiles)) {
          setMobiles(response.data.listMobiles);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching Mobiles:", error);
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

  const mobileList = mobiles.map((mobile) => (
    <div className="col-md-3 mb-3 card-deck hover-zoom" key={mobile.id}>
      <Link
        to={`/mobile/${mobile.id}`}
        className="card d-flex flex-column align-items-center bg-white custom-link border-0 text-decoration-none text-dark"
      >
        <img
          src={mobile.image}
          alt={mobile.name}
          className="rounded border mt-2"
          style={{ maxWidth: "400px", maxHeight: "270px" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{mobile.name}</h5>
          <h6 className="card-title">{mobile.brand}</h6>
          <h7 className="card-text position-absolute bottom-0 start-50 translate-middle-x">
            {mobile.price} $
          </h7>
        </div>
      </Link>
    </div>
  ));

  return (
    <div>
      <h1 className="my-5 text-center">Find Your Mobile</h1>
      <div className="mb-3 d-flex justify-content-center align-items-center">
        <form onSubmit={handleSearch} className="d-flex">
          <input
            type="text"
            className="form-control rounded-pill mr-2 custom-input"
            style={{ width: "500px", outlineColor: "pink" }}
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
          />
          <button type="submit" className="btn btn-outline-dark rounded-pill">
            <FaSearch />
          </button>
        </form>
      </div>
      <br />
      <div className="row justify-content-center">{mobileList}</div>
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
              className={`page-item ${currentPage === index ? "active" : ""}`}
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
  );
}

export default MobileShopList;
