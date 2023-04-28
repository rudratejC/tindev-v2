import React from "react";
import UserHeader from "../Shared/UserHeader/UserHeader";
import styles from "./ChatRoom.module.css";
import ChatCard from "../Shared/Card/ChatCard.jsx";
import { useState, useEffect } from "react";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { create } from "ipfs-http-client";
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
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { async } from "@firebase/util";

const ChatRoom = () => {
  const chats = [{ message: "Hi" }, { message: "How are you ? " }];
  const currUser = useSelector((state) => state.userReducer.user);
  const openMsg = useSelector((state) => state.chatReducer.openMsg);
  const [chatData, setChatData] = useState([]);
  const [chatText, setchatText] = useState("");
  const [img, setimg] = useState(null);
  var qss;
  var name = `${openMsg.creatorName}'s Project`;

  var heading = openMsg.feedId === "personal" ? openMsg.creatorName : name;
  if (openMsg.creatorName === "") {
    heading = "";
  }

  useEffect(() => {
    function getData() {
      return new Promise((resolve, reject) => {
        const feedsRef = collection(db, "feeds");
        var q = query(
          collection(db, "chatrooms", openMsg.id, "chats"),
          orderBy("time", "asc")
        );
        if (openMsg.feedId === "personal") {
          const q1 = query(
            collection(db, "pChatrooms", openMsg.id, "chats"),
            orderBy("time", "asc")
          );
          q = q1;
        }

        onSnapshot(
          q,
          (snapshot) => {
            const chatList = [];
            if (snapshot) {
              snapshot.forEach((doc) => {
                chatList.push({ id: doc.id, data: doc.data() });
              });
            }
            setChatData(chatList);
            resolve();
          },
          (e) => {
            reject();
          }
        );
      });
    }
    getData();
    console.log(chatData);
  }, [openMsg]);

  async function addChat() {
    var chatRef = doc(collection(db, "chatrooms", openMsg.id, "chats"));
    if (openMsg.feedId === "personal") {
      chatRef = doc(collection(db, "pChatrooms", openMsg.id, "chats"));
    }
    if (chatText !== "") {
      await setDoc(chatRef, {
        text: chatText,
        time: serverTimestamp(),
        sentBy: currUser.username,
        senderUid: currUser.uid,
      });
    }
  }
  return (
    <>
      <div className={styles.chatRoom}>
        <div className={styles.header}>
          <UserHeader username={heading} designation="" />
        </div>
        {/* <div className={styles.roomContainer}>
        {chats.map((chat) => {
          return <Card>{chat.message}</Card>;
        })}
      </div> */}
        <div className={styles.roomContainer}>
          {chatData.map((chat) => {
            return (
              <div
                className={`${styles.chatCardContainer} ${
                  currUser.username === chat.data.sentBy
                    ? styles.senderMsg
                    : styles.recieverMsg
                }`}
              >
                <ChatCard isMy={currUser.username === chat.data.sentBy}>
                  {chat.data.sentBy + ":  " + chat.data.text}
                </ChatCard>
              </div>
            );
          })}
        </div>
        <div className={styles.inputContainer}>
          <Input
            type="text"
            value={chatText}
            placeholder="Enter Message"
            className={styles.searchInput}
            onChange={(e) => setchatText(e.target.value)}
          />

          {/* <div className={styles.imgUpload}>
            <label for="file-input">
              <FontAwesomeIcon icon={faImage} size="xl" />
            </label>
            <span>
              <input
                id="file-input"
                accept="image/x-png,image/gif,image/jpeg"
                type="file"
                onChange={async (e) => {
                  setimg(e.target.files[0]);
                  console.log(e.target.files[0]);
                  const file = e.target.files[0];
                  const add = await client.add(file);
                  const url = `https://ipfs.infura.io/ipfs/${add.path}`;
                  console.log(url);
                }}
              />
            </span>
          </div> */}

          <Button
            text="Send"
            onClick={() => {
              addChat();
              setchatText("");
            }}
            className={styles.sendButton}
          />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
