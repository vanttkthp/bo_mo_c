import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";

import BooksList from "./admin/Book/book/BooksList";
import AuthorsList from "./admin/Book/author/AuthorsList";
import PublishersList from "./admin/Book/publisher/PublishersList";
import CategoriesList from "./admin/Book/category/CategoriesList";

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState("books"); // Mục được chọn mặc định là 'books'

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to="/books" className="nav-link" activeClassName="active">
            Books
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/author/list" className="nav-link" activeClassName="active">
            Authors
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/publisher/list" className="nav-link" activeClassName="active">
            Publishers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/category/list" className="nav-link" activeClassName="active">
            Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
