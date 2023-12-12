import React from "react";

import BookShopList from "./components/Pages/BookPages/BookShopList.jsx";
import Header from "./components/Layout/Header.jsx";
import { getAuth } from "firebase/auth";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import AddBook from "./components/admin/Book/book/AddBook.jsx";

import Login from "./components/Pages/Login/Login.jsx";
import Signup from "./components/Pages/Login/Signup.jsx";
import BookDetails from "./components/Pages/BookPages/BookDetails.jsx";

import Cart from "./components/user/Cart/Cart.jsx";
import AccessDenied from "./components/Pages/Exception/AccessDenied.jsx";
import Order from "./components/user/Order/Order.jsx";
import Profile from "./components/user/Profile/Profile.jsx";
import Bills from "./components/user/Bills.jsx";

import AddPublisher from "./components/admin/Book/publisher/AddPublisher.jsx";

import UpdatePublisher from "./components/admin/Book/publisher/UpdatePublisher.jsx";
import PublishersList from "./components/admin/Book/publisher/PublishersList.jsx";
import AddCategory from "./components/admin/Book/category/AddCategory.jsx";
import CategoriesList from "./components/admin/Book/category/CategoriesList.jsx";
import UpdateCategory from "./components/admin/Book/category/UpdateCategory.jsx";
import UpdateAuthor from "./components/admin/Book/author/UpdateAuthor.jsx";
import AddAuthor from "./components/admin/Book/author/AddAuthor.jsx";
import AuthorsList from "./components/admin/Book/author/AuthorsList.jsx";
import BooksList from "./components/admin/Book/book/BooksList.jsx";
import UpdateBook from "./components/admin/Book/book/UpdateBook.jsx";
import NavBar from "./components/Layout/Navbar.jsx";
import VouchersList from "./components/admin/Voucher/VouchersList.jsx";
import AddVoucher from "./components/admin/Voucher/AddVoucher.jsx";
import UpdateVoucher from "./components/admin/Voucher/UpdateVoucher.jsx";
import AddClothes from "./components/admin/Clothes/controller/AddClothes.jsx";
import ClothesList from "./components/admin/Clothes/controller/ClothesList.jsx";
import UpdateClothes from "./components/admin/Clothes/controller/UpdateClothes.jsx";
import AddBrand from "./components/admin/Clothes/brand/AddBrand.jsx";
import BrandsList from "./components/admin/Clothes/brand/BrandsList.jsx";
import UpdateBrand from "./components/admin/Clothes/brand/UpdateBrand.jsx";
import AddCloCategory from "./components/admin/Clothes/category/AddCloCategory.jsx";
import CloCategoriesList from "./components/admin/Clothes/category/CloCategoriesList.jsx";
import UpdateCloCategory from "./components/admin/Clothes/category/UpdateCloCategory.jsx";
import AddMobile from "./components/admin/Mobile/controller/AddMobile.jsx";
import UpdateMobile from "./components/admin/Mobile/controller/UpdateMobile.jsx";
import MobilesList from "./components/admin/Mobile/controller/MobilesList.jsx";
import ProducersList from "./components/admin/Mobile/producer/ProducersList.jsx";
import AddProducer from "./components/admin/Mobile/producer/AddProducer.jsx";
import UpdateProducer from "./components/admin/Mobile/producer/UpdateProducer.jsx";
import Home from "./components/Pages/HomePage/Home.jsx";
import OrdersList from "./components/user/Order/OrdersList.jsx";
import MobileDetails from "./components/Pages/MobilePages/MobileDeitails.jsx";

// function App() {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   const AdminRoutes = () => {
//     return <Routes></Routes>;
//   };
//   const UserRoutes = () => {
//     return (
//       <Routes>
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     );
//   };
//   const AccessDeniedRoutes = () => {
//     return (
//       <Routes>
//         <Route path="/noaccess" element={<AccessDenied />} />
//       </Routes>
//     );
//   };

//   return (
//     <BrowserRouter>
//       <div className="mb-4">
//         <Header />
//       </div>
//       <div className="container">
//         <Routes>
//           <Route path="/" exact element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//           {localStorage.getItem("isAdmin") ? (
//             <>
//               <Route path="/admin/*" element={<AdminRoutes />} />
//             </>
//           ) : null}
//           {localStorage.getItem("isUser") ? (
//             <>
//               <Route path="/user/*" element={<UserRoutes />} />
//               <Route path="/user/order/:id" element={<Order />} />
//               <Route path="/user/profile/:id" element={<Profile />} />
//               <Route path="/user/bills" element={<Bills />} />
//             </>
//           ) : null}
//           {/* <Route path="/book-detail/:id/edit" element={<EditBook/>} /> */}

//           <Route path="/book/:id" element={<BookDetails />} />
//           <Route path="/books/add" element={<AddBook />} />
//           <Route path="/books/update/:id" element={<UpdateBook />} />
//           <Route path="/books" element={<BooksList />} />
//           <Route path="/publisher/add" element={<AddPublisher />} />
//           <Route path="/publisher/update/:id" element={<UpdatePublisher />} />
//           <Route path="/publisher/list" element={<PublishersList />} />
//           <Route path="/category/add" element={<AddCategory />} />
//           <Route path="/category/list" element={<CategoriesList />} />
//           <Route path="/category/update/:id" element={<UpdateCategory />} />
//           <Route path="/author/update/:id" element={<UpdateAuthor />} />
//           <Route path="/author/add" element={<AddAuthor />} />
//           <Route path="/author/list" element={<AuthorsList />} />
//           <Route path="/vouchers/list" element={<VouchersList />} />
//           <Route path="/vouchers/add" element={<AddVoucher />} />
//           <Route path="/vouchers/update/:id" element={<UpdateVoucher />} />
//           <Route path="/clothes/add" element={<AddClothes />} />
//           <Route path="/clothes/list" element={<ClothesList />} />
//           <Route path="/clothes/update/:id" element={<UpdateClothes />} />
//           <Route path="/brand/add" element={<AddBrand />} />
//           <Route path="/brand/list" element={<BrandsList />} />
//           <Route path="/brand/update/:id" element={<UpdateBrand />} />
//           <Route path="/clocategory/add" element={<AddCloCategory />} />
//           <Route
//             path="/clocategory/update/:id"
//             element={<UpdateCloCategory />}
//           />
//           <Route path="/clocategory/list" element={<CloCategoriesList />} />
//           <Route path="/mobile/add" element={<AddMobile />} />
//           <Route path="/mobile/update/:id" element={<UpdateMobile />} />
//           <Route path="/mobiles" element={<MobilesList />} />
//           <Route path="/producer/list" element={<ProducersList />} />
//           <Route path="/producer/add" element={<AddProducer />} />
//           <Route path="/producer/update/:id" element={<UpdateProducer />} />

//           {/* Test components ở đây */}
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  // Hàm kiểm tra người dùng đã đăng nhập hay chưa
  const isLoggedIn = () => {
    return user !== null; // Hoặc có thể thay đổi logic kiểm tra ở đây
  };

  // Các routes cho người dùng đã đăng nhập
  const AuthenticatedRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Các route khác cho người dùng đã đăng nhập */}
      </Routes>
    );
  };

  // Các routes cho người dùng chưa đăng nhập
  const AccessDeniedRoutes = () => {
    return <Routes></Routes>;
  };

  return (
    <BrowserRouter>
      <div className="mb-4">
        <Header />
      </div>
      <div className="container">
      <Routes>
      <Route path="/" element={<Home />} />
          
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/mobile/:id" element={<MobileDetails />} />
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
            <Route path="/vouchers/list" element={<VouchersList />} />
            <Route path="/vouchers/add" element={<AddVoucher />} />
            <Route path="/vouchers/update/:id" element={<UpdateVoucher />} />
            <Route path="/clothes/add" element={<AddClothes />} />
            <Route path="/clothes/list" element={<ClothesList />} />
            <Route path="/clothes/update/:id" element={<UpdateClothes />} />
            <Route path="/brand/add" element={<AddBrand />} />
            <Route path="/brand/list" element={<BrandsList />} />
            <Route path="/brand/update/:id" element={<UpdateBrand />} />
            <Route path="/clocategory/add" element={<AddCloCategory />} />
            <Route
              path="/clocategory/update/:id"
              element={<UpdateCloCategory />}
            />
            <Route path="/clocategory/list" element={<CloCategoriesList />} />
            <Route path="/mobile/add" element={<AddMobile />} />
            <Route path="/mobile/update/:id" element={<UpdateMobile />} />
            <Route path="/mobiles" element={<MobilesList />} />
            <Route path="/producer/list" element={<ProducersList />} />
            <Route path="/producer/add" element={<AddProducer />} />
            <Route path="/producer/update/:id" element={<UpdateProducer />} />
          
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/noaccess" element={<AccessDenied />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user/order/:id" element={<Order />} />


            <Route path="user/orderslist" element={<OrdersList />} />
          
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;