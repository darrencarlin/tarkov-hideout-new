import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../slices/user";
import { resetHideout, setPercentage } from "../slices/hideout";
// Styles
import styles from "./styles/profile.module.scss";

function Profile() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [newVersion, setNewVersion] = useState("Standard Edition");
  const { user } = useSelector(selectUser);

  const deleteUser = async () => {
    const { userId, token } = user;

    console.log(token);
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axios.delete(
      `https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/user/${userId}`,
      options
    );
    await axios.post(
      "https://us-central1-tarkov-hideout-d2603.cloudfunctions.net/api/count/decrement"
    );
    localStorage.removeItem("user");
    localStorage.removeItem("hideout");
    window.location.href = "/";
  };

  let version;

  switch (user.version) {
    case "se":
      version = " Standard Edition";
      break;
    case "be":
      version = " Left Behind Edition";
      break;
    case "pe":
      version = " Prepare for Escape Edition";
      break;
    case "eod":
      version = " Edge of Darkness Edition";
      break;
    case "current":
      version = " You chose a custom hideout when you signed up!";
  }

  return (
    <section className="section">
      <div className="row mw-desktop-large">
        <div className={`col-xs-12 ${styles.profile}`}>
          {user && (
            <>
              <h1>Hello {user.handle} </h1>
              <h4>Account Details</h4>
              <ul className="no-list reset">
                <li>
                  <p>User ID: {user.userId}</p>
                </li>
                <li>
                  <p> Email: {user.email}</p>
                </li>
                <li>
                  <p>
                    Version:
                    {version}
                  </p>
                </li>
                <li>
                  <p>Account created: {moment(user.createdAt).fromNow()}</p>
                </li>
              </ul>
              <h4>Account Options </h4>
              <ul className="no-list reset">
                {/* <li>
                  <button className={styles.btn} > Reset Password </button>
                </li>
                 */}
                <li>
                  <h5>Reset Hideout (Choose version)</h5>
                </li>
                <li className={styles.reset}>
                  <div className={styles.form}>
                    <select
                      name="version"
                      id="version"
                      className="input"
                      onChange={(evt) => setNewVersion(evt.target.value)}
                    >
                      <option value="Standard Edition">Standard Edition</option>
                      <option value="Left Behind Edition">
                        Left Behind Edition
                      </option>
                      <option value="Prepare for Escape Edition">
                        Prepare for Escape Edition
                      </option>
                      <option value="Edge of Darkness Edition">
                        Edge of Darkness Edition
                      </option>
                    </select>
                    <button
                      className={styles.btn}
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to reset your hideout? This action cannot be reversed"
                          )
                        ) {
                          localStorage.removeItem("hideout");
                          dispatch(resetHideout(newVersion));
                          dispatch(setPercentage());
                        }
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </li>
                <li>
                  <br />
                </li>
                <li>
                  <button
                    className={styles.btn}
                    onClick={() => {
                      if (
                        confirm(
                          "Are you sure you want to delete your account? This action cannot be reversed"
                        )
                      ) {
                        deleteUser();
                      }
                    }}
                  >
                    Delete Account
                  </button>
                </li>
              </ul>
              {/* <h4>Change Version</h4>
              <p>Changing your version will reset your hideout!</p>
              <form>
                <select
                  name="version"
                  className="select"
                  defaultValue={user.version}
                  onChange={(evt) => setVersion(evt.target.value)}
                >
                  <option value="se">Standard Edition</option>
                  <option value="pe">Prepare for Escape Edition</option>
                  <option value="lb">Left Behind Edition</option>
                  <option value="eod">Edge of Darkness Edition</option>
                </select>

                <input
                  className="input"
                  type="submit"
                  value={loading ? "Changing..." : "Change"}
                  onClick={(evt) => handleSubmit(evt)}
                />
              </form> */}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;

// <div>
//   <h1>Profile</h1>
//   <div>Handle: {user.handle}</div>
//   <div>Email: {user.email}</div>
//   <div>Version: {user.version}</div>
//   <div>User ID: {user.userId}</div>
//   <div>Account created: {moment(new Date(user.createdAt)).fromNow()}</div>
// </div>
