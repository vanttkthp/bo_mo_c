import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    tel: "",
  });
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  const [address, setAddress] = useState({
    houseNumber: "",
    street: "",
    district: "",
    city: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu tạo mới thông tin vào các API endpoint
      const addressResponse = await axios.post(
        "http://localhost:8080/address/add",
        address
      );

      const fullNameResponse = await axios.post(
        "http://localhost:8080/fullname/add",
        fullName
      );

      const accountResponse = await axios.post(
        "http://localhost:8080/account/add",
        account
      );

      const userResponse = await axios.post(
        "http://localhost:8080/customer/add",
        user
      );

      // Xử lý sau khi gửi yêu cầu thành công, ví dụ hiển thị thông báo
      console.log("Signup successful!");
      // Nếu cần chuyển hướng sau khi đăng ký thành công, sử dụng history.push hoặc navigate
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Signup failed:", error);
    }
  };
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    switch (section) {
      case "user":
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
        break;
      case "account":
        setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
        break;
      case "fullName":
        setFullName((prevFullName) => ({ ...prevFullName, [name]: value }));
        break;
      case "address":
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
        break;
      default:
        break;
    }
  };


  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h5 className="card-title mb-4">Sign Up</h5>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    required
                    value={user.username}
                    onChange={(e) => handleInputChange(e, "account")}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => handleInputChange(e, "account")}
                    name="username"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your first name"
                      name="firstName"
                      value={user.firstName}
                      id="firstName"
                      onChange={(e) => handleInputChange(e, "user")}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="book-lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your last name"
                      name="lastName"
                      value={user.lastName}
                      id="firstName"
                      onChange={(e) => handleInputChange(e, "user")}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, "user")}
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tel" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    value={user.tel}
                    onChange={(e) => handleInputChange(e, "user")}
                    name="tel"
                    placeholder="Enter your tel"
                    required
                  />
                </div>
                <div className="row">
                  <label htmlFor="" className="form-label">
                    Address
                  </label>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="houseNumber"
                        value={user.houseNumber}
                        onChange={(e) => handleInputChange(e, "address")}
                        name="houseNumber"
                        placeholder="House"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <input
                        type="street"
                        className="form-control"
                        id="street"
                        value={user.street}
                        onChange={(e) => handleInputChange(e, "address")}
                        name="street"
                        placeholder="Street"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="district"
                        value={user.district}
                        onChange={(e) => handleInputChange(e, "address")}
                        name="district"
                        placeholder="District"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3">
                      {/* <label htmlFor="city" className="form-label">
                        City
                      </label> */}
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={user.city}
                        onChange={(e) => handleInputChange(e, "address")}
                        name="city"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-outline-dark" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="text-center mt-4">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "black" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
