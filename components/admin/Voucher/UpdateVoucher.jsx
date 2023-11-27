import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function UpdateVoucher() {
  const { id: voucherId } = useParams();
  const [voucherData, setVoucherData] = useState({
    id: voucherId,
    nameDiscount: "",
    exprireTime: "",
    discountPercent: "",
    conditionUsing: "",
  });

  const { id, nameDiscount, exprireTime, discountPercent, conditionUsing } = voucherData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVoucherData({ ...voucherData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/voucher/update", voucherData);
      showMessage("Voucher updated successfully!");
      setVoucherData({
        id: "",
        nameDiscount: "",
        exprireTime: "",
        discountPercent: "",
        conditionUsing: "",
      });
      navigate("/vouchers/list");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error updating voucher.");
      }
      console.error("Error updating voucher:", error);
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
          `http://localhost:8080/voucher/getById?id=${voucherId}`
        );
        if (response.data) {
          const { nameDiscount, exprireTime, discountPercent, conditionUsing } = response.data;
          setVoucherData({ ...voucherData, nameDiscount, exprireTime, discountPercent, conditionUsing });
        } else {
          console.error("No voucher data found");
        }
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      }
    };
    fetchData();
  }, [voucherId]);

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-4">
          <form onSubmit={handleSubmit} className="card p-4">
            <h2 className="text-center mb-4">Update Voucher</h2>
            
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                className="form-control"
                id="id"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="Enter voucher ID"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="nameDiscount">Name Discount:</label>
              <input
                type="text"
                className="form-control"
                id="nameDiscount"
                name="nameDiscount"
                value={nameDiscount}
                onChange={handleChange}
                placeholder="Enter voucher name discount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exprireTime">Expire Time:</label>
              <input
                type="date"
                className="form-control"
                id="exprireTime"
                name="exprireTime"
                value={exprireTime}
                onChange={handleChange}
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
                placeholder="Enter voucher discount percent"
              />
            </div>
            <div className="form-group">
              <label htmlFor="conditionUsing">Condition Using:</label>
              <input
                type="text"
                className="form-control"
                id="conditionUsing"
                name="conditionUsing"
                value={conditionUsing}
                onChange={handleChange}
                placeholder="Enter condition for using voucher"
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-dark btn-white btn-block"
            >
              Update Voucher
            </button>
            <br/>
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

export default UpdateVoucher;
