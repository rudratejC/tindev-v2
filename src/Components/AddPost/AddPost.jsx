import React from "react";
import ReactDOM from "react-dom";
import styles from "./AddPost.module.css";
import Backdrop from "../Shared/Backdrop/Backdrop";
import Card from "../Shared/Card/Card";
import { useState, useEffect } from "react";
import Input from "../Shared/Input/Input";
import Skill from "../Shared/Skill/Skill";
import {
  faAdd,
  faFilm,
  faPanorama,
  faPenNib,
  faDollarSign,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import FeedService from "../../store/services/Feed";
import { feedsActions } from "../../store/reducers/feedSlice";
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
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const AddPost = ({ onCancel }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { error } = useSelector((state) => state.feedsReducer);
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [content, setContent] = useState();
  const [addSkill, setAddSkill] = useState(false);
  const [skillSet, setSkillSet] = useState([]);
  const [selected, setSelected] = useState(false);
  const [paid, setPaid] = useState(false);
  const [balanceAmt, setbalanceAmt] = useState(0);
  const [isImg, setisImg] = useState(false);
  const [progress, setprogress] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  useEffect(async () => {
    const noteSnapshot = await getDoc(doc(db, "wallet", user.uid));
    if (noteSnapshot.exists()) {
      const d = noteSnapshot.data();
      console.log(d);
      setbalanceAmt(d.balance);
    }
  }, []);

  async function updateBlance(total) {
    const noteRef = doc(db, "wallet", user.uid);
    await updateDoc(noteRef, {
      balance: total,
    });
  }
  async function addTxn() {
    var txnRef = doc(collection(db, "wallet", user.uid, "transactions"));

    await setDoc(txnRef, {
      amount: 1,
      time: serverTimestamp(),
      user: user.uid,
      username: user.username,
      type: "debit",
    });
  }
  const handleImgUpload = (f) => {
    const file = f;
    if (!file) return;
    var rightNow = new Date();
    var res = rightNow.toISOString().replace(/-/g, "");
    const storageRef = ref(storage, `files/${res + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setisImg(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimgUrl(downloadURL);
        });
      }
    );
  };

  async function saveProject() {
    if (!content) return;
    if (paid) {
      const bal = Number(balanceAmt);
      if (bal < 1) {
        alert(
          "You don't have enough balance to make this post, Please add the balance through wallet."
        );
        await onCancel();
        return;
      } else {
        const newBal = bal - 1;
        updateBlance(newBal);
        addTxn();
      }
    }
    const newFeed = {
      content: content,
      Pfp: user.pfp,
      user: {
        uid: user.uid,
        designation: user.designation,
        username: user.username,
      },
      skills: skillSet,
      isRequirement: selected,
      isPaid: paid,
      isImg: isImg,
      imgUrl: imgUrl,
      intrestedUsers: [],
      likes: 0,
      dislikes: 0,
      time: serverTimestamp(),
    };
    try {
      await FeedService.addFeed(newFeed);
    } catch (e) {
      dispatch(feedsActions.setError({ error: e.message }));
    }
    await onCancel();
  }

  const componentContent = (
    <Card className={styles.addPost}>
      {error ? (
        <p>error</p>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <img src="/assets/images/avatar 1.png" alt="avatar" />
            </div>
            <h3>{user.username}</h3>
          </div>
          <textarea
            placeholder="Post your feed..."
            className={styles.textArea}
            name="writepost"
            cols="30"
            rows="5"
            onChange={(e) => setContent(e.target.value)}
          />
          {addSkill && (
            <div className={styles.addSkillContainer}>
              <Input
                placeholder="Enter skills"
                className=""
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <Button
                icon={faAdd}
                onClick={() => {
                  if (skill.length === 0) return;
                  setSkillSet((prevSkills) => {
                    return [...prevSkills, skill];
                  });
                  setSkill("");
                }}
              />
              <Button icon={faX} onClick={() => setAddSkill(false)} />
            </div>
          )}
          {skillSet.length !== 0 && (
            <div className={styles.skillsContainer}>
              {skillSet.map((skill) => (
                <Skill
                  title={skill}
                  onCancel={() => {
                    const newSkillSets = skillSet.filter(
                      (delSkill) => skill != delSkill
                    );
                    setSkillSet(newSkillSets);
                  }}
                />
              ))}
            </div>
          )}
          <div className={styles.actions}>
            <div className={styles.imgUpload}>
              <label for="file-input">
                <FontAwesomeIcon icon={faPanorama} size="xl" />
              </label>
              <span>
                <input
                  id="file-input"
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  onChange={async (e) => {
                    // setimg(e.target.files[0]);
                    console.log(e.target.files[0]);
                    handleImgUpload(e.target.files[0]);
                  }}
                />
              </span>
            </div>
            <div className={styles.iconsContainer}>
              {/* <div className={styles.actionIcon}>
                <FontAwesomeIcon icon={faPanorama} size="xl" />
              </div> */}

              {/* <div className={styles.actionIcon}>
                <FontAwesomeIcon icon={faFilm} size="xl" />
              </div> */}
              <div
                className={`${styles.actionIcon} ${styles.reqAction} ${
                  selected && styles.reqSelected
                } `}
                onClick={() => setSelected((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={faPenNib} size="xl" />
              </div>
              <div
                className={`${styles.actionIcon} ${styles.reqAction} ${
                  paid && styles.reqSelected
                } `}
                onClick={() => setPaid((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={faDollarSign} size="xl" />
              </div>
            </div>
            {!addSkill && (
              <Button text="Add Skill" onClick={() => setAddSkill(true)} />
            )}
          </div>
          <div className={styles.controlButtons}>
            <Button text="Post" onClick={saveProject} />
            <Button text="Cancel" icon={faX} onClick={onCancel} />
          </div>
        </>
      )}
    </Card>
  );

  return (
    <>
      {ReactDOM.createPortal(
        componentContent,
        document.getElementById("modal-root")
      )}
      {ReactDOM.createPortal(
        <Backdrop onCancel={() => {}} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default AddPost;
