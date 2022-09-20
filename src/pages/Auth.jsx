import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { microgen } from "../lib/microgen";

import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const navigate = useNavigate();
  const [switchAuthForm, setSwitchAuthForm] = createSignal("login");

  createEffect(() => {
    (async () => {
      const { error } = await microgen.auth.user();

      if (error) {
        console.log(error);
        return;
      }

      navigate("/profile");
    })();
  }, []);

  const handleRegisterForm = () => {
    setSwitchAuthForm("register");
  };

  const handleLoginForm = () => {
    setSwitchAuthForm("login");
  };

  return (
    <div className="auth-page">
      <div className="auth-button">
        <button onClick={handleLoginForm}>Login</button>
        <button onClick={handleRegisterForm}>Register</button>
      </div>
      {switchAuthForm() === "register" ? <Register /> : <Login />}
    </div>
  );
};

export default Auth;
