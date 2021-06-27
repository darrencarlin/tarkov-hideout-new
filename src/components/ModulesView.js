import React from "react";
import Module from "./Module";
// Redux
import { useSelector } from "react-redux";
import { hideoutSelector } from "../slices/hideout";
import { tabsSelector } from "../slices/tabs";
// Styles
import styles from "./styles/modules.module.scss";

function ModulesView() {
  const { hideout } = useSelector(hideoutSelector);

  const { tabs } = useSelector(tabsSelector);
  const module_view =
    hideout.modules && (tabs[0] === "all" || tabs[0] === "modules");
  return (
    <div className={styles.modules}>
      {module_view && <h2>Individual Modules</h2>}
      {module_view &&
        hideout.modules.map((mod, index) => (
          <Module key={index} mod={mod} moduleIndex={index} />
        ))}
    </div>
  );
}

export default ModulesView;
