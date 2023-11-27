import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Modal } from "react-bootstrap";

function MobilesList() {
  const [mobiles, setMobiles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMobiles, setTotalMobiles] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/mobiles/search?keyword=${searchKeyword}&page=${currentPage}&size=2&sortString=id`
        );

        if (response.data && Array.isArray(response.data.listMobiles)) {
          setMobiles(response.data.listMobiles);
          setTotalPages(response.data.totalPages);
          setTotalMobiles(response.data.totalItems);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching mobiles:", error);
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
          <h2 className="text-center"> Total {totalMobiles} Mobiles</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                style={{ width: "100%", outlineColor: "pink" }}
                type="text"
                className="form-control"
                placeholder="Search for mobiles..."
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
                Mobile Controller
              </Button>

              <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Mobile Controller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Link
                    to={`/mobile/add`}
                    variant="white"
                    className="btn  btn-outline-dark btn-block"
                  >
                    Add New Mobile
                  </Link>
                  <Link
                    to={`/producer/list`}
                    variant="white"
                    className="btn  btn-outline-dark btn-block"
                  >
                    View Producer List
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
                  to="/mobiles/add"
                  className="btn btn-outline-dark btn-white btn-block"
                >
                  ADD NEW
                </Link>
              ) : null} */}
            </div>
          </div>
          <table className="table table-hover ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Producer</th>

                <th scope="col">OS Type</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>

                <th scope="col">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mobiles.map((mobile) => (
                <tr key={mobile.id}>
                  <td style={{ verticalAlign: "middle" }}>{mobile.id}</td>
                  <td style={{ verticalAlign: "middle" }}>{mobile.name}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {mobile.producerName}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>{mobile.osType}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {mobile.description}
                  </td>

                  <td style={{ verticalAlign: "middle" }}>
                    <img
                      src={mobile.image}
                      alt={mobile.title}
                      className="rounded border mt-2"
                      style={{ maxWidth: "90px", maxHeight: "100px" }}
                    />
                  </td>

                  <td style={{ verticalAlign: "middle" }}>{mobile.price}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    <div>
                      {localStorage.getItem("isAdmin") ? (
                        <div>
                          <Link
                            className="btn btn-outline-dark mx-2"
                            to={`/mobile/update/${mobile.id}`}
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

export default MobilesList;
