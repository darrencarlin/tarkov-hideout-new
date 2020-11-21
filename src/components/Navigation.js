import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { VscAccount, VscSignIn, VscSignOut } from "react-icons/vsc";

// Redux
import { useSelector } from "react-redux";
import { selectCount } from "../slices/count";
import { selectUser } from "../slices/user";
// Styles
import styles from "./styles/navigation.module.scss";

function Navigation() {
  const { count } = useSelector(selectCount);
  const { user } = useSelector(selectUser);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("hideout");
    window.location.reload(false);
  };
  return (
    <nav className="section">
      <div className="row mw-desktop-large">
        <div className={styles.donate}>
          <a
            href="https://www.buymeacoffee.com/darrenc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a Tushonka&emoji=🥫&slug=darrenc&button_colour=333333&font_colour=ffffff&font_family=Inter&outline_colour=ffffff&coffee_colour=FFDD00" />
          </a>
        </div>
        <div className={`col-xs ${styles.navigationMenus}`}>
          <ul className="no-list reset">
            <li>
              <Link to="/">
                <h1>Tarkov Hideout</h1>
              </Link>
            </li>
            {count > 0 && (
              <li className={styles.count}>
                <Fade>
                  <span>{count} PMC's in their hideout</span>
                </Fade>
              </li>
            )}
          </ul>
          <ul className="no-list reset">
            {user !== null && user ? (
              <li>
                <Link to="/profile">
                  Hi,
                  <span className={styles.underline}>{user.handle}</span>{" "}
                  <VscAccount />
                </Link>

                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  role="button"
                  tabIndex="0"
                  onClick={() => handleLogout()}
                >
                  <span className={styles.underline}> Logout</span>
                  <VscSignOut />
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    Login <VscSignIn />
                  </Link>
                </li>
                {(user !== null) & user ? (
                  ""
                ) : (
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
