import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const { name } = category;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/bookCategories/add", category);
      navigate("/category/list");
      setCategory({ name: ""});
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding category.");
      }
      console.error("Error adding category:", error);
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
            <h2 className="text-center mb-4">Add Category</h2>

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
            
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Category
            </button>
            <br />
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/category/list"
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

export default AddCategory;
