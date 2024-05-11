import { useAccessContext } from "../../utils/useAccessContext";
import SVGMenu from "../../assets/menu-svgrepo-com.svg";
import "./Header.css";
import { useEffect, useState } from "react";

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
        <span>v0.0.3</span>
      </div>

      {showNavBar && <NavBar />}
    </div>
  );
}

const NavBar = () => {
  const { accessDispatch } = useAccessContext();
  const [showNavBarContent, setShowNavBarContent] = useState(false);

  const toggleMenu = () => setShowNavBarContent(!showNavBarContent);
  const closeMenu = () => setShowNavBarContent(false);

  const signOut = () => {
    accessDispatch({ type: "signOut" });
  };
  return (
    <div className="NavBar">
      <img className="menuIcon" src={SVGMenu} onClick={toggleMenu} />

      <div className={`NavBarContent ${showNavBarContent ? "show" : ""}`}>
        <button onClick={signOut}>Logout</button>
      </div>
    </div>
  );
};

export default HeaderComponent;
