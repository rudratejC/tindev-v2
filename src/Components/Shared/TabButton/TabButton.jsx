import React from "react";
import styles from "./TabButton.module.css";

const TabButton = ({ selected, onClickHandler, content, className }) => {
  return (
    <div
      className={`${styles.tab}  ${selected && styles.selected} ${className}`}
      onClick={onClickHandler}
    >
      {content}
    </div>
  );
};

export default TabButton;
