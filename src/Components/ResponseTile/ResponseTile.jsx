import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import FeedService from "../../store/services/Feed";
import IconButton from "../Shared/IconButton/IconButton";
import UserHeader from "../Shared/UserHeader/UserHeader";
import ChatService from "../../store/services/Chat";
import styles from "./ResponseTile.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.js";

const ResponseTile = ({ data, feedData, feedUid }) => {
  // const [currUser, setCurrUser] = useState();
  const currUser = useSelector((state) => state.userReducer.user);
  const {
    id: feedId,
    data: { intrestedUsers },
  } = feedData;
  const chatrooms = [];
  // console.log("uid " + feedUid);
  // console.log("curr uid " + currUser.uid);
  const acceptRequestHandler = async (uid) => {
    // await ChatService.addChat({
    // chat: {
    //   feedId: feedId,
    //   users: [currUser.uid, intrestedUsers],
    // },
    // });
    try {
      const chatRef = collection(db, "chatrooms");

      const q = query(
        collection(db, "chatrooms"),
        where("feedId", "==", feedId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        chatrooms.push({ id: doc.id, data: doc.data() });
      });
      if (chatrooms.length > 0) {
        var users = chatrooms[0].data.users;
        users.push(data.uid);
        const userRef = doc(db, "chatrooms", chatrooms[0].id);
        await updateDoc(userRef, {
          users,
        });
        //for deleting from feedcard
        await FeedService.updateField({
          path: `feeds/${feedId}`,
          newData: {
            key: "intrestedUsers",
            value: intrestedUsers.filter(
              (userData) => userData.uid !== data.uid
            ),
          },
        });
      } else {
        var usersArr = [currUser.uid];
        usersArr.push(data.uid);

        await addDoc(chatRef, {
          feedId: feedId,
          creator: currUser.uid,
          creatorName: currUser.username,
          users: usersArr,
        });
        //for deleting from feedcard
        await FeedService.updateField({
          path: `feeds/${feedId}`,
          newData: {
            key: "intrestedUsers",
            value: intrestedUsers.filter(
              (userData) => userData.uid !== data.uid
            ),
          },
        });
      }
      // console.log("data : " + data.uid);

      // //intrestedUsers.filter((userData) => userData.uid === data.uid);
      // await addDoc(chatRef, {
      //   feedId: feedId,
      //   creator: currUser.uid,
      //   creatorName: currUser.username,
      //   users: intrestedUsers,
      // });
      // await FeedService.updateField({
      //   path: `feeds/${feedId}`,
      //   newData: {
      //     key: "intrestedUsers",
      //     value: intrestedUsers.filter((userData) => userData.uid !== data.uid),
      //   },
      // });
    } catch (e) {
      throw e;
    }
  };

  const rejectRequestHandler = async () => {
    await FeedService.updateField({
      path: `feeds/${feedId}`,
      newData: {
        key: "intrestedUsers",
        value: intrestedUsers.filter((userData) => userData.uid !== data.uid),
      },
    });
  };

  return (
    <>
      <div className={styles.responseTile}>
        {/* <div className={styles.responseTileInfo}>
          <div className={styles.avatar}>
            <img src="/assets/images/avatar 1.png" alt="avatar" />
          </div>
          <div className={styles.userInfo}>
            <h3>{data && data.username}</h3>
            <p>{data && data.designation}</p>
          </div>
        </div> */}
        <UserHeader
          username={data && data.username}
          designation={data && data.designation}
          className={styles.header}
        />
        {feedUid === currUser.uid ? (
          <>
            <div className={styles.responseActionContainer}>
              <IconButton
                icon={faCheck}
                size="2xl"
                onClick={acceptRequestHandler}
                className={`${styles.responseAction} ${styles.accept}`}
              />
              <IconButton
                icon={faXmark}
                size="2xl"
                onClick={rejectRequestHandler}
                className={`${styles.responseAction} ${styles.reject}`}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {/* <div className={styles.responseActionContainer}>
          <IconButton
            icon={faCheck}
            size="2xl"
            onClick={acceptRequestHandler}
            className={`${styles.responseAction} ${styles.accept}`}
          />
          <IconButton
            icon={faXmark}
            size="2xl"
            onClick={rejectRequestHandler}
            className={`${styles.responseAction} ${styles.reject}`}
          />
        </div> */}
      </div>
    </>
  );
};

export default ResponseTile;
