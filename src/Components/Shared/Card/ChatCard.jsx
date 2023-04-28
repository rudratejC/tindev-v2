import React from "react";
import styles from "./ChatCard.module.css";

const ChatCard = ({ children, isMy }) => {
  return (
    <div
      className={`${styles.chatCard} ${isMy ? styles.sender : styles.reciever}`}
    >
      {children}
    </div>
  );
};

export default ChatCard;
