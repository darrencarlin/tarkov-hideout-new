import React from "react";
// Redux
import { useSelector } from "react-redux";
import { hideoutSelector } from "../slices/hideout";
// Styles
import styles from "./styles/progress.module.scss";

function ProgressBar() {
  const {
    hideout: { percentage },
  } = useSelector(hideoutSelector);

  return (
    <div className={styles.progressBar}>
      <span className={styles.progressBar__title}>Hideout Progress</span>
      <h3 className={styles.progressBar__percentage}>{percentage}% complete</h3>
      <div className={styles.progressBar__bar}>
        <span style={{ width: `${percentage}%` }}></span>
      </div>
    </div>
  );
}

export default ProgressBar;
