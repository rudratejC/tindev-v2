import React from "react";
import styles from "./Authenticate.module.css";
import { faM } from "@fortawesome/free-solid-svg-icons";
import Metamask from "../../Components/Metamask/Metamask";
import IconButton from "../../Components/Shared/IconButton/IconButton";

const Authenticate = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.buttonWrapper}>
        <IconButton selected="true" icon={faM} size="2xl" />
      </div>
      <Metamask />
    </div>
  );
};

export default Authenticate;
