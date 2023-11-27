import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

function ClothesList() {
  const [clothes, setClothes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalClothes, setTotalClothes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/clothes/search?keyword=${searchKeyword}&page=${currentPage}&size=2&sortString=id`
        );

        if (response.data && Array.isArray(response.data.listClothes)) {
          setClothes(response.data.listClothes);
          setTotalPages(response.data.totalPages);
          setTotalClothes(response.data.totalItems);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching Clothes:", error);
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
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div
      className="container card shadow border mb-5"
      style={{ backgroundColor: "#white" }}
    >
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">Total {totalClothes} Clothes</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                style={{ width: "100%", outlineColor: "pink" }}
                type="text"
                className="form-control"
                placeholder="Search for clothes..."
                value={searchKeyword}
                onChange={handleSearch}
              />
            </div>
            <div className="col-md-6 mb-3">
            <Button
                variant="white"
                className="btn  btn-outline-dark btn-block"
                onClick={handleShow}
              >
                Clothes Controller
              </Button>

              <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title >Book Controller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Link
                  to={`/clothes/add`}
                    variant="white"
                    className="btn  btn-outline-dark btn-block"
                  >
                   Add New Clothes
                  </Link>
                  <Link
                  to={`/brand/list`}
                    variant="white"
                    className="btn  btn-outline-dark btn-block"
                  >
                    View Brand List
                  </Link>
                  <Link
                  to={`/clocategory/list`}
                    variant="white"
                    className="btn  btn-outline-dark btn-block"
                  >
                    View Category List
                  </Link>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* {localStorage.getItem("isAdmin") ? (
                <Link
                  to="/clothes/add"
                  className="btn btn-outline-dark btn-white btn-block"
                >
                  ADD NEW
                </Link>
              ) : null} */}
            </div>
          </div>

          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Brand</th>
                <th scope="col">Size</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {clothes.map((cloth) => (
                <tr key={cloth.id}>
                  <td style={{ verticalAlign: "middle" }}>{cloth.id}</td>
                  <td style={{ verticalAlign: "middle" }}>{cloth.name}</td>
                  <td style={{ verticalAlign: "middle" }}>{cloth.brandName}</td>
                  <td style={{ verticalAlign: "middle" }}>{cloth.size}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <img
                      src={cloth.image}
                      alt={cloth.name}
                      className="rounded border mt-2"
                      style={{ maxWidth: "90px", maxHeight: "100px" }}
                    />
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{cloth.price}</td>
                  {/* Add other columns you need */}
                  <td style={{ verticalAlign: "middle" }}>
                    <div>
                      {localStorage.getItem("isAdmin") ? (
                        <div>
                          <Link
                            className="btn btn-outline-dark mx-2"
                            to={`/clothes/update/${cloth.id}`}
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
          {/* Pagination */}
          {/* ... */}
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

export default ClothesList;
