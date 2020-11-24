import React from "react";
import { BsLightning } from "react-icons/bs";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { tabsSelector } from "../slices/tabs";
import { hideoutSelector, updatePriority } from "../slices/hideout";
// Styles
import styles from "./styles/items.module.scss";

function ItemsView() {
  const dispatch = useDispatch();

  const { tabs } = useSelector(tabsSelector);
  const { hideout } = useSelector(hideoutSelector);

  const hardware_view =
    hideout.hardware_items && (tabs[1] === "all" || tabs[1] === "hardware");
  const electronic_view =
    hideout.electronic_items &&
    (tabs[1] === "all" || tabs[1] === "electronics");
  const medical_view =
    hideout.medical_items && (tabs[1] === "all" || tabs[1] === "medical");
  const valuable_view =
    hideout.valuable_items && (tabs[1] === "all" || tabs[1] === "valuable");

  return (
    <div className={styles.items}>
      <h2>Individual Items</h2>
      {hardware_view && (
        <div className={styles.category}>
          <div className={styles.header}>
            <h3 className={styles.header__title}>Hardware</h3>
            <span className={styles.header__priority}>
              <BsLightning title="Prioritize this item" />
            </span>
          </div>
          <div className={styles.body}>
            <ul className={styles.itemList}>
              {hideout.hardware_items.map((item, index) => (
                <li className={styles.item} key={index}>
                  <span className={styles.item__name}>{item.item}</span>
                  {/* <span className={styles.item__total}>{item.total}</span>
                  <span className={styles.item__remaining}>
                    {item.remaining}
                  </span> */}

                  <span className={styles.count}>
                    {item.total - item.remaining} / {item.total}
                  </span>

                  <input
                    className={`${styles.item__priority}`}
                    type="checkbox"
                    checked={item.priority}
                    onClick={(evt) => {
                      const checked = evt.target.checked;
                      const string = "hardware_items";
                      dispatch(
                        updatePriority({ index, item, checked, string })
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {electronic_view && (
        <div className={styles.category}>
          <div className={styles.header}>
            <h3 className={styles.header__title}>Electronics</h3>
            <span className={styles.header__priority}>
              <BsLightning title="Prioritize this item" />
            </span>
          </div>
          <div className={styles.body}>
            <ul className={styles.itemList}>
              {hideout.electronic_items.map((item, index) => (
                <li className={styles.item} key={index}>
                  <span className={styles.item__name}>{item.item}</span>
                  {/* <span className={styles.item__total}>{item.total}</span>
                  <span className={styles.item__remaining}>
                    {item.remaining}
                  </span> */}
                  <span className={styles.count}>
                    {item.total - item.remaining} / {item.total}
                  </span>
                  <input
                    className={styles.item__priority}
                    type="checkbox"
                    checked={item.priority}
                    onClick={(evt) => {
                      const checked = evt.target.checked;
                      const string = "electronic_items";
                      dispatch(
                        updatePriority({ index, item, checked, string })
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {medical_view && (
        <div className={styles.category}>
          <div className={styles.header}>
            <h3 className={styles.header__title}>Medical</h3>
            <span className={styles.header__priority}>
              <BsLightning title="Prioritize this item" />
            </span>
          </div>
          <div className={styles.body}>
            <ul className={styles.itemList}>
              {hideout.medical_items.map((item, index) => (
                <li className={styles.item} key={index}>
                  <span className={styles.item__name}>{item.item}</span>
                  {/* <span className={styles.item__total}>{item.total}</span>
                  <span className={styles.item__remaining}>
                    {item.remaining}
                  </span> */}
                  <span className={styles.count}>
                    {item.total - item.remaining} / {item.total}
                  </span>
                  <input
                    className={styles.item__priority}
                    type="checkbox"
                    checked={item.priority}
                    onClick={(evt) => {
                      const checked = evt.target.checked;
                      const string = "medical_items";
                      dispatch(
                        updatePriority({ index, item, checked, string })
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {valuable_view && (
        <div className={styles.category}>
          <div className={styles.header}>
            <h3 className={styles.header__title}>Valuables</h3>
            <span className={styles.header__priority}>
              <BsLightning title="Prioritize this item" />
            </span>
          </div>
          <div className={styles.body}>
            <ul className={styles.itemList}>
              {hideout.valuable_items.map((item, index) => (
                <li className={styles.item} key={index}>
                  <span className={styles.item__name}>{item.item}</span>
                  {/* <span className={styles.item__total}>
                    {item.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span className={styles.item__remaining}>
                    {item.remaining
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span> */}

                  <span className={styles.count}>
                    {(item.total - item.remaining)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    /{" "}
                    {item.total
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <input
                    className={styles.item__priority}
                    type="checkbox"
                    checked={item.priority}
                    onClick={(evt) => {
                      const checked = evt.target.checked;
                      const string = "valuable_items";
                      dispatch(
                        updatePriority({ index, item, checked, string })
                      );
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsView;
