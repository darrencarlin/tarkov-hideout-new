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
  changeVersion,
  setComplete,
} from "../slices/dashboard";
// Componenets
import SaveButton from "../components/SaveButton";
// Styles
import styles from "./styles/dashboard.module.scss";
import { update } from "lodash";

function Dashboard() {
  const [editMode, setEditMode] = useState(null);

  const [selectedVersion, setSelectedVersion] = useState("se");
  const [updatedItem, setUpdatedItem] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const dispatch = useDispatch();

  const { version } = useSelector(versionSelector);

  useEffect(() => {
    // API call to get Standard Edition version
    // Store in version redux state

    switch (version.version) {
      case "Standard Edition":
        setSelectedVersion("se");
        break;
      case "Left Behind Edition":
        setSelectedVersion("lb");
        break;
      case "Prepare for Escape Edition":
        setSelectedVersion("pe");
        break;
      case "Edge of Darkness Edition":
        setSelectedVersion("eod");
        break;
    }
    dispatch(getInitalVersion());
  }, []);

  const updateVersion = (v) => {
    console.log(v);
    dispatch(changeVersion(v));
  };

  return (
    <section className={`section ${styles.dashboard}`}>
      <div className="row mw-desktop-large">
        <div className={`col-xs-12 ${styles.column}`}>
          <h3>Choose version</h3>
          <select
            name="versions"
            id=""
            className="select"
            onChange={(evt) => {
              setSelectedVersion(evt.target.value);
              updateVersion(evt.target.value);
            }}
            value={selectedVersion}
          >
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
                  title="Total"
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
                  title="Remaining"
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setRemainingAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.remaining}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "hardware_items",
                        index: index,
                        remaining: remainingAmount || item.remaining,
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
                placeholder="Total"
                className={`${styles.item__required} input`}
                onChange={(evt) => {
                  setUpdatedAmount(evt.target.value);
                }}
              />
              <input
                type="number"
                className={`${styles.item__required} input`}
                placeholder="Remain"
                onChange={(evt) => {
                  setRemainingAmount(evt.target.value);
                }}
              />
              <span
                className={styles.item__add}
                onClick={() => {
                  dispatch(
                    addNewItem({
                      category: "hardware_items",
                      item: updatedItem,
                      remaining: remainingAmount || item.remaining,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setRemainingAmount(0);
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
                  title="Total"
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
                  title="Remaining"
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setRemainingAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.remaining}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "electronic_items",
                        index: index,
                        remaining: remainingAmount || item.remaining,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setRemainingAmount(0);
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
                placeholder="Total"
                className={`${styles.item__required} input`}
                onChange={(evt) => {
                  setUpdatedAmount(evt.target.value);
                }}
              />
              <input
                type="number"
                className={`${styles.item__required} input`}
                placeholder="Remain"
                onChange={(evt) => {
                  setRemainingAmount(evt.target.value);
                }}
              />
              <span
                className={styles.item__add}
                onClick={() => {
                  dispatch(
                    addNewItem({
                      category: "electronic_items",
                      item: updatedItem,
                      remaining: remainingAmount || item.remaining,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setRemainingAmount(0);
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
                  title="Total"
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
                  title="Remaining"
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setRemainingAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.remaining}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "medical_items",
                        index: index,
                        remaining: remainingAmount || item.remaining,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setRemainingAmount(0);
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
                placeholder="Total"
                className={`${styles.item__required} input`}
                onChange={(evt) => {
                  setUpdatedAmount(evt.target.value);
                }}
              />
              <input
                type="number"
                className={`${styles.item__required} input`}
                placeholder="Remain"
                onChange={(evt) => {
                  setRemainingAmount(evt.target.value);
                }}
              />
              <span
                className={styles.item__add}
                onClick={() => {
                  dispatch(
                    addNewItem({
                      category: "medical_items",
                      item: updatedItem,
                      remaining: remainingAmount || item.remaining,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setRemainingAmount(0);
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
                  title="Total"
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
                  title="Remaining"
                  className={styles.item__required}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(evt) =>
                    setRemainingAmount(parseInt(evt.target.innerHTML))
                  }
                >
                  {item.remaining}
                </span>
                <span
                  className={styles.item__edit}
                  onClick={() => {
                    dispatch(
                      updateItem({
                        category: "valuable_items",
                        index: index,
                        remaining: remainingAmount || item.remaining,
                        total: updatedAmount || item.total,
                      })
                    );
                    setUpdatedAmount(0);
                    setRemainingAmount(0);
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
                placeholder="Total"
                className={`${styles.item__required} input`}
                onChange={(evt) => {
                  setUpdatedAmount(evt.target.value);
                }}
              />
              <input
                type="number"
                className={`${styles.item__required} input`}
                placeholder="Remain"
                onChange={(evt) => {
                  setRemainingAmount(evt.target.value);
                }}
              />
              <span
                className={styles.item__add}
                onClick={() => {
                  dispatch(
                    addNewItem({
                      category: "valuable_items",
                      item: updatedItem,
                      remaining: remainingAmount || item.remaining,
                      total: updatedAmount,
                    })
                  );
                  setUpdatedAmount(0);
                  setRemainingAmount(0);
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
              <p>
                Complete{" "}
                <input
                  type="checkbox"
                  onClick={() => {
                    dispatch(setComplete({ moduleIndex }));
                  }}
                />
              </p>
              <p className={styles.requirements}>Item Requirements</p>
              <ul className={styles.items}>
                {item.item_requirements.map((item, itemIndex) => (
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
                            category: "item_requirements",
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
                            category: "item_requirements",
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
                    placeholder="Total"
                    onChange={(evt) => {
                      setUpdatedAmount(evt.target.value);
                    }}
                  />

                  <span
                    className={styles.item__add}
                    onClick={() => {
                      dispatch(
                        addNewModuleItem({
                          category: "item_requirements",
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

              <p className={styles.requirements}>Loyalty Requirements</p>
              <ul className={styles.items}>
                {item.loyalty_requirements.map((item, itemIndex) => (
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
                            category: "loyalty_requirements",
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
                          category: "loyalty_requirements",
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
              <p className={styles.requirements}>Module Requirements</p>
              <ul className={styles.items}>
                {item.module_requirements.map((item, itemIndex) => (
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
                            category: "module_requirements",
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
                          category: "module_requirements",
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
              <p className={styles.requirements}>Skill Requirements</p>
              <ul className={styles.items}>
                {item.skill_requirements.map((item, itemIndex) => (
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
                            category: "skill_requirements",
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
                          category: "skill_requirements",
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
