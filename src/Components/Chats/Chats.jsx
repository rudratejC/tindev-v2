import React from "react";
import "../../index.css";
import Card from "../Shared/Card/Card";
import styles from "./Chats.module.css";
import ChatRoom from "../ChatRoom/ChatRoom";
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
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import UserHeader from "../Shared/UserHeader/UserHeader";
import Sidebar from "../SideBar/Sidebar";
import RightChatBar from "../RightBar/RightChatBar";
function Chats() {
  // const currUser = useSelector((state) => state.userReducer.user);
  // const [chatrooms, setChatrooms] = useState([]);
  // console.log(chatrooms);
  // useEffect(() => {
  //   async function fetch() {
  //     const chatRef = collection(db, "chatrooms");
  //     const q = query(chatRef, where("users", "array-contains", currUser.uid));
  //     const querySnapshot = await getDocs(q);
  //     const chatList = [];
  //     querySnapshot.forEach((doc) => {
  //       chatList.push({ id: doc.id, data: doc.data() });
  //     });
  //     setChatrooms(chatList);
  //   }
  //   fetch();
  // }, []);

  return (
    <>
      <Sidebar />
      <ChatRoom />
      <RightChatBar />
    </>
  );
}

export default Chats;
