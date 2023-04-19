import React from "react";
import styles from "./IconButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({
  className,
  icon,
  size,
  onClick,
  selected,
  key,
  text,
}) => {
  return (
    <button
      key={key}
      className={`${styles.iconButton}  ${
        selected && styles.selected
      } ${className} `}
      onClick={onClick}
    >
      {icon ? <FontAwesomeIcon icon={icon} size={size} /> : text}
    </button>
  );
};

export default IconButton;
