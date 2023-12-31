import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddBrand() {
  const [brand, setBrand] = useState({
    name: "",
    headquarter: "",
  });
  const navigate = useNavigate();

  const { name, headquarter } = brand;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/brand/add", brand);
      showMessage("Brand added successfully!");
      setBrand({ name: "", headquarter: "" });
      navigate("/brand/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding brand.");
      }
      console.error("Error adding brand:", error);
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
            <h2 className="text-center mb-4">Add Brand</h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Enter brand name"
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
                placeholder="Enter brand headquarter"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Brand
            </button>
            <br />
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/brand/list"
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

export default AddBrand;
