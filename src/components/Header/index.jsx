import { useEffect } from "react";
import { useMainContext } from "../../context/MainContext";
import HeaderLogo from "./HeaderLogo";
import HeaderAuthen from "./HeaderAuthen";
import PATHS from "../../constants/paths";
import { useLocation } from "react-router-dom";
import HeaderHumburger from "./HeaderHumburger";

const Header = () => {
  const { pathname } = useLocation();
  const isTransparent = [PATHS.HOME, PATHS.ABOUT].includes(pathname);

  useEffect(() => {
    function setBgHeader(scrollY) {
      let header = $("header");
      if (scrollY > header.height()) {
        header.addClass("--bgwhite");
      } else {
        if (isTransparent) {
          header.removeClass("--bgwhite");
        }
      }
    }
    function scrollBgHeader() {
      let scrollY = $(window).scrollTop();
      if ($(".header").hasClass("--transparent")) {
        setBgHeader(scrollY);
      }
    }

    window.addEventListener("scroll", scrollBgHeader);

    return () => {
      window.removeEventListener("scroll", scrollBgHeader);
    };
  }, [isTransparent]);

  return (
    <header
      className={`header --transparent ${!isTransparent ? "--bgwhite" : ""}`}
    >
      <div className="container-fluid">
        <HeaderHumburger />
        <HeaderLogo />
        <HeaderAuthen />
      </div>
    </header>
  );
};

export default Header;
