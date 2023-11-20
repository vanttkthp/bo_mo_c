import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddBook() {
  let navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    authorId: "",
    publisherId: "",
    description: "",
    publishYear: "",
    numerOfPages: "",
    language: "",
    image: "",
    price: "",
  });

  const firebaseConfig = {
    apiKey: "AIzaSyBaRCHuc71qP_WtAPOT-Lyo45Y_6Eu_TOk",
    authDomain: "bookstore-online-5335a.firebaseapp.com",
    projectId: "bookstore-online-5335a",
    storageBucket: "bookstore-online-5335a.appspot.com",
    messagingSenderId: "998135104592",
    appId: "1:998135104592:web:074395b35dfa92d862fd55",
    measurementId: "G-J3BL1XT5GG",
  };

  const [selectedImage, setSelectedImage] = useState(null);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const storage = getStorage(app);
  }, []);

  const onInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);
        const bookData = {
          ...book,
          image: downloadURL,
        };

        await axios.post("http://localhost:8080/books/add", bookData);

        navigate("/books");
      } else {
        const bookData = {
          ...book,
          image: "",
        };

        await axios.post("http://localhost:8080/books/add", bookData);

        navigate("/books");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding author.");
      }
      console.error("Error adding author:", error);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleKeyPress = (event) => {
    const enteredValue = event.target.value + event.key;
    if (enteredValue < 1) {
      event.preventDefault();
    }
  };
  const [message, setMessage] = useState("");
  const showMessage = (msg) => {
    setMessage(msg);
    // setTimeout(() => {
    //   setMessage("");
    // }, 2000); // Hiển thị trong 3 giây
  };

  return (
    <form onSubmit={(e) => onSubmit(e)} id="book-form" className="mb-3">
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>Book Information</h2>
            {message && <p className="text-danger">{message}</p>}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="Title" className="form-label">
                  Title*
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={book.title}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-authorId">Author*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-authorId"
                  placeholder="Enter AuthorId"
                  name="authorId"
                  value={book.authorId}
                  onChange={(e) => onInputChange(e)}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="book-publisherId">Publisher Id*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-publisherId"
                  placeholder="Enter publisher Id"
                  name="publisherId"
                  value={book.publisherId}
                  onChange={(e) => onInputChange(e)}
                  min={1}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-release-date">Publish Year*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-release-date"
                  name="publishYear"
                  value={book.publishYear}
                  onChange={(e) => onInputChange(e)}
                  placeholder="Enter publisher year"
                  min={1}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="book-publisherId">Language*</label>
              <input
                type="text"
                className="form-control"
                id="book-language"
                placeholder="Enter language"
                name="language"
                value={book.language}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="book-numerOfPages">Pages*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-numerOfPages"
                  placeholder="Enter book pages"
                  name="numerOfPages"
                  value={book.numerOfPages}
                  onChange={(e) => onInputChange(e)}
                  min={1}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-price">Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-price"
                  placeholder="Enter book price"
                  name="price"
                  value={book.price}
                  onChange={(e) => onInputChange(e)}
                  min={1}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="book-description">Description</label>
              <textarea
                className="form-control"
                id="book-description"
                rows="3"
                value={book.description}
                name="description"
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Book Cover</h2>
            <div>
              <div className="form-group">
                <input
                  type="file"
                  id="book-image"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    onInputChange(e);
                    previewImage(file);
                  }}
                  className="mb-3"
                />
              </div>
              <div className="form-group text-center">
                <img
                  id="preview"
                  src={previewUrl}
                  className="rounded border mt-2"
                  alt="Preview"
                />
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <button
          type="submit"
          className="btn btn-outline-dark mb-3"
          form="book-form"
        >
          Add
        </button>
      </div>
    </form>
  );
}
export default AddBook;
