import React, { useState, useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  versionSelector,
  updateVersion,
  addNewItem,
  addNewModule,
  removeItem,
} from "../slices/dashboard";
// Componenets
import SaveButton from "../components/SaveButton";
// Styles
import styles from "./styles/dashboard.module.scss";

function Dashboard() {
  const [editMode, setEditMode] = useState(null);
  const [updatedItem, setUpdatedItem] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const dispatch = useDispatch();

  const { version } = useSelector(versionSelector);

  useEffect(() => {
    // API call to get Standard Edition version
    // Store in version redux state
  }, []);

  const changeVersion = () => {
    // API call to get version based on dropdown
    // Store in version redux state
  };

  return (
    <section className={`section ${styles.dashboard}`}>
      <div className="row mw-desktop-large">
        <div className="col-xs-12">
          <h3>Choose version</h3>
          <select name="versions" id="" className="select">
            <option value="se">Standard Edition</option>
            <option value="lb">Left Behind Edition</option>
            <option value="pe">Prepare for Escape Edition</option>
            <option value="eod">Edge of Darkness Edition</option>
          </select>
        </div>
        <div className="col-xs-12">
          <h3>Hardware Items</h3>
          <ul className={styles.items}>
            {version.hardware_items.map((item, index) => (
              <li className={styles.item} key={index}>
                <span
                  className={`${styles.item__name} ${
                    editMode === index ? styles.item__editing : ""
                  } `}
                  contentEditable={editMode === index}
                  onInput={(evt) =>
                    setUpdatedItem(evt.currentTarget.textContent)
                  }
                  suppressContentEditableWarning={true}
                >
                  {item.item}
                </span>
                <span
                  className={`${styles.item__required} ${
                    editMode === index ? styles.item__editing : ""
                  } `}
                  contentEditable={editMode === index}
                  onInput={(evt) =>
                    setUpdatedAmount(evt.currentTarget.textContent)
                  }
                  suppressContentEditableWarning={true}
                >
                  {item.total}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    if (editMode === index) {
                      dispatch(
                        updateVersion({
                          item,
                          index,
                          category: "hardware_items",
                          updatedAmount,
                          updatedItem,
                        })
                      );
                      setUpdatedAmount("");
                      setUpdatedItem("");
                      console.log("saving data");
                      setEditMode(false);
                    } else {
                      setEditMode(index);
                    }
                  }}
                >
                  {editMode === index ? "Save" : "Edit"}
                </span>
                <span
                  className={styles.item__delete}
                  onClick={() => {
                    dispatch(removeItem(item));
                  }}
                >
                  Delete
                </span>
              </li>
            ))}
            <li className={styles.item}>
              <input
                type="text"
                placeholder="Name"
                className={`${styles.item__name} input`}
                onChange={(evt) => {
                  setUpdatedItem(evt.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Amount"
                className={`${styles.item__required} input`}
                onChange={(evt) => {
                  setUpdatedAmount(evt.target.value);
                }}
              />
              <span
                className={styles.item__add}
                onClick={() => {
                  const newItem = {
                    item: updatedItem,
                    total: updatedAmount,
                    remaining: updatedAmount,
                    priority: false,
                  };
                  dispatch(addNewItem({ newItem, category: "hardware_items" }));
                }}
              >
                Add new item
              </span>
            </li>
          </ul>
        </div>
      </div>
      <SaveButton />
    </section>
  );
}

export default Dashboard;
