import React from "react";
import "./user.css";

function Bills () {
  return (
    <div className="bill-container mt-5 border border-primary p-4 mb-5">
      <h3 className="">#CMT819452023</h3>

      <div class="d-flex justify-content-between">
        <strong>Customer:</strong>
        Đào Công Văn
      </div>
      <div class="d-flex justify-content-between">
        <strong>Address:</strong>
        Mộ Lao, Hà Đông, Hà Nội
      </div>
      <div class="d-flex justify-content-between">
        <strong>Phone number:</strong>
        0965373958
      </div>
      <div class="d-flex justify-content-between">
        <strong>Email:</strong>
        congvan2357@gmail.com
      </div>
      <div class="d-flex justify-content-between">
        <strong>Shipping method:</strong>
        GHTK -Standard
      </div>
      
      <div class="d-flex justify-content-between">
        <strong>Estimated Delivery Date:</strong>
        12/11/2023
      </div>

      <div class="d-flex justify-content-between">
        <strong>Payment method:</strong>
        Pay with card
      </div>
      
      <strong>Order Summary:</strong>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Harry Potter and the Chamber of Secrets</td>
            <td>1</td>
            <td>10000</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <strong>Subtotal:</strong>
        10000
      </div>
      <div class="d-flex justify-content-between">
        <strong>Shipping cost:</strong>
        10000
      </div>
      <div class="d-flex justify-content-between">
        <strong>Voucher:</strong>
        <p class="text-danger">-30%</p>
      </div>
      <div class="d-flex justify-content-between">
        <h3>Total payment:</h3>
        <h3>17000</h3>
      </div>
      <div class="d-flex justify-content-between">
        <h3>Payment status:</h3>
        <h3>Paid</h3>
      </div>

      <strong>Note:</strong>

      <p class="font-italic">
        nho giao dung dia chi giup em nho giao dung dia chi giup em nho giao
        dung dia chi giup em
      </p>
    </div>
  );
}
export default Bills;

