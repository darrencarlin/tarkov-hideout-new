import React from "react";

// Redux
import { useSelector } from "react-redux";
import { hideoutSelector } from "../slices/hideout";
// Styles
import styles from "./styles/priority.module.scss";

function PriorityView() {
  const { hideout } = useSelector(hideoutSelector);

  return (
    <div className={styles.items}>
      <h2>Priority Items</h2>
      <div className={styles.category}>
        <div className={styles.header}>
          <h3 className={styles.header__title}>Items</h3>
          <span className={styles.header__remaining}>Remaining</span>
        </div>
        <div className={styles.body}>
          <ul className={styles.itemList}>
            {hideout.hardware_items.map((item, index) => {
              if (item.priority) {
                return (
                  <li className={styles.item} key={index}>
                    <span className={styles.item__name}>{item.item}</span>
                    {/*  <span className={styles.item__total}>{item.total}</span>
                    <span className={styles.item__remaining}>
                      {item.remaining}
                    </span> */}
                    <span className={styles.count}>
                      {item.total - item.remaining} / {item.total}
                    </span>
                  </li>
                );
              }
            })}

            {hideout.electronic_items.map((item, index) => {
              if (item.priority) {
                return (
                  <li className={styles.item} key={index}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__total}>{item.total}</span>
                    <span className={styles.item__remaining}>
                      {item.remaining}
                    </span>
                  </li>
                );
              }
            })}
            {hideout.medical_items.map((item, index) => {
              if (item.priority) {
                return (
                  <li className={styles.item} key={index}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__total}>{item.total}</span>
                    <span className={styles.item__remaining}>
                      {item.remaining}
                    </span>
                  </li>
                );
              }
            })}
            {hideout.valuable_items.map((item, index) => {
              if (item.priority) {
                return (
                  <li className={styles.item} key={index}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__total}>
                      {item.total
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span className={styles.item__remaining}>
                      {item.remaining
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PriorityView;
