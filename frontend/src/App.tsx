import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login.page";
import NotFoundPage from "./pages/NotFound/NotFound.page";
import { useAccessContext } from "./utils/useAccessContext";
import HomePage from "./pages/Home/Home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <RequireAccess>
              <HomePage />
            </RequireAccess>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAccess({ children }: { children: React.ReactNode }) {
  const { accessState } = useAccessContext();
  if (!accessState.isLogged) return <Navigate to={"/"} replace />;
  return children;
}

export default App;
