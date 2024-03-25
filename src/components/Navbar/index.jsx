import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__main">
        <li className="navbar__link">
          <NavLink to="/" className="navbar__item">
            Trang chủ
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/about" className="navbar__item">
            Về CFD Circle
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/courses" className="navbar__item">
            Khóa học
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/blogs" className="navbar__item">
            Bài viết
          </NavLink>
        </li>
        <li className="navbar__link">
          <NavLink to="/contact" className="navbar__item">
            Liên hệ
          </NavLink>
        </li>
      </ul>
      <div className="navbar__overlay" />
    </nav>
  );
};

export default Navbar;
