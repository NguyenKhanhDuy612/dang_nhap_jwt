import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import "./register.css";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      username: username,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    // <section className="register-container">
    //   <div className="register-title"> Sign up </div>
    //   <form onSubmit={handleLogin}>
    //     <label>EMAIL</label>
    //     <input
    //       type="text"
    //       placeholder="Enter your email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
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
    //     <button type="submit"> Create account </button>
    //   </form>
    // </section>
    <section className="login-container">
      <div className="box-register">
        <form id="form" className="form" onSubmit={handleLogin}>
          <h2>Đăng Ký</h2>
          <div className="inputBox">
            <input
              type="text"
              name=""
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Nhập EMAIL</span>
            <i></i>
            {/* <p id="text">he</p> */}
          </div>
          <div className="inputBox">
            <input
              type="text"
              name=""
              id=""
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
            <Link className="login-register-link" to="/login">
              {/* Đăng nhập */}
            </Link>
            <Link className="login-register-link" to="/login">
              Đăng nhập
            </Link>
          </div>
          <input type="submit" value="Đăng ký" />
        </form>
      </div>
    </section>
  );
};

export default Register;
