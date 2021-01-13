import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/user";
import { hideoutSlice, setHideout, updateHideout } from "../slices/hideout";
// Styles
import styles from "./styles/login.module.scss";
function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get user data
    setLoading(true);
    try {
      const login = await axios.post(
        "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/login",
        { email, password }
      );
      dispatch(setUser(login.data));
      localStorage.setItem("user", JSON.stringify(login.data));
      // get hideout data
      const hideout = await axios.get(`/hideout/${login.data.userId}`, {
        headers: {
          Authorization: `Bearer ${login.data.token}`,
        },
      });
      dispatch(setHideout(hideout.data));
      localStorage.setItem("hideout", JSON.stringify(hideout.data));
      //history.push("/");
      // I think this solves a user not being authenticated (without a refresh) when they login
      window.location.href = "/";
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
      setErrors(err.response.data.general);
      const timer = setTimeout(() => {
        setErrors("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <section className="section">
      <div className="row mw-desktop-large">
        <div className="col-xs-12 col-md-5">
          <h1>Login</h1>
          <form className={styles.form}>
            <label htmlFor="email">Email:</label>
            <input
              className="input"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.errors}>{errors}</div>
            <button
              className={`button ${styles.btn}`}
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <p>
              Don't have an account? <Link to="/signup"> Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;
