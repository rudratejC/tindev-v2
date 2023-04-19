import React from "react";
import styles from "./ChatCard.module.css";

const ChatCard = ({ children, className, isMy }) => {
  return isMy ? (
    <div className={styles.chatCardContainer}>
      <div className={`${styles.chatCard} ${styles.senderCard}`}>
        {children}
      </div>
    </div>
  ) : (
    <div className={styles.chatCardContainer}>
      <div className={`${styles.chatCard} ${styles.recieverCard}`}>
        {children}
      </div>
    </div>
  );
};

export default ChatCard;
