import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddClothes() {
  let navigate = useNavigate();

  const [clothes, setClothes] = useState({
    brandId: 1,
    name: "",
    size: "",
    price: 0.0,
  });
  const [clothesCategory, setBookCategory] = useState({
    name: "",
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
      setClothes({ ...clothes, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedImage) {
        const storageRef = ref(storage, `book_covers/${selectedImage.name}`);
        await uploadBytes(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(storageRef);
        const clothesData = {
          ...clothes,
          image: downloadURL,
        };

        await axios.post("http://localhost:8080/clothes/add", clothesData);

        navigate("/clothes");
      } else {
        const clothesData = {
          ...clothes,
          image: "",
        };

        await axios.post("http://localhost:8080/clothes/add", clothesData);

        navigate("/clothes");
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

      <form onSubmit={(e) => onSubmit(e)} id="clothes-form" className="mb-3">
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
                  onChange={(e) => onInputChange(e)}
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
                  onChange={(e) => onInputChange(e)}
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
                  onChange={(e) => onInputChange(e)}
                  min={1}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="clothes-price">Price*</label>
                <input
                  type="number"
                  className="form-control"
                  id="clothes-price"
                  placeholder="Enter clothes price"
                  name="price"
                  value={clothes.price}
                  onChange={(e) => onInputChange(e)}
                  min={1}
                />
              </div>
            </div>
            <div className="col-md-6">
              <h2>Upload Clothes Image</h2>
              <div>
                <div className="form-group">
                  <input
                    type="file"
                    id="clothes-image"
                    name="image"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      onInputChange(e);
                      previewImage(file);
                    }}
                    className=""
                  />
                </div>
                <div className="form-group text-center">
                  <img
                    id="preview"
                    src={previewUrl}
                    className="rounded border mt-2"
                    alt="Preview"
                    style={{ maxWidth: "270px", maxHeight: "300px" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <button
            type="submit"
            className="btn btn-outline-dark mb-3"
            form="clothes-form"
          >
            Add
          </button>
        </div>
      </form>
  
  
  );
}
export default AddClothes;
