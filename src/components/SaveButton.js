import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateHideoutVersion } from "../slices/dashboard";

import { versionSelector } from "../slices/dashboard";
// Styles
import styles from "./styles/savebutton.module.scss";

function SaveButton() {
  const dispatch = useDispatch();

  const { version } = useSelector(versionSelector);
  return (
    <div className={`${styles.backToTop}`}>
      <a
        className={styles.backToTop__btn}
        onClick={() => dispatch(updateHideoutVersion(version.version))}
      >
        Update Firebase
      </a>
    </div>
  );
}

export default SaveButton;
