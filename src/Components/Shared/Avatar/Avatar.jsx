import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ className, image, height, width }) => {
  return (
    <img
      className={`${styles.avatar} ${className}`}
      style={{ height, width }}
      src={`/assets/images/${image}.png`}
      alt="avatar"
    />
  );
};

export default Avatar;
