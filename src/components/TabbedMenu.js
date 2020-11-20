import React from "react";
import Fade from "react-reveal/Fade";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { tabsSelector } from "../slices/tabs";
import { updateTabs } from "../slices/tabs";
// Styles
import styles from "./styles/tabs.module.scss";

function TabbedMenu() {
  const dispatch = useDispatch();
  const { tabs } = useSelector(tabsSelector);

  const activeTab1 = tabs[0];
  const activeTab2 = tabs[1];

  const items_view = activeTab1 === "all" || activeTab1 === "items";

  const handleClick = (click, tab) => {
    dispatch(updateTabs({ click, tab }));
  };

  return (
    <div className={styles.tabs}>
      <Fade>
        <div className={styles.topMenu}>
          <button
            className={`${styles.all} ${styles.tab}`}
            onClick={() => handleClick("all", 0)}
          >
            <span>All</span>
            <span className={activeTab1 === "all" ? styles.active : ""}></span>
          </button>
          <button
            className={`${styles.all} ${styles.tab}`}
            onClick={() => handleClick("items", 0)}
          >
            <span>Items</span>
            <span
              className={activeTab1 === "items" ? styles.active : ""}
            ></span>
          </button>
          <button
            className={`${styles.all} ${styles.tab}`}
            onClick={() => handleClick("modules", 0)}
          >
            <span>Modules</span>
            <span
              className={activeTab1 === "modules" ? styles.active : ""}
            ></span>
          </button>
          <button
            className={`${styles.all} ${styles.tab}`}
            onClick={() => handleClick("priority", 0)}
          >
            <span>Priority</span>
            <span
              className={activeTab1 === "priority" ? styles.active : ""}
            ></span>
          </button>
        </div>
      </Fade>

      {items_view && (
        <Fade>
          <div className={styles.bottomMenu}>
            <button
              className={`${styles.all} ${styles.tab}`}
              onClick={() => handleClick("all", 1)}
            >
              <span>All</span>
              <span
                className={activeTab2 === "all" ? styles.active : ""}
              ></span>
            </button>
            <button
              className={`${styles.all} ${styles.tab}`}
              onClick={() => handleClick("hardware", 1)}
            >
              <span>Hardware</span>
              <span
                className={activeTab2 === "hardware" ? styles.active : ""}
              ></span>
            </button>
            <button
              className={`${styles.all} ${styles.tab}`}
              onClick={() => handleClick("electronics", 1)}
            >
              <span>Electronics</span>
              <span
                className={activeTab2 === "electronics" ? styles.active : ""}
              ></span>
            </button>
            <button
              className={`${styles.all} ${styles.tab}`}
              onClick={() => handleClick("medical", 1)}
            >
              <span>Medical</span>
              <span
                className={activeTab2 === "medical" ? styles.active : ""}
              ></span>
            </button>
            <button
              className={`${styles.all} ${styles.tab}`}
              onClick={() => handleClick("valuable", 1)}
            >
              <span>Valuables</span>
              <span
                className={activeTab2 === "valuable" ? styles.active : ""}
              ></span>
            </button>
          </div>
        </Fade>
      )}
    </div>
  );
}

export default TabbedMenu;
