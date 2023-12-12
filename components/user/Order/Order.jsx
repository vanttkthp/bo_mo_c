import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useParams } from "react-router-dom";

function Order() {
  const { id: order_Id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);
  const [voucherList, setVoucherList] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [orderInfo, setOrderInfo] = useState(null);
  const [paymentDiscount, setPaymentDiscount] = useState(0); // orderId phải được thiết lập từ state hoặc props
  const [shipmentType, setShipmentType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState({
    idCus: 2,
    email: "",
    name: "",
    tel: "",
    username: "",
  });
  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/customer/getById?id=2`
        );
        if (response.data) {
          const { idCus, email, name, tel, username } = response.data;
          setUserData({ ...idCus, email, name, tel, username });
        } else {
          console.error("No voucher data found");
        }
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart?userId=2`);
      setCartItems(response.data.items);
      
      setCartId(response.data.cart_id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    try {
      // Gọi API để tạo đơn hàng từ cartId
      const response = await axios.post(
        `http://localhost:8080/order/submit?orderId=${order_Id}`,
        {}
      );
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    // Call API to update orderId whenever selectedVoucher changes
    updateForOrder();
    console.log("Selected Voucher:", selectedVoucher);
    console.log("Shipment Type:", shipmentType);
    console.log("Payment", paymentMethod);
  }, [selectedVoucher, shipmentType, paymentMethod]);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/voucher/getAll");
      setVoucherList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleVoucherChange = (e) => {
    setSelectedVoucher(e.target.value);
  };

  const handleShippingChange = (e) => {
    setShipmentType(e.target.value);
  };

  const updateForOrder = async () => {
    try {
      // Gọi API để cập nhật voucherId cho orderId cụ thể
      const response = await axios.post("http://localhost:8080/order/update", {
        orderId: order_Id,
        voucherId: selectedVoucher,
        paymentType: paymentMethod, // Thay bằng giá trị thích hợp nếu có
        shipmentType: shipmentType, // Thay bằng giá trị thích hợp nếu có
      });
      setPaymentDiscount(response.data.payment_discount);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/order/by-id?id=${order_Id}`
        );
        if (response.data) {
          setOrderInfo(response.data);
          
          setTotalPrice(response.data.items_price);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchOrderInfo();
  }, [order_Id]);
  const shipCost = shipmentType === "1" ? 20 : 10;
  const totalPayment = shipCost - paymentDiscount + totalPrice;
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
              <h5>Your Information</h5>
              <div className="form-group">
                <label htmlFor="Title" className="form-label">
                  Full Name*
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your fullname"
                  name="title"
                  value={userData.name}
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
                <button type="submit" className="btn btn-outline-dark">
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
                    value={userData.email}
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
                    value={userData.tel}
                  />
                </div>
              </div>

              {/* <div className="form-group">
                <label htmlFor="book-description">Note</label>
                <textarea
                  className="form-control"
                  id="book-description"
                  rows="3"
                  name="description"
                ></textarea>
              </div> */}
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
              <h5>Payment Method</h5>

              <div
                className="form-group border p-3 rounded"
                htmlFor="paymentMethodCash"
              >
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={0}
                    id="paymentMethodCash"
                    onClick={handlePaymentChange}
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
                    value={1}
                    id="paymentMethodCard"
                    onClick={handlePaymentChange}
                  />
                  <span className="ml-2">Pay with card</span>
                </label>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="ship_method">
                    <h5>Shipment</h5>
                  </label>
                  <select
                    className="form-control"
                    id="ship_method"
                    name="ship_method"
                    onChange={handleShippingChange} // Sự kiện onChange
                    value={shipmentType}
                  >
                    <option disabled>Select a Shipping Provider</option>

                    <option key={1} value={1}>
                      Express
                    </option>
                    <option key={0} value={0}>
                      Standard
                    </option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="voucher">
                    <h5>Voucher</h5>
                  </label>
                  <select
                    className="form-control"
                    id="voucher"
                    name="voucher"
                    onChange={handleVoucherChange}
                    value={selectedVoucher}
                  >
                    <option key={1} value={0}>
                      Select a voucher
                    </option>

                    {voucherList.map((voucher) => (
                      <option key={voucher.id} value={voucher.id}>
                        {voucher.conditionUsing} - {voucher.discountPercent}%
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="form-row">
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
              </div> */}
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
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
                      {item.name}
                    </a>
                  </td>
                  <td>{item.price}</td>
                  {/* <td>{item.quantity}</td> */}
                  <td>
                    {item.quantity}
                    <td />

                    {/* <td>
                      {item.orderStatus ? (
                        <span className="text-dark">&#x2713;</span>
                      ) : (
                        <span className="text-danger">&#x2717;</span>
                      )}
                    </td> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="d-flex justify-content-between">
            <h6>Ship cost: </h6>
            <h6>{shipCost}</h6>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Voucher: </h6>
            <h6>-{paymentDiscount}</h6>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Total product cost:</h6>
            <h6>{totalPrice}</h6>
          </div>
          <hr></hr>
          <div class="d-flex justify-content-between">
            <h4>Total payment : </h4>
            <h4>{totalPayment}</h4>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex">
          <Link
            // to={`/user/bills`}
            onClick={handleConfirm}
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
