import React, { useState, useEffect } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  versionSelector,
  updateVersion,
  updateItem,
  addNewItem,
  addNewModuleItem,
  removeItem,
  removeModuleItem,
  getInitalVersion,
  addNewModuleRequirement,
  updateModule,
  removeModuleRequirement,
} from "../slices/dashboard";
// Componenets
import SaveButton from "../components/SaveButton";
// Styles
import styles from "./styles/dashboard.module.scss";
import { update } from "lodash";

function Dashboard() {
  const [editMode, setEditMode] = useState(null);
  const [updatedItem, setUpdatedItem] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const dispatch = useDispatch();

  const { version } = useSelector(versionSelector);
  console.log(version);
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
        <div className={`col-xs-12 ${styles.column}`}>
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
                <span className={styles.item__name}>{item.item}</span>
                <span
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setUpdatedAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.total}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "hardware_items",
                        index: index,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setUpdatedItem("");
                  }}
                >
                  Save
                </span>
                <span
                  className={styles.item__delete}
                  onClick={() => {
                    dispatch(removeItem({ category: "hardware_items", index }));
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
                  dispatch(
                    addNewItem({
                      category: "hardware_items",
                      item: updatedItem,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setUpdatedItem("");
                }}
              >
                Add new item
              </span>
            </li>
          </ul>
        </div>
        <div className={`col-xs-12 ${styles.column}`}>
          <h3>Electronic Items</h3>
          <ul className={styles.items}>
            {version.electronic_items.map((item, index) => (
              <li className={styles.item} key={index}>
                <span className={styles.item__name}>{item.item}</span>
                <span
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setUpdatedAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.total}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "electronic_items",
                        index: index,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setUpdatedItem("");
                  }}
                >
                  Save
                </span>
                <span
                  className={styles.item__delete}
                  onClick={() => {
                    dispatch(
                      removeItem({ category: "electronic_items", index })
                    );
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
                  dispatch(
                    addNewItem({
                      category: "electronic_items",
                      item: updatedItem,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setUpdatedItem("");
                }}
              >
                Add new item
              </span>
            </li>
          </ul>
        </div>
        <div className={`col-xs-12 ${styles.column}`}>
          <h3>Medical Items</h3>
          <ul className={styles.items}>
            {version.medical_items.map((item, index) => (
              <li className={styles.item} key={index}>
                <span className={styles.item__name}>{item.item}</span>
                <span
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setUpdatedAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.total}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "medical_items",
                        index: index,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setUpdatedItem("");
                  }}
                >
                  Save
                </span>
                <span
                  className={styles.item__delete}
                  onClick={() => {
                    dispatch(removeItem({ category: "medical_items", index }));
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
                  dispatch(
                    addNewItem({
                      category: "medical_items",
                      item: updatedItem,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setUpdatedItem("");
                }}
              >
                Add new item
              </span>
            </li>
          </ul>
        </div>
        <div className={`col-xs-12 ${styles.column}`}>
          <h3>Valuable Items</h3>
          <ul className={styles.items}>
            {version.valuable_items.map((item, index) => (
              <li className={styles.item} key={index}>
                <span className={styles.item__name}>{item.item}</span>
                <span
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setUpdatedAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.total}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "valuable_items",
                        index: index,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setUpdatedItem("");
                  }}
                >
                  Save
                </span>
                <span
                  className={styles.item__delete}
                  onClick={() => {
                    dispatch(removeItem({ category: "valuable_items", index }));
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
                  dispatch(
                    addNewItem({
                      category: "valuable_items",
                      item: updatedItem,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setUpdatedItem("");
                }}
              >
                Add new item
              </span>
            </li>
          </ul>
        </div>

        <div className={`col-xs-12 ${styles.column}`}>
          {version.modules.map((item, moduleIndex) => (
            <div className={styles.modules}>
              <h3>
                {item.module} {item.level}.
              </h3>
              <p className={styles.requirment}>Item Requirements</p>
              <ul className={styles.items}>
                {item.item_requirments.map((item, itemIndex) => (
                  <li className={styles.item} key={itemIndex}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span
                      className={styles.item__required}
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onInput={(evt) =>
                        setUpdatedAmount(parseInt(evt.target.innerHTML))
                      }
                    >
                      {item.need}
                    </span>
                    <span
                      className={styles.item__edit}
                      onClick={() => {
                        dispatch(
                          updateModule({
                            category: "item_requirments",
                            moduleIndex,
                            itemIndex,
                            total: updatedAmount || item.need,
                          })
                        );
                        setUpdatedAmount(0);
                        setUpdatedItem("");
                      }}
                    >
                      Save
                    </span>
                    <span
                      className={styles.item__delete}
                      onClick={() => {
                        dispatch(
                          removeModuleItem({
                            category: "item_requirments",
                            moduleIndex,
                            itemIndex,
                          })
                        );
                        setUpdatedAmount(0);
                        setUpdatedItem("");
                      }}
                    >
                      Delete
                    </span>
                  </li>
                ))}

                <li className={styles.item}>
                  <input
                    type="text"
                    className={`${styles.item__name} input`}
                    placeholder="Name"
                    onChange={(evt) => {
                      setUpdatedItem(evt.target.value);
                    }}
                  />
                  <input
                    type="number"
                    className={`${styles.item__required} input`}
                    placeholder="Amount"
                    onChange={(evt) => {
                      setUpdatedAmount(evt.target.value);
                    }}
                  />
                  <span
                    className={styles.item__add}
                    onClick={() => {
                      dispatch(
                        addNewModuleItem({
                          category: "item_requirments",
                          moduleIndex,
                          item: updatedItem,
                          total: updatedAmount,
                        })
                      );
                      setUpdatedAmount(0);
                      setUpdatedItem("");
                    }}
                  >
                    Add new item
                  </span>
                </li>
              </ul>

              <p className={styles.requirment}>Loyalty Requirements</p>
              <ul className={styles.items}>
                {item.loyalty_requirments.map((item, itemIndex) => (
                  <li className={styles.item} key={itemIndex}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__required}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span className={styles.item__edit}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span
                      className={styles.item__delete}
                      onClick={() => {
                        dispatch(
                          removeModuleRequirement({
                            category: "loyalty_requirments",
                            moduleIndex,
                            itemIndex,
                          })
                        );
                        setUpdatedItem("");
                      }}
                    >
                      Delete
                    </span>
                  </li>
                ))}
                <li className={styles.item}>
                  <input
                    type="text"
                    className={`${styles.item__name} input`}
                    placeholder="Name"
                    onChange={(evt) => {
                      setUpdatedItem(evt.target.value);
                    }}
                  />
                  <span
                    className={styles.item__add}
                    onClick={() => {
                      dispatch(
                        addNewModuleRequirement({
                          category: "loyalty_requirments",
                          moduleIndex,
                          item: updatedItem,
                        })
                      );
                      setUpdatedItem("");
                    }}
                  >
                    Add new item
                  </span>
                </li>
              </ul>
              <p className={styles.requirment}>Module Requirements</p>
              <ul className={styles.items}>
                {item.module_requirments.map((item, itemIndex) => (
                  <li className={styles.item} key={itemIndex}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__required}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span className={styles.item__edit}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span
                      className={styles.item__delete}
                      onClick={() => {
                        dispatch(
                          removeModuleRequirement({
                            category: "module_requirments",
                            moduleIndex,
                            itemIndex,
                          })
                        );
                        setUpdatedItem("");
                      }}
                    >
                      Delete
                    </span>
                  </li>
                ))}
                <li className={styles.item}>
                  <input
                    type="text"
                    className={`${styles.item__name} input`}
                    placeholder="Name"
                    onChange={(evt) => {
                      setUpdatedItem(evt.target.value);
                    }}
                  />
                  <span
                    className={styles.item__add}
                    onClick={() => {
                      dispatch(
                        addNewModuleRequirement({
                          category: "module_requirments",
                          moduleIndex,
                          item: updatedItem,
                        })
                      );
                      setUpdatedItem("");
                    }}
                  >
                    Add new item
                  </span>
                </li>
              </ul>
              <p className={styles.requirment}>Skill Requirements</p>
              <ul className={styles.items}>
                {item.skill_requirments.map((item, itemIndex) => (
                  <li className={styles.item} key={itemIndex}>
                    <span className={styles.item__name}>{item.item}</span>
                    <span className={styles.item__required}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span className={styles.item__edit}>
                      {/*Empty span for spacing*/}
                    </span>
                    <span
                      className={styles.item__delete}
                      onClick={() => {
                        dispatch(
                          removeModuleRequirement({
                            category: "skill_requirments",
                            moduleIndex,
                            itemIndex,
                          })
                        );
                        setUpdatedItem("");
                      }}
                    >
                      Delete
                    </span>
                  </li>
                ))}
                <li className={styles.item}>
                  <input
                    type="text"
                    className={`${styles.item__name} input`}
                    placeholder="Name"
                    onChange={(evt) => {
                      setUpdatedItem(evt.target.value);
                    }}
                  />
                  <span
                    className={styles.item__add}
                    onClick={() => {
                      dispatch(
                        addNewModuleRequirement({
                          category: "skill_requirments",
                          moduleIndex,
                          item: updatedItem,
                        })
                      );
                      setUpdatedItem("");
                    }}
                  >
                    Add new item
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      <SaveButton />
    </section>
  );
}

export default Dashboard;
