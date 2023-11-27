import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddCloCategory() {
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
      await axios.post("http://localhost:8080/clothesCategory/add", category);
      showMessage("Clothing category added successfully!");
      setCategory({ name: "" });
      // Redirect to the clothing category list or any other route
      navigate("/clocategory/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding clothing category.");
      }
      console.error("Error adding clothing category:", error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000); // Display for 3 seconds
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Add Clothing Category</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter category name"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Category
            </button>
            <br/>
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/clocategory/list"
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

export default AddCloCategory;
