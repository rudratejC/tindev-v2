import React from "react";
import styles from "./TxnCard.module.css";

const TxnCard = ({ children, className, isMy }) => {
  return (
    <div className={styles.chatCardContainer}>
      <div className={`${styles.chatCard} ${styles.senderCard}`}>
        {children}
      </div>
    </div>
  );
};

export default TxnCard;
