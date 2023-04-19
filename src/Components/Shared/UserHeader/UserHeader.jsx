import React from "react";
import styles from "./UserHeader.module.css";

const UserHeader = ({ username, designation, className, onClick }) => {
  return (
    <div className={`${styles.header} ${className}`} onClick={onClick}>
      <div className={styles.avatar}>
        <img src="/assets/images/avatar 1.png" alt="avatar" />
      </div>
      <div className={styles.userInfo}>
        <h3>{username}</h3>
        <p>{designation}</p>
      </div>
    </div>
  );
};

export default UserHeader;
