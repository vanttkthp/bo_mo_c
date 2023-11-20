import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AddPublisher() {
  const [publisher, setPublisher] = useState({
    name: "",
    headquarter: "",
  });
  const navigate = useNavigate();

  const { name, headquarter } = publisher;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPublisher({ ...publisher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/publisher/add", publisher);
      showMessage("Publisher added successfully!");
      setPublisher({ name: "", headquarter: "" });
      navigate("/publisher/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding publisher.");
      }
      console.error("Error adding publisher:", error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000); // Hiển thị trong 3 giây
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Add Publisher</h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter publisher name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="headquarter">Headquarter:</label>
              <input
                type="text"
                className="form-control"
                id="headquarter"
                name="headquarter"
                value={headquarter}
                onChange={handleChange}
                placeholder="Enter publisher headquarter"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Publisher
            </button>
            <br />
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/publisher/list"
              className="text-decoration-none text-blue text-center"
            >
              Turn back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPublisher;
