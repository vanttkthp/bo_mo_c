import React from "react";

import BookShopList from "./components/Pages/BookShopList.jsx";
import Header from "./components/Layout/Header.jsx";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import BooksController from "./components/admin/Book/controller/BooksList.jsx";
import AddBook from "./components/admin/Book/controller/AddBook.jsx";
import ViewBook from "./components/admin/Book/controller/UpdateBook.jsx";

import Login from "./components/Pages/Login.jsx";
import Signup from "./components/Pages/Signup.jsx";
import BookDetails from "./components/Pages/BookDetails.jsx";

import Cart from "./components/user/Cart.jsx";
import AccessDenied from "./components/Pages/AccessDenied.jsx";
import Order from "./components/user/Order.jsx";
import Profile from "./components/user/Profile.jsx";
import Bills from "./components/user/Bills.jsx";

import MobilesController from "./components/admin/Mobile/MobilesManagement.jsx";
import ClothesController from "./components/admin/Clothes/ClothesController.jsx";
import AddPublisher from "./components/admin/Book/publisher/AddPublisher.jsx";

import UpdatePublisher from "./components/admin/Book/publisher/UpdatePublisher.jsx";
import PublishersList from "./components/admin/Book/publisher/PublishersList.jsx";
import AddCategory from "./components/admin/Book/category/AddCategory.jsx";
import CategoriesList from "./components/admin/Book/category/CategoriesList.jsx";
import UpdateCategory from "./components/admin/Book/category/UpdateCategory.jsx";
import UpdateAuthor from "./components/admin/Book/author/UpdateAuthor.jsx";
import AddAuthor from "./components/admin/Book/author/AddAuthor.jsx";
import AuthorsList from "./components/admin/Book/author/AuthorsList.jsx";
import BooksList from "./components/admin/Book/controller/BooksList.jsx";
import UpdateBook from "./components/admin/Book/controller/UpdateBook.jsx";


function App() {
  const AdminRoutes = () => {
    return <Routes></Routes>;
  };
  const UserRoutes = () => {
    return (
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    );
  };
  const AccessDeniedRoutes = () => {
    return (
      <Routes>
        <Route path="/noaccess" element={<AccessDenied />} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <div className="mb-4">
        <Header />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<BookShopList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {localStorage.getItem("isAdmin") ? (
            <>
              <Route path="/admin/*" element={<AdminRoutes />} />

              <Route
                path="/mobilescontroller"
                element={<MobilesController />}
              />
              <Route
                path="/clothescontroller"
                element={<ClothesController />}
              />
            </>
          ) : null}
          {localStorage.getItem("isUser") ? (
            <>
              <Route path="/user/*" element={<UserRoutes />} />
              <Route path="/user/order/:id" element={<Order />} />
              <Route path="/user/profile/:id" element={<Profile />} />
              <Route path="/user/bills" element={<Bills />} />
            </>
          ) : null}
          {/* <Route path="/book-detail/:id/edit" element={<EditBook/>} /> */}

          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/update/:id" element={<UpdateBook />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/publisher/add" element={<AddPublisher />} />
          <Route path="/publisher/update/:id" element={<UpdatePublisher />} />
          <Route path="/publisher/list" element={<PublishersList />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/list" element={<CategoriesList />} />
          <Route path="/category/update/:id" element={<UpdateCategory />} />
          <Route path="/author/update/:id" element={<UpdateAuthor />} />
          <Route path="/author/add" element={<AddAuthor />} />
          <Route path="/author/list" element={<AuthorsList />} />

          {/* Test components ở đây */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
