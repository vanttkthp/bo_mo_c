import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UpdateProducer() {
  const { id: producerId } = useParams();
  const [producerData, setProducerData] = useState({
    id: producerId,
    name: "",
    headquarter: "",
  });

  const { id, name, headquarter } = producerData;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProducerData({ ...producerData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/producer/update", producerData);
      showMessage("producer updated successfully!");
      setProducerData({ id: "", name: "", headquarter: "" });
      navigate("/producer/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error updating producer.");
      }
      console.error("Error updating producer:", error);
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
          `http://localhost:8080/producer/getById?id=${producerId}`
        );
        if (response.data) {
          const { name, headquarter } = response.data;
          setProducerData({ ...producerData, name, headquarter });
        } else {
          console.error("No author data found");
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
    fetchData();
  }, [producerId]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Update Producer</h2>
            
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="Enter producer ID"
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
                placeholder="Enter producer name"
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
                placeholder="Enter producer headquarter"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Update Producer
            </button>
            <br/>
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/producer/list"
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

export default UpdateProducer;
