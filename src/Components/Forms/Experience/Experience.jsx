import React from "react";
import Card from "../../Shared/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faLink,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../Shared/Input/Input";
import Button from "../../Shared/Button/Button";
import styles from "./Experience.module.css";
import { useState, useEffect } from "react";
import IconButton from "../../Shared/IconButton/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/reducers/userSlice";
import UserService from "../../../store/services/User";
import { useLocation } from "react-router-dom";

const Experience = () => {
  const [changeInExperience, setChangeInExperience] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const isDiffUser = location && location.state && location.state.diffUser;

  const experienceList = user ? user.info.experience : [];

  const onEditdone = (expInfo, key) => {
    dispatch(userActions.editExperience({ expInfo, key }));
  };

  const saveEdits = async () => {
    await UserService.saveUserData(user).catch((e) =>
      dispatch(userActions.setError({ error: e.message }))
    );
  };

  return (
    <Card className={styles.education}>
      <div className={styles.heading}>
        <div>
          <FontAwesomeIcon icon={faLink} size="2xl" />
          <h3>
            {!isDiffUser
              ? "Add your Experince / Personal projects"
              : "Experince / Personal projects"}
          </h3>
        </div>
        {!isDiffUser && (
          <Button
            text="Add"
            style={{ margin: "0" }}
            onClick={() => {
              dispatch(userActions.addNewExperience());
            }}
          />
        )}
      </div>
      {!experienceList ? (
        <p>Add Your Education</p>
      ) : (
        experienceList.map((experience) => {
          return (
            <>
              <ExperienceCard
                key={experience.key}
                data={experience}
                change={changeInExperience}
                saveEdits={saveEdits}
                setChange={(value) => setChangeInExperience(value)}
                onEditDone={onEditdone}
                isDiffUser={isDiffUser}
              />
              <hr />
            </>
          );
        })
      )}
      {!isDiffUser && changeInExperience && (
        <Button
          className={styles.nextButton}
          text="Save"
          onClick={() => {
            saveEdits();
            setChangeInExperience(false);
          }}
          style={{ margin: "0", marginTop: "20px" }}
        />
      )}
    </Card>
  );
};

export default Experience;

const ExperienceCard = ({
  change,
  setChange,
  onEditDone,
  data: { name, description, key, startDate, endDate },
  saveEdits,
  isDiffUser,
}) => {
  const [edit, setEdit] = useState(false);
  const [expName, setExpName] = useState(name);
  const [desc, setDesc] = useState(description);
  const [start, setStartDate] = useState(startDate);
  const [end, setEndDate] = useState(endDate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      setExpName(name);
    }
    if (description) {
      setDesc(description);
    }
    if (startDate) {
      setStartDate(startDate);
    }
    if (endDate) {
      setEndDate(endDate);
    }
  }, [name, description, startDate, endDate]);

  useEffect(() => {
    if (
      setChange &&
      (expName !== name ||
        desc !== description ||
        start !== startDate ||
        end !== endDate) &&
      !change
    ) {
      setChange(true);
    }
  }, [expName, desc, start, end]);

  return (
    <div className={styles.educationCard}>
      <img
        className={styles.educationAvatar}
        src="/assets/images/education.png"
        alt="education"
      />
      {!isDiffUser && edit ? (
        <div>
          <Input
            type="text"
            placeholder="Company/Project Name"
            className={styles.editInput}
            value={expName}
            onChange={(e) => setExpName(e.target.value)}
          />
          <Input
            type="text"
            value={desc}
            placeholder="Description"
            className={styles.editInput}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Input
            type="date"
            value={start}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start date"
            className={styles.editInput}
          />
          <Input
            type="date"
            value={end}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End date"
            className={styles.editInput}
          />
        </div>
      ) : (
        <div>
          <h4 className={styles.instituteName}>
            {expName ? expName : "Company/Project Name"}
          </h4>
          <p className={styles.designation}>{desc ? desc : "Description"}</p>
          <p className={styles.duration}>
            {start ? `start: ${start}` : "Start date"}
          </p>
          <p className={styles.duration}>{end ? `end: ${end}` : "End date"}</p>
        </div>
      )}

      <div className={styles.controlButtons}>
        {!isDiffUser &&
          (edit ? (
            <IconButton
              icon={faCheck}
              size="xl"
              className={styles.iconButton}
              onClick={() => {
                const expInfo = {
                  name: expName,
                  description: desc,
                  startDate: start,
                  endDate: end,
                };
                onEditDone(expInfo, key);
                setEdit(false);
              }}
            />
          ) : (
            <IconButton
              icon={faEdit}
              size="xl"
              className={styles.iconButton}
              onClick={() => setEdit(true)}
            />
          ))}
        {!isDiffUser && (
          <IconButton
            icon={faTrash}
            size="xl"
            className={styles.iconButton}
            onClick={() => {
              dispatch(userActions.deleteExperience({ key }));
              saveEdits();
            }}
          />
        )}
      </div>
    </div>
  );
};
