import React, { useEffect, useState } from "react";
import styles from "./RightBar.module.css";
import Input from "../Shared/Input/Input";
import UserService from "../../store/services/User";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../store/reducers/chatSlice";
import UserHeader from "../Shared/UserHeader/UserHeader";
import { Link, useNavigate } from "react-router-dom";
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
import { db } from "../../firebase";

const RightChatBar = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.userReducer.user);
  const [chatrooms, setChatrooms] = useState([]);
  const [pChatrooms, setPChatrooms] = useState([]);
  console.log(chatrooms);
  useEffect(() => {
    async function fetch() {
      const chatRef = collection(db, "chatrooms");
      const q = query(chatRef, where("users", "array-contains", currUser.uid));
      const querySnapshot = await getDocs(q);
      const chatList = [];
      querySnapshot.forEach((doc) => {
        chatList.push({ id: doc.id, data: doc.data() });
      });
      setChatrooms(chatList);
      const pchatRef = collection(db, "pChatrooms");
      const pq = query(
        pchatRef,
        where("users", "array-contains", currUser.uid)
      );
      const pquerySnapshot = await getDocs(pq);
      const pchatList = [];
      pquerySnapshot.forEach((doc) => {
        pchatList.push({ id: doc.id, data: doc.data() });
      });
      setPChatrooms(pchatList);
    }
    fetch();
  }, []);

  return (
    <div className={`${className} ${styles.rightbarContent}`}>
      {/* <Input
        type="text"
        placeholder="Search Devs"
        className={styles.searchInput}
      /> */}
      <p>Project Groups</p>
      <div className={styles.usersList}>
        {chatrooms &&
          chatrooms.map((user) => (
            <li>
              <hr />
              <UserHeader
                username={user.data.creatorName + "'s Project"}
                designation={""}
                onClick={() => {
                  const d = {
                    id: user.id,
                    creatorName: user.data.creatorName,
                    feedId: user.data.feedId,
                  };
                  dispatch(chatActions.setOpenMsg(d));
                }}
              />
            </li>
          ))}
      </div>

      <p>Personal Chats </p>
      <div className={styles.usersList}>
        {pChatrooms &&
          pChatrooms.map((user) => (
            <li>
              <hr />
              <UserHeader
                username={
                  user.data.members[0] === currUser.username
                    ? user.data.members[1]
                    : user.data.members[0]
                }
                designation={""}
                onClick={() => {
                  const d = {
                    id: user.id,
                    creatorName:
                      user.data.members[0] === currUser.username
                        ? user.data.members[1]
                        : user.data.members[0],
                    feedId: "personal",
                  };
                  dispatch(chatActions.setOpenMsg(d));
                }}
              />
            </li>
          ))}
      </div>
    </div>
  );
};

export default RightChatBar;
