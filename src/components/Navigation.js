import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { VscAccount, VscSignIn, VscSignOut, VscInfo } from "react-icons/vsc";

// Redux
import { useSelector } from "react-redux";
import { selectCount } from "../slices/count";
import { selectUser } from "../slices/user";
import { hideoutSelector } from "../slices/hideout";
// Styles
import styles from "./styles/navigation.module.scss";

function Navigation() {
  const { count } = useSelector(selectCount);
  const { user } = useSelector(selectUser);
  const {
    hideout: { hideout_version },
  } = useSelector(hideoutSelector);
  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("hideout");
    const isRoot = location.pathname == "/";
    if (isRoot) {
      window.location.reload(false);
    } else {
      window.location.href = "/";
    }
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
                <h1>Tarkov Hideout</h1>{" "}
                <span>
                  <VscInfo title="Hideout up to date with V12.9" /> v12.9
                </span>
              </Link>
            </li>
            {count > 0 && (
              <li className={styles.count}>
                <Fade>
                  <span>{count} PMC's in their hideout</span>
                </Fade>
              </li>
            )}

            <li>
              {user ? (
                <span>
                  {hideout_version === "12.9"
                    ? ""
                    : "Looks like your hideout is out of date.. reset through your profile page..."}
                </span>
              ) : (
                ""
              )}
            </li>
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
