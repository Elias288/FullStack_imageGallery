import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAccessContext } from "../../utils/useAccessContext";
import LoaderComponent from "../../components/Loader/Loader.component";
import "./Login.css";

function LoginPage() {
  const { login, accessState } = useAccessContext();
  const navigate = useNavigate();

  const onSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
    const target = evt.target as typeof evt.target & {
      userName: { value: string };
      password: { value: string };
    };
    const userName = target.userName.value;
    const password = target.password.value;

    login(userName, password);
  };

  useEffect(() => {
    if (accessState.isLogged) navigate("/home");
  }, [accessState.isLogged, navigate]);

  return (
    <div className="LoginPage">
      {accessState.isLoading && <LoaderComponent />}

      {!accessState.isLoading && (
        <>
          <h1>Login</h1>
          {accessState.message !== "" && <p>{accessState.message}</p>}

          <form onSubmit={onSubmit}>
            <input type="text" name="userName" placeholder="userName" />
            <input type="password" name="password" placeholder="Password" />

            <input type="submit" value="Login" />
          </form>
        </>
      )}
    </div>
  );
}

export default LoginPage;
