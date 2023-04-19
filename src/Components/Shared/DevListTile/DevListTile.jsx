import React from "react";
import styles from "./DevListTile.module.css";

const DevListTile = ({ username, designation, className, onClick, info }) => {
  return (
    <div className={`${styles.header} ${className}`} onClick={onClick}>
      <div className={styles.avatar}>
        <img src="/assets/images/avatar 1.png" alt="avatar" />
      </div>
      <div className={styles.userInfo}>
        <h3>{username}</h3>
        <p>{designation}</p>
        {info && info.skills.map((skill) => <p>{skill}</p>)}
      </div>
    </div>
  );
};

export default DevListTile;
