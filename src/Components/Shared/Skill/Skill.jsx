import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Skill.module.css";

const Skill = ({ title, onCancel, disable }) => {
  return (
    <div className={styles.skill}>
      <p>{title}</p>
      {!disable && (
        <span onClick={onCancel}>
          <FontAwesomeIcon icon={faXmark} size="xs" />
        </span>
      )}
    </div>
  );
};

export default Skill;
