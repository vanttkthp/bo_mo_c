import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UpdateBrand() {
  const { id: brandId } = useParams();
  const [brandData, setBrandData] = useState({
    id: brandId,
    name: "",
    headquarter: "",
  });

  const { id, name, headquarter } = brandData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBrandData({ ...brandData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/brand/update", brandData);

      setBrandData({ id: "", name: "", headquarter: "" });
      navigate("/brand/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error updating brand.");
      }
      console.error("Error updating brand:", error);
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
          `http://localhost:8080/brand/getById?id=${brandId}`
        );
        if (response.data) {
          const { name, headquarter } = response.data;
          setBrandData({ ...brandData, name, headquarter });
        } else {
          console.error("No brand data found");
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
      }
    };
    fetchData();
  }, [brandId]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Update Brand</h2>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="Enter brand ID"
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
              Update Brand
            </button>
            <br/>
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

export default UpdateBrand;
