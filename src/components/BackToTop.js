import React, { useEffect, useState } from "react";
// Styles
import styles from "./styles/backtotop.module.scss";
function BackToTop() {
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

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    scrollPosition > 1500 && (
      <div className={`${styles.backToTop} ${styles.fadeIn}`}>
        <a className={styles.backToTop__btn} onClick={() => backToTop()}>
          Back To Top
        </a>
      </div>
    )
  );
}

export default BackToTop;
