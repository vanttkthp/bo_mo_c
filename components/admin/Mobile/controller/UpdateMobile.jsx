import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function UpdateMobile() {
  const { id: mobileId } = useParams();
  const [mobile, setMobile] = useState({
    id: mobileId,
    producerId: "",
    name: "",
    image: "",
    osType: "",
    description: "",
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
    loadMobile();
  }, []);

  const loadMobile = async () => {
    const result = await axios.get(
      `http://localhost:8080/mobiles/getById?id=${mobileId}`
    );
    setMobile(result.data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(mobile.image);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      previewImage(file);
      setMobile({ ...mobile, [e.target.name]: file }); // Cập nhật giá trị 'image' trong Mobile
    } else {
      const { name, value } = e.target;
      setMobile({ ...mobile, [name]: value });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      let downloadURL = mobile.image; // Giữ nguyên giá trị ban đầu nếu không có ảnh mới được chọn
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      }

      const mobileData = {
        ...mobile,
        image: downloadURL,
      };
      console.log(mobileData);
      await axios.post(`http://localhost:8080/mobiles/update`, mobileData);

      navigate("/mobiles");
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
    <form id="mobile-form" className="mb-3 ">
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>Mobile Information</h2>
            {message && <p className="text-danger">{message}</p>}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name" className="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile name"
                  name="name"
                  value={mobile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="mobile-producerId">Producer*</label>
                <input
                  type="number"
                  className="form-control"
                  id="mobile-producerId"
                  placeholder="Enter mobile author id"
                  name="producerId"
                  value={mobile.producerId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="osType">OS TYPE*</label>
                <input
                  type="number"
                  className="form-control"
                  id="osType"
                  name="osType"
                  value={mobile.osType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="mobile-price">Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="mobile-price"
                  name="price"
                  value={mobile.price}
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
              <label htmlFor="mobile-description">Description</label>
              <textarea
                className="form-control"
                id="mobile-description"
                rows="3"
                value={mobile.description}
                name="description"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Mobile Cover</h2>
            <div className="form-group">
              <label htmlFor="mobile-image">Choose a file</label>
              <div className="mb-3">
                <input
                  type="file"
                  id="mobile-image"
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
                    style={{ maxWidth: "180px", maxHeight: "200px" }}
                  />
                )}
                {!previewUrl && (
                  <img
                    src={mobile.image}
                    alt={mobile.name}
                    className="rounded border mt-2"
                    style={{ maxWidth: "180px", maxHeight: "200px" }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <button className="btn btn-outline-dark mb-3" onClick={handleSave}>
          Save Mobile
        </button>
        <Link to="/mobiles" className="text-decoration-none text-blue text-center mb-3">
        Turn back
      </Link>
      </div>
      
    </form>
  );
}

export default UpdateMobile;
