import React from "react";
import styles from "./Card.module.css";

const Card = ({ children, className }) => {
  return <div className={` ${className} ${styles.card} `}>{children}</div>;
};

export default Card;
