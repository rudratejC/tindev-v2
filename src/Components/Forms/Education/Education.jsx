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
import styles from "./Education.module.css";
import { useState, useEffect } from "react";
import UserService from "../../../store/services/User";
import IconButton from "../../Shared/IconButton/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../store/reducers/userSlice";
import { useLocation, useParams } from "react-router-dom";

const Education = ({ user }) => {
  const [changeInEducation, setChangeInEducation] = useState(false);
  // const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const isDiffUser = location && location.state && location.state.diffUser;
  const dispatch = useDispatch();

  const educationList = user ? user.info.education : [];

  const onEditdone = (eduInfo, key) => {
    dispatch(userActions.editEducation({ eduInfo, key }));
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
          {!isDiffUser ? <h3>Add your Education</h3> : <h3>Education</h3>}
        </div>
        {!isDiffUser && (
          <Button
            text="Add"
            style={{ margin: "0" }}
            onClick={() => {
              dispatch(userActions.addNewEducation());
            }}
          />
        )}
      </div>
      {!educationList ? (
        <p>Add Your Education</p>
      ) : (
        educationList.map((education) => {
          return (
            <>
              <EducationCard
                key={education.key}
                data={education}
                change={changeInEducation}
                saveEdits={saveEdits}
                setChange={(value) => setChangeInEducation(value)}
                onEditDone={onEditdone}
                isDiffUser={isDiffUser}
              />
              <hr />
            </>
          );
        })
      )}
      {!isDiffUser && changeInEducation && (
        <Button
          className={styles.nextButton}
          text="Save"
          onClick={() => {
            saveEdits();
            setChangeInEducation(false);
          }}
          style={{ margin: "0", marginTop: "20px" }}
        />
      )}
    </Card>
  );
};

export default Education;

const EducationCard = ({
  change,
  setChange,
  onEditDone,
  data: { instituteName, designation, grade: grades, key, startDate, endDate },
  saveEdits,
  isDiffUser,
}) => {
  const [edit, setEdit] = useState(false);
  const [institute, setInstitute] = useState(instituteName);
  const [desig, setDesig] = useState(designation);
  const [start, setStartDate] = useState(startDate);
  const [end, setEndDate] = useState(endDate);
  const [grade, setGrade] = useState(grades);

  const dispatch = useDispatch();

  useEffect(() => {
    if (instituteName) {
      setInstitute(instituteName);
    }
    if (designation) {
      setDesig(designation);
    }
    if (startDate) {
      setStartDate(startDate);
    }
    if (endDate) {
      setEndDate(endDate);
    }
    if (grades) {
      setGrade(grades);
    }
  }, [instituteName, designation, startDate, endDate, grades]);

  useEffect(() => {
    if (
      setChange &&
      (institute !== instituteName ||
        desig !== designation ||
        start !== startDate ||
        end !== endDate ||
        grade !== grades) &&
      !change
    ) {
      setChange(true);
    }
  }, [institute, desig, start, end, grade]);

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
            placeholder="Institute Name"
            className={styles.editInput}
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
          />
          <Input
            type="text"
            value={desig}
            placeholder="Degree and branch"
            className={styles.editInput}
            onChange={(e) => setDesig(e.target.value)}
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
          <Input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grades"
            className={styles.editInput}
          />
        </div>
      ) : (
        <div>
          <h4 className={styles.instituteName}>
            {institute ? institute : "Institute Name"}
          </h4>
          <p className={styles.designation}>
            {desig ? desig : "Degree, Branch"}
          </p>
          <p className={styles.duration}>
            {start ? `start: ${start}` : "Start date"}
          </p>
          <p className={styles.duration}>{end ? `end: ${end}` : "End date"}</p>
          <p className={styles.grades}>{grade ? `Grades: ${grade}` : ""}</p>
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
                const eduInfo = {
                  instituteName: institute,
                  designation: desig,
                  startDate: start,
                  endDate: end,
                  grade: grade,
                };
                onEditDone(eduInfo, key);
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
              dispatch(userActions.deleteEducation({ key }));
              saveEdits();
            }}
          />
        )}
      </div>
    </div>
  );
};
