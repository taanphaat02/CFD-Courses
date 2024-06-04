import React from "react";
import { Link } from "react-router-dom";

const BlogMenu = ({ categories, selectedCategory, setSelectedCategory }) => {
  const _onChangeCategory = (e, id) => {
    e.preventDefault();
    setSelectedCategory(id);
  };

  return (
    <div className="blog__menu">
      <Link
        onClick={(e) => {
          _onChangeCategory(e, "");
        }}
        className={`blog__menu-item ${selectedCategory === "" ? "active" : ""}`}
      >
        Tất cả
      </Link>
      {!!categories?.length &&
        categories.map(({ id, index, name }) => {
          return (
            <Link
              key={id || index}
              onClick={(e) => _onChangeCategory(e, id)}
              className={`blog__menu-item ${
                selectedCategory === id ? "active" : ""
              }`}
            >
              {name}
            </Link>
          );
        })}
    </div>
  );
};

export default BlogMenu;
