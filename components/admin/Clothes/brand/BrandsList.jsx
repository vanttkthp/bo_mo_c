import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BrandsList() {
  const [brands, setBrands] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/brand/search?keyword=${searchKeyword}&page=${currentPage}&size=4&sortString=name`
        );

        if (response.data && Array.isArray(response.data.listAuthors)) {
          setBrands(response.data.listAuthors);
          setTotalPages(response.data.totalPages);
          setTotalBrands(response.data.totalItems);

        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchData();
  }, [currentPage, searchKeyword]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0);
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
    <div className="container card shadow border mb-5">
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">{totalBrands} Brands</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                style={{ width: "100%", outlineColor: "pink" }}
                type="text"
                className="form-control"
                placeholder="Search for brands..."
                value={searchKeyword}
                onChange={handleSearch}
              />
            </div>
            {/* You can modify the condition to display the Add New button based on user role */}
            <div className="col-md-6 mb-3">
              {/* Assuming you have a condition to check user role */}
              {localStorage.getItem("isAdmin") ? (
                <Link
                  to="/brand/add"
                  className="btn btn-outline-dark btn-white btn-block"
                >
                  ADD NEW
                </Link>
              ) : null}
            </div>
          </div>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Headquarter</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>{brand.headquarter}</td>
                  <td>
                    <div>
                      {localStorage.getItem("isAdmin") ? (
                        <div>
                          <Link
                            className="btn btn-outline-dark mx-2"
                            to={`/brand/update/${brand.id}`}
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
      <Link
        to="/clothes/list"
        className="text-decoration-none text-blue text-center mb-3"
      >
        Turn back
      </Link>
    </div>
  );
}

export default BrandsList;
