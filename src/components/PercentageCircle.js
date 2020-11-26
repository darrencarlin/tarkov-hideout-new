import React, { useEffect, useState } from "react";
// Redux
import { useSelector } from "react-redux";
import { hideoutSelector } from "../slices/hideout";
import "./styles/circle.css";

function PercentageCircle() {
  const {
    hideout: { percentage },
  } = useSelector(hideoutSelector);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    scrollPosition > 1500 &&
    percentage > 0 && (
      <div className="circle fadeIn">
        <div className={`c100 p${percentage} small `}>
          <span>{percentage}%</span>
          <div className="slice">
            <div className="bar"></div>
            <div className="fill"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default PercentageCircle;
