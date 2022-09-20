import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { microgen } from "../lib/microgen";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await microgen.auth.login({
      username: username(),
      password: password(),
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/profile");
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username()}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password()}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-button">
          <button class="button button-primary" type="sumbit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
