import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function AddVoucher() {
  const [voucher, setVoucher] = useState({
    nameDiscount: "",
    exprireTime: "",
    discountPercent: "",
    conditionUsing: "",
  });
  const navigate = useNavigate();

  const { nameDiscount, exprireTime, discountPercent, conditionUsing } = voucher;
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setVoucher({ ...voucher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/voucher/add", voucher);
      navigate("/vouchers/list");
      setVoucher({ nameDiscount: "", exprireTime:"", discountPercent:"", conditionUsing:""});
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding voucher.");
      }
      console.error("Error adding voucher:", error);
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
            <h2 className="text-center mb-4">Add Voucher</h2>

            <div className="form-group">
              <label htmlFor="nameDiscount">Name Discount:</label>
              <input
                type="text"
                className="form-control"
                id="nameDiscount"
                name="nameDiscount"
                value={nameDiscount}
                onChange={handleChange}
                placeholder="Enter nameDiscount"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exprireTime"> Expired Time:</label>
              <input
                type="date"
                className="form-control"
                id="exprireTime"
                name="exprireTime"
                value={exprireTime}
                onChange={handleChange}
                placeholder="Enter exprireTime"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="discountPercent">Discount Percent:</label>
              <input
                type="number"
                className="form-control"
                id="discountPercent"
                name="discountPercent"
                value={discountPercent}
                onChange={handleChange}
                placeholder="Enter discountPercent"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="conditionUsing">Condition:</label>
              <input
                type="text"
                className="form-control"
                id="conditionUsing"
                name="conditionUsing"
                value={conditionUsing}
                onChange={handleChange}
                placeholder="Enter conditionUsing"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Add Voucher
            </button>
            <br />
            {message && <p className="text-danger text-center">{message}</p>}
            <Link
              to="/vouchers/list"
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

export default AddVoucher;
