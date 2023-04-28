import React from "react";
import UserHeader from "../Shared/UserHeader/UserHeader";
import styles from "./Wallet.module.css";
import ChatCard from "../Shared/Card/ChatCard.jsx";
import { useState, useEffect } from "react";
import Input from "../Shared/Input/Input";
import { ethers } from "ethers";

import Button from "../Shared/Button/Button";
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

const Wallet = () => {
  const chats = [{ message: "Hi" }, { message: "How are you ? " }];
  const currUser = useSelector((state) => state.userReducer.user);
  const openMsg = useSelector((state) => state.chatReducer.openMsg);
  const [chatData, setChatData] = useState([]);
  const [chatText, setchatText] = useState("");
  const [balanceAmt, setbalanceAmt] = useState(0);
  const [ether, setether] = useState();
  var qss;
  var name = `${openMsg.creatorName}'s Project`;

  var heading = openMsg.feedId === "personal" ? openMsg.creatorName : name;
  if (openMsg.creatorName === "") {
    heading = "";
  }
  const startPayment = async () => {
    try {
      const addr = "0x9BC1069BF328f3aC3c76e792FFB8f58d40A1FE5E";
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer
        .sendTransaction({
          to: addr,
          value: ethers.utils.parseEther(ether),
        })
        .then((transaction) => {
          console.dir(transaction);
          addTxn();
        });
      // console.log({ ether, addr });
      // console.log("tx", tx);
    } catch (err) {
      console.log(err);
    }
  };
  async function addTxn() {
    var txnRef = doc(collection(db, "wallet", currUser.uid, "transactions"));

    await setDoc(txnRef, {
      amount: ether,
      time: serverTimestamp(),
      user: currUser.uid,
      username: currUser.username,
      type: "credit",
    });
    const noteSnapshot = await getDoc(doc(db, "wallet", currUser.uid));
    if (noteSnapshot.exists()) {
      const d = noteSnapshot.data();
      console.log(d);
      var total = Number(d.balance) + Number(ether);
      updateBlance(total);
    } else {
      await setDoc(doc(db, "wallet", currUser.uid), { balance: Number(ether) });
    }
  }
  async function updateBlance(total) {
    const noteRef = doc(db, "wallet", currUser.uid);
    await updateDoc(noteRef, {
      balance: total,
    });
  }
  useEffect(() => {
    function getData() {
      return new Promise((resolve, reject) => {
        var q = query(
          collection(db, "wallet", currUser.uid, "transactions"),
          orderBy("time", "desc")
        );
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
    bal();

    console.log(chatData);
  }, []);
  async function bal() {
    const noteSnapshot = await getDoc(doc(db, "wallet", currUser.uid));
    if (noteSnapshot.exists()) {
      const d = noteSnapshot.data();
      console.log(d);
      setbalanceAmt(d.balance);
    }
  }
  async function addChat() {
    // var chatRef = doc(collection(db, "chatrooms", openMsg.id, "chats"));
    // if (openMsg.feedId === "personal") {
    //   chatRef = doc(collection(db, "pChatrooms", openMsg.id, "chats"));
    // }
    // if (chatText !== "") {
    //   await setDoc(chatRef, {
    //     text: chatText,
    //     time: serverTimestamp(),
    //     sentBy: currUser.username,
    //     senderUid: currUser.uid,
    //   });
    // }
  }
  return (
    <>
      <div className={styles.chatRoom}>
        <div className={styles.roomContainer}>
          <div className={styles.header}>
            <UserHeader
              className={styles.userHeader}
              username={currUser.username}
              designation={currUser.email}
            />
            <h4>{`Balance: ${(Math.round(balanceAmt * 100) / 100).toFixed(
              2
            )}`}</h4>
          </div>
          <div className={styles.addWalletContainer}>
            <h3>Add Balance to Wallet</h3>
            <div className={styles.addWalletInputContainer}>
              <Input
                type="number"
                value={ether}
                placeholder="Enter Amount"
                className={styles.searchInput}
                onChange={(e) => setether(e.target.value)}
              />
              <Button
                className={styles.addMoney}
                text="Add"
                onClick={() => {
                  startPayment();
                }}
              />
            </div>
          </div>
          <div className={styles.transactionHistoryContainer}>
            <h3>Transactions</h3>
            <div className={styles.transactionHistory}>
              {chatData &&
                chatData.map((chat) => {
                  return (
                    <TxnCard className={styles.transactionCard}>
                      <p className={styles.amount}>
                        Amount: <span>{chat.data.amount}</span>
                      </p>
                      {"    "}
                      <p className={styles.amount}>
                        Type:{" "}
                        <span>{`${chat.data.type} ${
                          chat.data.type === "credit"
                            ? " through Metamask"
                            : " For Post"
                        }`}</span>
                      </p>
                    </TxnCard>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
