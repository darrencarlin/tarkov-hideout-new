import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/user";
import { selectUser } from "../slices/user";
import { setHideout, hideoutSelector } from "../slices/hideout";
// Styles
import styles from "./styles/login.module.scss";

function Signup() {
  const { user } = useSelector(selectUser);
  const { hideout } = useSelector(hideoutSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  // Local state
  const [loading, setLoading] = useState(false);
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [version, setVersion] = useState("current");
  const [errors, setErrors] = useState({
    email: "",
    handle: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    //us-central1-tarkov-hideout-d2603.cloudfunctions.net/api
    https: axios
      .post(
        "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/signup",
        {
          handle,
          email,
          password,
          confirmPassword,
          version,
        }
      )
      .then((user) => {
        dispatch(setUser(user.data));
        localStorage.setItem("user", JSON.stringify(user.data));
        axios.post(
          "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/count/increment"
        );
        return user;
      })
      .then((user) => {
        const options = {
          headers: { Authorization: `Bearer ${user.data.token}` },
        };

        const userId = user.data.userId;
        const body = { userId, version, hideout };
        axios
          .post(
            "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/hideout",
            body,
            options
          )
          .then((hideout) => {
            dispatch(setHideout(hideout.data));
            localStorage.setItem("hideout", JSON.stringify(hideout.data));
            // history.push("/");
            // I think this solves a user not being authenticated (without a refresh) when they login
            window.location.href = "/";
          })
          .catch((err) => {
            setLoading(false);
            setErrors({
              ...err.response.data,
            });

            const timer = setTimeout(() => {
              setErrors({
                errorMessage: "",
              });
            }, 3000);
            return () => clearTimeout(timer);
          });
      })
      .catch((err) => {
        setLoading(false);
        setErrors({
          ...err.response.data,
        });

        const timer = setTimeout(() => {
          setErrors({
            email: "",
            handle: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
          });
        }, 3000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <section className="section">
      <div className="row mw-desktop-large">
        <div className="col-xs-12 col-md-5">
          <h1>Signup</h1>
          <form className={styles.form}>
            <label htmlFor="handle">
              Handle:
              <span className={styles.errors}>
                {errors.handle ? errors.handle : ""}
              </span>
            </label>
            <input
              className="input"
              type="text"
              name="handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />

            <label htmlFor="email">
              Email:
              <span className={styles.errors}>
                {errors.email ? errors.email : ""}
              </span>
            </label>
            <input
              className="input"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              Password:
              <span className={styles.errors}>
                {errors.password ? errors.password : ""}
              </span>
            </label>
            <input
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">
              Confirm Password:
              <span className={styles.errors}>
                {errors.confirmPassword ? errors.confirmPassword : ""}
              </span>
            </label>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="version">Choose your version:</label>
            <select
              name="version"
              className="select"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            >
              <option value="current"> Use Current Hideout </option>
              <option value="se">Standard Edition</option>
              <option value="pe">Prepare for Escape Edition</option>
              <option value="lb">Left Behind Edition</option>
              <option value="eod">Edge of Darkness Edition</option>
            </select>

            <div className={styles.errors}>
              {errors.errorMessage ? errors.errorMessage : ""}
            </div>
            <button
              className={`button ${styles.btn}`}
              onClick={(e) => handleSubmit(e)}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;
