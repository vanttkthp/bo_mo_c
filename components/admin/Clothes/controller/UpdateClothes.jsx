import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UpdateClothes() {

  const { id: clothesId } = useParams();
  const [clothes, setClothes] = useState({
    id: clothesId,
    name: "",
    size: "",
    price: 0.0,
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
    loadClothes();
  }, []);

  const loadClothes = async () => {
    const result = await axios.get(
      `http://localhost:8080/clothes/getById?id=${clothesId}`
    );
    setClothes(result.data);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(clothes.image);


  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setSelectedImage(file);
      previewImage(file);
      setClothes({ ...clothes, [e.target.name]: file }); // Cập nhật giá trị 'image' trong clothes
    } else {
      const { name, value } = e.target;
      setClothes({ ...clothes, [name]: value });
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      let downloadURL = clothes.image; // Giữ nguyên giá trị ban đầu nếu không có ảnh mới được chọn
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        downloadURL = await getDownloadURL(storageRef);
      }

      const clothesData = {
        ...clothes,
        image: downloadURL,
      };
      console.log(clothesData);
      await axios.post(`http://localhost:8080/clothes/update`, clothesData);

      navigate("/clothes/list");
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
    <form id="clothes-form" className="mb-3 ">
      <div
        className="container mt-5 card shadow border bg-white"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2>Clothes Information</h2>
            {message && <p className="text-danger">{message}</p>}
          
            <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name*
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Clothes name"
                  name="name"
                  value={clothes.name}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clothes-brandId">Brand*</label>
                <input
                  type="number"
                  className="form-control"
                  id="clothes-brandId"
                  placeholder="Enter brandId"
                  name="brandId"
                  value={clothes.brandId}
                  onChange={(e) => handleInputChange(e)}
                  min={1}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clothes-size">Size*</label>
                <input
                  type="number"
                  className="form-control"
                  id="clothes-size"
                  placeholder="Enter size"
                  name="size"
                  value={clothes.size}
                  onChange={(e) => handleInputChange(e)}
                  min={1}
                  required
                />
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
                <label htmlFor="clothes-price">Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="clothes-price"
                  placeholder="Enter clothes price"
                  name="price"
                  value={clothes.price}
                  onChange={(e) => handleInputChange(e)}
                  min={1}
                />
              </div>
          </div>
          <div className="col-md-6">
            <h2>Upload Clothes Image</h2>
            <div className="form-group">
              <div className="mb-3">
                <input
                  type="file"
                  id="clothes-image"
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
                    src={clothes.image}
                    alt={clothes.name}
                    className="rounded border mt-2"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <button className="btn btn-outline-dark mb-3" onClick={handleSave}>
          Save
        </button>
      </div>
    </form>
  );
}

export default UpdateClothes;
