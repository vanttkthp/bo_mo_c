import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function UpdateBook() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState({
    id: bookId,
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

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const navigate = useNavigate();

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const result = await axios.get(
      `http://localhost:8080/books/getById?id=${bookId}`
    );
    setBook(result.data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(book.image);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      previewImage(file);
      setBook({ ...book, [e.target.name]: file }); // Cập nhật giá trị 'image' trong book
    } else {
      const { name, value } = e.target;
      setBook({ ...book, [name]: value });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      let downloadURL = book.image; // Giữ nguyên giá trị ban đầu nếu không có ảnh mới được chọn
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      }

      const bookData = {
        ...book,
        image: downloadURL,
      };
      console.log(bookData);
      await axios.post(`http://localhost:8080/books/update`, bookData);

      navigate("/books");
    } catch (error) {
      if (error.response && error.response.data) {
        showMessage(error.response.data);
      } else {
        showMessage("Error adding author.");
      }
      console.error("Error adding author:", error);
    }
  };
  const [message, setMessage] = useState("");
  const showMessage = (msg) => {
    setMessage(msg);
    // setTimeout(() => {
    //   setMessage("");
    // }, 2000); // Hiển thị trong 3 giây
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
    <form id="book-form" className="mb-3 ">
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
                <label htmlFor="title" className="form-label">
                  Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={book.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-authorId">Author*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-authorId"
                  placeholder="Enter book author id"
                  name="authorId"
                  value={book.authorId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="publisherId">Publisher Id*</label>
                <input
                  type="number"
                  className="form-control"
                  id="publisherId"
                  name="publisherId"
                  value={book.publisherId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="publishYear">Publisher Year*</label>
                <input
                  type="number"
                  className="form-control"
                  id="publishYear"
                  name="publishYear"
                  value={book.publishYear}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  min={1}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="book-language">Language*</label>
              <input
                type="text"
                className="form-control"
                id="book-language"
                placeholder="Enter language"
                name="language"
                value={book.language}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  min={1}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="book-price">Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="book-price"
                  name="price"
                  value={book.price}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  min={1}
                />
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="book-category">Category*</label>
              <select
                className="form-control"
                id="book-category"
                name="category"
                value={book.category}
                onChange={handleInputChange}
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
            <div className="form-group">
              <label htmlFor="book-description">Description</label>
              <textarea
                className="form-control"
                id="book-description"
                rows="3"
                value={book.description}
                name="description"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Book Cover</h2>
            <div className="form-group">
              <label htmlFor="book-image">Choose a file</label>
              <div className="mb-3">
                <input
                  type="file"
                  id="book-image"
                  name="image"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group text-center">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded border mt-2"
                  />
                )}
                {!previewUrl && (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="rounded border mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <button className="btn btn-outline-dark mb-3" onClick={handleSave}>
          Save Book
        </button>
        <Link to="/books" className="text-decoration-none text-blue text-center mb-3">
        Turn back
      </Link>
      </div>
      
    </form>
  );
}

export default UpdateBook;
