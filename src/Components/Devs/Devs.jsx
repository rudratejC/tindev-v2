import React from "react";
import DevListTile from "../Shared/DevListTile/DevListTile";
import styles from "./Devs.module.css";
import ChatCard from "../Shared/Card/ChatCard.jsx";
import { useState, useEffect } from "react";
import Input from "../Shared/Input/Input";
import UserService from "../../store/services/User";

import {
  addDoc,
  setDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import { Card } from "antd";
import TxnCard from "../Shared/Card/TxnChatCard";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import { Link } from "react-router-dom";

const Devs = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await UserService.getAllUsers();
        if (users) {
          dispatch(userActions.setAllUsers({ users }));
        }
      } catch (e) {
        dispatch(userActions.setError({ error: e.message }));
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className={styles.chatRoom}>
        <div className={styles.header}>
          {/* <UserHeader username={heading} designation="" /> */}
        </div>
        <div className={styles.roomContainer}>
          <h1>Developers</h1>
          <div className={styles.usersList}>
            {users &&
              users.map((user) => (
                <li>
                  <hr />
                  <Link
                    to={`/profile/${user.uid}`}
                    className={styles.link}
                    state={{ diffUser: true }}
                  >
                    <DevListTile
                      username={user.username}
                      designation={user.designation}
                      skills={user.info}
                    />
                  </Link>
                </li>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
