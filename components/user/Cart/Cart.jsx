import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cart?userId=2`);
      setCartItems(response.data.items);
      setTotalPrice(response.data.total_price);
      setCartId(response.data.cart_id);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/cart/delete-item?itemId=${id}`);
      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };
  function handleDeleteClick(id) {
    deleteOrder(id);
  }

  const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
      await axios.post(
        `http://localhost:8080/cart/update?itemId=${itemId}&quantity=${newQuantity}`
      );
      fetchCartItems(); // Update the cart after successful update
    } catch (error) {
      console.error(error);
    }
  };
  const handleConfirm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/order/create-by-cart-id?cartId=${cartId}`,
        {}
      );

      setOrderId(response.data.orderId);
      setConfirmed(true);
      // Sử dụng orderId ở đây hoặc truyền cho các hàm khác
      console.log("Received orderId:", response.data.orderId);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error:", error);
    }
  };
  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the local state first
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, new_quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);

    // Update the quantity in the API
    updateCartItemQuantity(itemId, newQuantity);
  };

  return (
    <form>
      <div style={{ backgroundColor: "#white" }}>
        <div className="container">
          <div className="">
            <h2 className="text-center">YOUR CART</h2>
            <div className="row"></div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Action</th>
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
                      <input
                        type="number"
                        className="form-control mr-2"
                        id={`quantity-${item.id}`}
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      />

                      {/* <td>
                      {item.orderStatus ? (
                        <span className="text-dark">&#x2713;</span>
                      ) : (
                        <span className="text-danger">&#x2717;</span>
                      )}
                    </td> */}
                    </td>
                    <td>
                      {/* {item.orderStatus ? (
                        <span className="text-dark">Order successfully</span>
                      ) : (
                        <div>
                          {/* <button
                          className="btn btn-outline-dark mx-2"
                          onClick={() => updateOrder(item.id)}
                        >
                          Order
                        </button> */}

                      <a
                        style={{ color: "red" }}
                        onClick={() => handleDeleteClick(item.id)}
                        onMouseEnter={(e) =>
                          (e.target.style.cursor = "pointer")
                        }
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Link
            to="/book-detail"
            className="btn btn-outline-primary shadow btn-white btn-block"
            
          >
            
          </Link> */}
          </div>
          <p className="justify-content-end">Total price: {totalPrice}</p>
          <div className="row mt-3">
            <div className="col-md-12 d-flex justify-content-end">
              {/* Footer */}
            </div>
          </div>
        </div>
      </div>
      {/* <Link
        // to={`/user/order/${orderId}`}
        onClick={handleConfirm}
        className="btn btn-outline-dark btn-white btn-block"
      >
        Confirm
      </Link> */}
      {confirmed ? (
        <div>
          <div className="alert alert-success mt-3" role="alert">
          Added successfully ! Now you can go to your order !
        </div>
          <Link
            to={`/user/order/${orderId}`}
            className="btn btn-outline-dark btn-white btn-block"
          >
            Go to Order
          </Link>
        </div>
      ) : (
        <Link
          onClick={handleConfirm}
          className="btn btn-outline-dark btn-white btn-block"
        >
          Confirm
        </Link>
      )}
    </form>
  );
}
export default Cart;
