const API = "http://localhost:3000/api";

const loginService = (userName: string, password: string) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ userName, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

export { loginService };
