import {
  faLightbulb,
  faTerminal,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../Shared/Button/Button";
import Card from "../../Shared/Card/Card";
import Input from "../../Shared/Input/Input";
import Skill from "../../Shared/Skill/Skill";
import styles from "./Skills.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../../store/services/User";
import { userActions } from "../../../store/reducers/userSlice";
import { useLocation } from "react-router-dom";

const Skills = () => {
  const [currSkill, setcurrSkill] = useState("");
  let user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const skillsInfo = user && user.info.skills ? user.info.skills : [];

  const isDiffUser = location && location.state && location.state.diffUser;

  const saveEdits = async () => {
    await UserService.saveUserData(user).catch((e) =>
      dispatch(userActions.setError({ error: e.message }))
    );
  };

  return (
    <Card className={styles.BasicInfoCard}>
      <div className={styles.heading}>
        <FontAwesomeIcon icon={faTerminal} size="2xl" />
        <h3>{!isDiffUser ? "Add your skills." : "Skills"}</h3>
      </div>
      {!isDiffUser && (
        <div className={styles.flexBox}>
          <Input
            type="text"
            value={currSkill}
            placeholder="Add your skills here."
            onChange={(e) => setcurrSkill(e.target.value)}
          />
          <Button
            text="Add"
            onClick={() => {
              if (currSkill.length === 0) return;
              dispatch(userActions.setSkillsInfo(currSkill));
              setcurrSkill("");
            }}
          />
          <Button
            className={styles.nextButton}
            text="Save"
            onClick={() => {
              saveEdits("start");
            }}
          />
        </div>
      )}
      <div className={styles.skillsContainer}>
        {skillsInfo &&
          skillsInfo.map((skill) => (
            <Skill
              disable={isDiffUser}
              title={skill}
              onCancel={() => {
                dispatch(userActions.deleteSkill(skill));
                saveEdits();
              }}
            />
          ))}
      </div>
    </Card>
  );
};

export default Skills;
