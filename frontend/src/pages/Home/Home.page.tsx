import HeaderComponent from "../../components/Header/Header.component";
import "./Home.css";

function HomePage() {
  return (
    <div className="HomePage">
      <HeaderComponent title="Home" showNavBar />
    </div>
  );
}

export default HomePage;
