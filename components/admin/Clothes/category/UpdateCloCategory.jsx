import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UpdateCloCategory() {
  const { id: categoryId } = useParams();
  const [categoryData, setCategoryData] = useState({
    id: categoryId,
    name: "",
  });

  const { id, name } = categoryData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/clothesCategory/update", categoryData);

      setCategoryData({ id: "", name: "" });
      navigate("/clocategory/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error updating clothing category.");
      }
      console.error("Error updating clothing category:", error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000); // Hiển thị trong 3 giây
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/clothesCategory/getById?id=${categoryId}`
        );
        if (response.data) {
          const { name } = response.data;
          setCategoryData({ ...categoryData, name });
        } else {
          console.error("No category data found");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Update Clothing Category</h2>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="Enter category ID"
                required
                readOnly
              />
            </div>
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
              Update Category
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

export default UpdateCloCategory;
