import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaPlus } from "react-icons/fa";

function Profile() {
  const [editable, setEditable] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    pages: "",
    category: "",
    bookCover: "",
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

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8080/book/${id}`);
    setBook(result.data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(book.bookCover);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.name === "bookCover") {
      const file = e.target.files[0];
      setSelectedImage(file);
      previewImage(file);
    } else {
      const { name, value } = e.target;
      setBook({ ...book, [name]: value });
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (
      !book.title ||
      !book.author ||
      !book.pages ||
      !book.publishedDate ||
      !book.category
    ) {
      setIsDuplicate(false);
      setIsError(true);
      return;
    }
    try {
      let downloadURL = book.bookCover; // Giữ nguyên giá trị ban đầu nếu không có ảnh mới được chọn
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      }

      const bookData = {
        ...book,
        bookCover: downloadURL,
      };

      await axios.put(`http://localhost:8080/book/${id}`, bookData);
      setEditable(false);
      navigate("/bookscontroller");
    } catch (error) {
      setError("The book already exists in the database!");
    }
  };

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

  return (
    <form id="book-form" key={editable ? "edit" : "view"}>
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>User Information</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {isError && (
              <p className="text-danger">
                Please fill in all required(*) fields.
              </p>
            )}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="Title" className="form-label">
                  Last Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value="Van"
                  disabled={!editable}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-author">Last name*</label>
                <input
                  type="text"
                  className="form-control"
                  id="book-author"
                  placeholder="Enter book author"
                  name="author"
                  value="Dao"
                  disabled={!editable}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <label htmlFor="book-category">Address*</label>
            <form className="d-flex form-group">
            <select
                className="form-control  mr-2 custom-input"
                id="book-category"
                name="category"
                value="Mo Lao, Ha Dong, Ha Noi"
                disabled={!editable}
                onChange={handleInputChange}
              >
                <option disabled>Select an address</option>
                <option value="Science Fiction">Mo Lao, Ha Dong, Ha Noi</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Self-help">Self-help</option>
                <option value="Novel">Novel</option>
              </select>
              <button type="submit" className="btn btn-outline-dark" disabled={!editable}>
                ADD
              </button>
            </form>
            {/* <div className="form-group">
              <label htmlFor="book-category">Address*</label>
              <select
                className="form-control  mr-2 custom-input"
                id="book-category"
                name="category"
                value="Mo Lao, Ha Dong, Ha Noi"
                disabled={!editable}
                onChange={handleInputChange}
              >
                <option disabled>Select a category</option>
                <option value="Science Fiction">Mo Lao, Ha Dong, Ha Noi</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Self-help">Self-help</option>
                <option value="Novel">Novel</option>
              </select>
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="book-description">Description</label>
              <textarea
                className="form-control"
                id="book-description"
                rows="3"
                value={book.description}
                name="description"
                disabled={!editable}
                onChange={handleInputChange}
              ></textarea>
            </div> */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="book-release-date">Username*</label>
                <input
                  type="text"
                  className="form-control"
                  id="book-release-date"
                  name="publishedDate"
                  value="vanttkthp"
                  disabled={!editable}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-pages">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  id="book-pages"
                  name="pages"
                  value={book.pages}
                  disabled={!editable}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  min={1}
                />
              </div>
              
            </div>
            <label htmlFor="book-category">Card Number*</label>
              <form className="d-flex form-group">
              <input
                  type="password"
                  className="form-control  mr-2 custom-input"
                  id="book-pages"
                  name="pages"
                  value= "111111111"
                  disabled={!editable}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  
                  min={1}
                />
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  disabled={!editable}
                >
                  ADD
                </button>
              </form>
          </div>
          <div className="col-md-6">
            <h2>Avatar</h2>
            <div className="form-group">
              <label htmlFor="book-cover">Choose a file</label>
              <div className="mb-3">
                <input
                  type="file"
                  id="book-bookCover"
                  name="bookCover"
                  disabled={!editable}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-center"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
          {!editable ? (
            <button
              className="btn btn-outline-dark shadow"
              onClick={handleEdit}
            >
              Edit
            </button>
          ) : (
            <button
              className="btn btn-outline-dark shadow"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;
