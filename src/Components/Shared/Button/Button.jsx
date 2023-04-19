import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, className, icon, style }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      style={style}
    >
      <span>{text}</span>
      {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
      {!icon && (
        <img
          className={styles.arrow}
          src="/assets/images/right-arrow.png"
          alt="arrow"
        />
      )}
    </button>
  );
};

export default Button;
