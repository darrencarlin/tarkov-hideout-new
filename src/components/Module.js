import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
// Redux
import { useDispatch } from "react-redux";
import {
  updateHideout,
  setPercentage,
  prioritizeModule,
  markModuleComplete,
} from "../slices/hideout";
// Styles
import styles from "./styles/module.module.scss";

function Module({ mod, moduleIndex }) {
  const dispatch = useDispatch();

  const {
    item_requirments,
    module_requirments,
    loyalty_requirments,
    skill_requirments,
    module,
    level,
  } = mod;

  const requirments =
    module_requirments.length > 0 ||
    loyalty_requirments.length > 0 ||
    skill_requirments.length > 0;

  return (
    <div className={styles.module}>
      <div className={styles.header}>
        <h3 className={styles.header__title}>
          {module} {level}.
        </h3>

        <span className={styles.header__complete}>
          {mod.complete ? (
            <BsCheckCircle title="This module is complete!" />
          ) : (
            ""
          )}
        </span>
      </div>
      <div className={styles.body}>
        {item_requirments.length > 0 && (
          <ul className={`${styles.itemList} no-list`}>
            {item_requirments.map((item, index) => (
              <li className={styles.item} key={index}>
                <span className={styles.item__name}>{item.item}</span>
                {/* <span className={styles.item__have}>{item.have}</span> */}
                <span className={styles.item__need}>
                  {item.need > 100
                    ? item.need.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : item.need}
                </span>

                <input
                  className={styles.item__complete}
                  type="checkbox"
                  title={item.complete ? "Mark incomplete" : "Mark complete"}
                  checked={item.complete}
                  onClick={(evt) => {
                    const checked = evt.target.checked;
                    dispatch(
                      updateHideout({
                        level,
                        module,
                        moduleIndex,
                        item,
                        checked,
                        index,
                      })
                    );
                    dispatch(setPercentage());
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        {requirments && (
          <>
            <h4>Other Requirments</h4>
            <div className={styles.other_requirments}>
              {module_requirments.length > 0 && (
                <ul className={styles.modules}>
                  <li className={styles.title}>
                    <h5>Modules</h5>
                  </li>
                  {module_requirments.map((item, index) => (
                    <li className={styles.item} key={index}>
                      <span className={styles.item__level}>
                        {item.item.split(",")[1].trim()}
                      </span>
                      <span className={styles.item__name}>
                        {item.item.split(",")[0].trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {skill_requirments.length > 0 && (
                <ul className={styles.skills}>
                  <li className={styles.title}>
                    <h5>Skills</h5>
                  </li>
                  {skill_requirments.map((item, index) => (
                    <li className={styles.item} key={index}>
                      <span className={styles.item__level}>
                        {item.item.split(",")[1].trim()}
                      </span>
                      <span className={styles.item__name}>
                        {item.item.split(",")[0].trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {loyalty_requirments.length > 0 && (
                <ul className={styles.loyalty}>
                  <li className={styles.title}>
                    <h5>Loyalty</h5>
                  </li>
                  {loyalty_requirments.map((item, index) => (
                    <li className={styles.item} key={index}>
                      <span className={styles.item__level}>
                        {item.item.split(",")[1].trim()}
                      </span>
                      <span className={styles.item__name}>
                        {item.item.split(",")[0].trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
        <div className={styles.extras}>
          <span className={styles.markComplete}>
            <button
              className="buttonLink"
              onClick={() => {
                dispatch(
                  markModuleComplete({
                    moduleIndex,
                    mod,
                    module,
                    level,
                  })
                );
                dispatch(setPercentage());
              }}
            >
              {mod.complete ? "Reset Module" : " Mark Complete"}
            </button>
          </span>
          <span className={styles.prioritize}>
            <label htmlFor={moduleIndex}>
              Prioritize {module} {level}
            </label>
            <input
              type="checkbox"
              title={
                mod.prioritize ? "Deprioritize Module" : "Prioritize Module"
              }
              id={moduleIndex}
              checked={mod.prioritize}
              onClick={(evt) => {
                const checked = evt.target.checked;
                dispatch(
                  prioritizeModule({
                    moduleIndex,
                    mod,
                    module,
                    level,
                    checked,
                  })
                );
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Module;
