import React from "react";

import TabbedMenu from "../components/TabbedMenu";
import ProgressBar from "../components/ProgressBar";
import PriorityView from "../components/PriorityView";
import ItemsView from "../components/ItemsView";
import ModulesView from "../components/ModulesView";
import BackToTop from "../components/BackToTop";
// Redux
import { useSelector } from "react-redux";
import { tabsSelector } from "../slices/tabs";
// Styles
import "../styles/global.scss";

function Hideout() {
  const { tabs } = useSelector(tabsSelector);

  const priority_view = tabs[0] === "priority";
  const modules_view = tabs[0] === "modules";

  return (
    <section className="section">
      <div className="row mw-desktop-large">
        <div className="col-xs-12">
          <TabbedMenu />
          <ProgressBar />
          {priority_view && <PriorityView />}
          {!modules_view && !priority_view && <ItemsView />}
          <ModulesView />
          <BackToTop />
        </div>
      </div>
    </section>
  );
}

export default Hideout;
