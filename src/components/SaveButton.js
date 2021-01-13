import React from "react";
// Redux
import { useDispatch } from "react-redux";
import { updateHideoutVersion } from "../slices/hideout";
// Styles
import styles from "./styles/savebutton.module.scss";

function SaveButton() {
  const dispatch = useDispatch();
  return (
    <div className={`${styles.backToTop}`}>
      <a
        className={styles.backToTop__btn}
        onClick={() => dispatch(updateHideoutVersion())}
      >
        Update Firebase
      </a>
    </div>
  );
}

export default SaveButton;
