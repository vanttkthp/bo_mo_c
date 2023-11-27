import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function MobileDetails() {
  // Khai báo state và useEffect tương tự như trong BookDetails
  // ...

  const loadMobile = async () => {
    const result = await axios.get(
      `http://localhost:8080/mobiles/getById?id=${id}`
    );
    setMobile(result.data);
  };

  const loadReviews = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/rating/getByMobileId?id=${id}`
      );
      const reviewsArray = Array.isArray(result.data)
        ? result.data
        : [result.data];
      setReviews(reviewsArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* Phần hiển thị thông tin chi tiết của Mobile */}
      {/* Các thành phần giống như BookDetails, chỉ thay đổi dữ liệu hiển thị */}
      {/* ... */}

      {/* Phần hiển thị các đánh giá và bình luận */}
      <div>
        <h4>Comments</h4>
        {reviews.map((review) => (
          <div key={review.id}>
            <div>
              <p className="h5">{review.reviewer}</p>
              {[...Array(review.ratingScore)].map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
            </div>
            {/* Hiển thị đánh giá, bình luận của người dùng */}
            {/* ... */}
            <hr />
          </div>
        ))}
      </div>
      {/* CSS để giới hạn hiển thị đánh giá và bình luận */}
      <style>
        {`
        p {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 100px;
          line-height: 1.5;
        }
        `}
      </style>
    </div>
  );
}

export default MobileDetails;
