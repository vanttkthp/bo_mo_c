import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

function Order() {
  const [cartItems, setCartItems] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/order/${userEmail}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/order/${id}`);
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  function handleDeleteClick(id) {
    deleteOrder(id);
  }

  const updateOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8080/order/${id}`, {
        orderStatus: true,
        quantity: cartItems.find((item) => item.id === id).orderQuantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <div className="">
        <h1 className="text-center">Your Order</h1>
        <div className="row"></div>
        <div
          className="container card shadow border bg-white"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <div className="row">
            <div className="col-md-6">
              <h3>Your Information</h3>
              <div className="form-group">
                <label htmlFor="Title" className="form-label">
                  Full Name*
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your fullname"
                  name="title"
                />
              </div>
              <label htmlFor="book-category">Address*</label>
              <form className="d-flex form-group">
                <select
                  className="form-control  mr-2 custom-input"
                  id="book-category"
                  name="category"
                  value="Mo Lao, Ha Dong, Ha Noi"
               
                
                >
                  <option disabled>Select an address</option>
                  <option value="Science Fiction">
                    Mo Lao, Ha Dong, Ha Noi
                  </option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Self-help">Self-help</option>
                  <option value="Novel">Novel</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-outline-dark"

                >
                  ADD
                </button>
              </form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="Title" className="form-label">
                    Email*
                  </label>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your email"
                    name="title"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="book-author">Phone Number*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="book-author"
                    placeholder="Enter your phone number"
                    name="author"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="book-description">Note</label>
                <textarea
                  className="form-control"
                  id="book-description"
                  rows="3"
                  name="description"
                ></textarea>
              </div>
              {/* <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="book-release-date">Published Date*</label>
                  <input
                    type="date"
                    className="form-control"
                    id="book-release-date"
                    name="publishedDate"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="book-pages">Pages*</label>
                  <input
                    type="number"
                    className="form-control"
                    id="book-pages"
                    name="pages"
                    min={1}
                  />
                </div>
              </div> */}
              {/* <div className="form-group">
                <label htmlFor="book-category">Category*</label>
                <select
                  className="form-control"
                  id="book-category"
                  name="category"
                >
                  <option disabled>Select a category</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Historical Fiction">Historical Fiction</option>
                  <option value="Self-help">Self-help</option>
                  <option value="Novel">Novel</option>
                </select>
              </div> */}
            </div>
            <div className="col-md-6">
              <h3>Payment Method</h3>

              <div
                className="form-group border p-3 rounded"
                htmlFor="paymentMethodCash"
              >
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    id="paymentMethodCash"
                  />
                  <span className="ml-2">Pay with cash</span>
                </label>
              </div>
              <div
                className="form-group border p-3 rounded"
                htmlFor="paymentMethodCash"
              >
                <label
                  className="d-flex align-items-center"
                  htmlFor="paymentMethodCard"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    id="paymentMethodCard"
                  />
                  <span className="ml-2">Pay with card</span>
                </label>
              </div>

              <h3>Shipment</h3>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="book-release-date">
                    Shipping Service Provider*
                  </label>
                  <select
                    className="form-control"
                    id="book-category"
                    name="category"
                  >
                    <option disabled>Select a Shipping Provider</option>
                    <option value="Horror">GHTK</option>
                    <option value="Romance">Shopee Delivery</option>
                    <option value="Thriller">VNexpress</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="book-release-date">Shipping Method*</label>
                  <select
                    className="form-control"
                    id="book-category"
                    name="category"
                  >
                    <option disabled>Shipping Method</option>
                    <option value="Horror">Standard</option>
                    <option value="Romance">Express</option>
                  </select>
                </div>
              </div>
              <h3>Voucher</h3>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <select
                    className="form-control"
                    id="book-category"
                    name="category"
                  >
                    <option disabled>Select a voucher</option>

                    <option value="Horror">Super Sale 11/11 -30%</option>
                    <option value="Romance">Men's Day -40%</option>
                    <option value="Thriller">
                      Black Friday SuperDiscount -100%
                    </option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <form className="d-flex">
                    <input
                      type="text"
                      className="form-control  mr-2 custom-input"
                      placeholder="or enter your discount code here... "
                    />
                    <button type="submit" className="btn btn-outline-dark">
                      Apply
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <table className="table border">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product</th>

                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/book/${item.bookId}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {item.bookTitle}
                    </a>
                  </td>

                  <td>1</td>
                  <td>10000</td>
                  <td>10000</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="d-flex justify-content-between">
            <h6>Ship cost: </h6>
            <h6>10000</h6>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Voucher: </h6>
            <h6>-3000</h6>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Total product cost:</h6>
            <h6>10000</h6>
          </div>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <h4>Total payment : </h4>
            <h4>17000</h4>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex">
          <Link
            to={`/user/bills`}
            type="submit"
            className="btn btn-outline-dark shadow mb-5"
            form="book-form"
            style={{ width: "100%" }}
          >
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Order;