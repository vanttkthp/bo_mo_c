import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddAuthor() {
  const [author, setAuthor] = useState({
    name: "",
    nationallity: "",
    birthday: ""
  });
  const navigate = useNavigate();

  const { name, nationallity, birthday } = author;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/authors/add", author);
      navigate("/authors/list");
      setAuthor({ name: "", nationallity: "", birthday: "" });
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding author.");
      }
      console.error("Error adding author:", error);
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
            <h2 className="text-center mb-4">Add Author</h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nationallity">Nationality:</label>
              <input
                type="text"
                className="form-control"
                id="nationallity"
                name="nationallity"
                value={nationallity}
                onChange={handleChange}
                placeholder="Enter nationality"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="birthday">Birthday:</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Author
            </button>
            <br />
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/author/list"
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

export default AddAuthor;
