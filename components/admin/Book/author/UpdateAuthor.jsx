import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UpdateAuthor() {
  const { id: authorId } = useParams();
  const [authorData, setAuthorData] = useState({
    id: authorId,
    name: "",
    nationallity: "",
    birthday: "",
  });

  const { id, name, nationallity, birthday } = authorData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAuthorData({ ...authorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/authors/update", authorData);

      setAuthorData({ id: "", name: "", nationallity: "", birthday: "" });
      navigate("/author/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error updating author.");
      }
      console.error("Error updating author:", error);
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
          `http://localhost:8080/authors/getById?id=${authorId}`
        );
        if (response.data) {
          const { name, nationallity, birthday } = response.data;
          setAuthorData({ ...authorData, name, nationallity, birthday });
        } else {
          console.error("No author data found");
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
    fetchData();
  }, [authorId]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Update Author</h2>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="Enter author ID"
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
              Update Author
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

export default UpdateAuthor;
