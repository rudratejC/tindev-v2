import React from "react";
import styles from "./TxnCard.module.css";

const TxnCard = ({ children, className }) => {
  return (
    <div className={`${styles.chatCardContainer} `}>
      <div className={`${styles.chatCard} ${styles.senderCard} ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default TxnCard;
