import { useAccessContext } from "../../utils/useAccessContext";
import "./Home.css";

function HomePage() {
  const { accessDispatch } = useAccessContext();

  const signOut = () => {
    accessDispatch({ type: "signOut" });
  };

  return (
    <div className="HomePage">
      <h1>Home</h1>

      <button onClick={signOut}>Logout</button>
    </div>
  );
}

export default HomePage;
