import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import validate from "../../redux/textLogin";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <section className="login-container">
      <div className="box">
        <form id="form" className="form" onSubmit={handleLogin}>
          <h2>Đăng nhập</h2>
          <div className="inputBox">
            <input
              onkeyup="validate()"
              type="text"
              name=""
              id="email"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Tên đăng nhập</span>
            <i></i>
            {/* <p id="text">he</p> */}
          </div>
          <div className="inputBox">
            <input
              type="password"
              name=""
              id=""
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Mật khẩu</span>
            <i></i>
            {/* <p id="text">hi</p> */}
          </div>
          <div className="links">
            <Link className="login-register" to="#">
              Quên mật khẩu
            </Link>
            <Link className="login-register-link" to="/register">
              Đăng ký
            </Link>
          </div>
          <input type="submit" value="Đăng nhập" />
        </form>
      </div>
    </section>
  );
};
export default Login;

// <section className="login-container">
//   <div className="login-title"> Log in</div>
//   <form onSubmit={handleLogin}>
//     <label>USERNAME</label>
//     <input
//       type="text"
//       placeholder="Enter your username"
//       onChange={(e) => setUsername(e.target.value)}
//     />
//     <label>PASSWORD</label>
//     <input
//       type="password"
//       placeholder="Enter your password"
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     <button type="submit"> Continue </button>
//   </form>
//   <div className="login-register"> Don't have an account yet? </div>
//   <Link className="login-register-link" to="/register">
//     Register one for free{" "}
//   </Link>
// </section>
