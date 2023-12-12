import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const userId = 2; // Replace with the appropriate user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/order?userId=${userId}`);

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("Invalid data format received.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="container card shadow border mb-5">
      <div className="container">
        <div className="py-4">
          <h2 className="text-center">Orders List</h2>
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Voucher</th>
                <th scope="col">Shipment</th>
                <th scope="col">Payment</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.voucherId}</td>
                  <td>{order.shipmentType}</td>
                  <td>{order.paymentType}</td>
                  <td>{order.orderTotalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                    <div>
                      <Link
                        className="btn btn-outline-dark mx-2"
                        to={`/user/order/${order.id}`}
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link
        to="/clothes/list"
        className="text-decoration-none text-blue text-center mb-3"
      >
        Turn back
      </Link>
    </div>
  );
}

export default OrdersList;
