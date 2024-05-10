import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Not found</h1>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
}

export default NotFoundPage;
