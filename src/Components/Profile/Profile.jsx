import { faCheck, faEdit, faMessage } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import BasicInfo from "../Forms/BasicInfo/BasicInfo";
import Skills from "../Forms/Skills/Skills";
import Education from "../Forms/Education/Education";
import Card from "../Shared/Card/Card";
import IconButton from "../Shared/IconButton/IconButton";
import styles from "./Profile.module.css";
import Input from "../Shared/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import Experience from "../Forms/Experience/Experience";
import Button from "../Shared/Button/Button";
import UserService from "../../store/services/User";
import FeedCard from "../Shared/FeedCard/FeedCard";
import Rightbar from "../RightBar/RightBar";
import TabButton from "../Shared/TabButton/TabButton";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { chatActions } from "../../store/reducers/chatSlice";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.js";

const Components = {
  Resume: "resume",
  My: "all-posts",
  Req: "requirements",
};

const Profile = () => {
  const [selected, setSelected] = useState(Components.Resume);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const currUser = useSelector((state) => state.userReducer.user);
  const [user, setNewUser] = useState(currUser);
  const feeds = useSelector((state) => state.feedsReducer.feeds);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isDiffUser = location && location.state && location.state.diffUser;
  const chatrooms = [];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const newUser = await UserService.getUser(userId);
        // dispatch(userActions.setUser({ newUser }));
        setNewUser(newUser);
      } catch (e) {
        dispatch(userActions.setError({ error: e.message }));
      }
    }

    if (isDiffUser) {
      fetchData();
    }
  }, [dispatch, userId]);

  async function handleMsg() {
    console.log(currUser.uid + " " + user.uid);
    // const a="kyGbQVKf7zMr21GwN3AKk2TYOrq2";
    // const b="7btDDhAMNOMox4yxC7wU778Usud2";
    const a = currUser.uid;
    const b = user.uid;
    var res = "";
    if (a.charCodeAt(0) > b.charCodeAt(0)) {
      res = a + "_" + b;
    } else {
      res = b + "_" + a;
    }
    const crid = res;
    try {
      const chatRef = collection(db, "pChatrooms");

      const q = query(collection(db, "pChatrooms"), where("crid", "==", crid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        chatrooms.push({ id: doc.id, data: doc.data() });
      });
      if (chatrooms.length > 0) {
        //
        console.log("Alredy exists");
      } else {
        var usersArr = [currUser.uid];
        usersArr.push(user.uid);
        // await addDoc(chatRef, {
        //   members: [currUser.username, user.username],
        //   creatorName: currUser.username,
        //   users: usersArr,
        // });
        const data = {
          members: [currUser.username, user.username],
          creatorName: currUser.username,
          users: usersArr,
          crid: crid,
        };

        await setDoc(doc(db, "pChatrooms", crid), data);
      }
    } catch (error) {
      console.log(error);
    }
    const d = {
      id: crid,
      creatorName: currUser.username,
      feedId: "personal",
    };
    dispatch(chatActions.setOpenMsg(d));
  }

  const tabs = [
    {
      text: "Resume",
      type: Components.Resume,
    },
    {
      text: "My Posts",
      type: Components.My,
    },
    {
      text: "Requirements",
      type: Components.Req,
    },
  ];

  const saveProfileHandler = async () => {
    if (
      user.username &&
      user.info.links &&
      user.info.education &&
      user.info.education.length !== 0 &&
      user.info.experience &&
      user.info.experience.length !== 0 &&
      user.info.skills &&
      user.info.skills.length !== 0
    ) {
      dispatch(userActions.setActivated(true));

      await UserService.setActivated(user, true).catch((e) =>
        dispatch(userActions.setError({ error: e.message }))
      );
    } else {
      await UserService.setActivated(user, false).catch((e) =>
        dispatch(userActions.setError({ error: e.message }))
      );
      dispatch(userActions.setActivated(false));
    }
  };

  return (
    <div className={styles.profile}>
      <Card className={styles.introCard}>
        <div className={styles.avatar}>
          <img src="/assets/images/avatar 1.png" alt="avatar" />
        </div>

        <div className={styles.intro}>
          <div>
            {edit ? (
              <Input
                className={styles.infoInput}
                value={user && user.username}
                onChange={(e) =>
                  dispatch(userActions.setUsername(e.target.value))
                }
              />
            ) : (
              <h3>{user && user.username}</h3>
            )}
          </div>
          {!isDiffUser &&
            (edit ? (
              <IconButton
                icon={faCheck}
                size="xl"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(false);
                  // saveEdits();
                }}
              />
            ) : (
              <IconButton
                icon={faEdit}
                size="xl"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(true);
                }}
              />
            ))}
        </div>
        <div className={`${styles.intro} ${styles.designation}`}>
          <div>
            {edit ? (
              <Input
                className={styles.infoInput}
                value={user && user.designation}
                onChange={(e) =>
                  dispatch(userActions.setDesignation(e.target.value))
                }
              />
            ) : (
              <h3>{user && user.designation}</h3>
            )}
          </div>

          {!isDiffUser &&
            (edit ? (
              <IconButton
                icon={faCheck}
                size="s"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(false);
                }}
              />
            ) : (
              <IconButton
                icon={faEdit}
                size="s"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(true);
                }}
              />
            ))}
        </div>
        <div className={styles.reputation}>
          <div className={styles.reputationTab}>
            <p>Posts</p>
            <p>5</p>
          </div>
          <div className={styles.reputationTab}>
            <p>Rating</p>
            <p>2</p>
          </div>
          {isDiffUser && (
            <div
              className={styles.reputationTab}
              onClick={() => {
                //console.log("hello");

                handleMsg();
                navigate("/chats");
              }}
            >
              <p>
                <FontAwesomeIcon icon={faMessage} />
              </p>
              <p>Message</p>
            </div>
          )}
        </div>
      </Card>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <TabButton
            content={tab.text}
            selected={selected === tab.type}
            onClickHandler={() => {
              setSelected(tab.type);
            }}
          />
        ))}
      </div>
      {selected === Components.Resume && (
        <>
          <BasicInfo user={user} />
          <Education user={user} />
          <Experience />
          <Skills />
          {!isDiffUser && (
            <Button
              text="Save Profile"
              style={{ marginBottom: "30px" }}
              onClick={saveProfileHandler}
            />
          )}
        </>
      )}
      {selected === Components.My && (
        <div className={styles.page2}>
          <div className={styles.posts}>
            {feeds
              .filter((feed) => feed.data.uid === user.uid)
              .map((feedData) => (
                <>
                  <FeedCard feedData={feedData} />
                  <hr />
                </>
              ))}
          </div>
          <Rightbar className={styles.profileRight} />
        </div>
      )}
      {selected === Components.Req && (
        <div className={styles.page2}>
          <div className={styles.posts}>
            {feeds
              .filter((feed) => feed.data.isRequirement === true)
              .map((feedData) => (
                <>
                  <FeedCard feedData={feedData} />
                  <hr />
                </>
              ))}
          </div>
          <Rightbar className={styles.profileRight} />
        </div>
      )}
    </div>
  );
};

export default Profile;
