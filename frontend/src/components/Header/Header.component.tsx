import SVGMenu from "../../assets/menu-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderComponentProps {
  title: string;
  showNavBar?: boolean;
}
function HeaderComponent({ title, showNavBar = false }: HeaderComponentProps) {
  useEffect(() => {
    document.title = "ImageGallery - " + title;
  }, [title]);

  return (
    <div className="HeaderComponent">
      <div>
        <h1>{title}</h1>
        <span>v0.0.4</span>
      </div>

      {showNavBar && <NavBar />}
    </div>
  );
}

const NavBar = () => {
  const [showNavBarContent, setShowNavBarContent] = useState(false);

  const toggleMenu = () => setShowNavBarContent(!showNavBarContent);
  const closeMenu = () => setShowNavBarContent(false);

  return (
    <div className="NavBar">
      <img className="menuIcon" src={SVGMenu} onClick={toggleMenu} />

      <div className={`NavBarContent ${showNavBarContent ? "show" : ""}`}>
        <Link to={"/home"} onClick={closeMenu}>
          Home
        </Link>
        <Link to={"/logout"} onClick={closeMenu}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default HeaderComponent;
