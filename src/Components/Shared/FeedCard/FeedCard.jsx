import {
  faEnvelope,
  faPaperPlane,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Skill from "../Skill/Skill";
import TabButton from "../TabButton/TabButton";
import styles from "./FeedCard.module.css";
import FeedService from "../../../store/services/Feed";
import ResponseTile from "../../ResponseTile/ResponseTile";
import UserHeader from "../UserHeader/UserHeader";

const FeedCard = ({ feedData }) => {
  const {
    data,
    id: feedId,
    data: { isRequirement, intrestedUsers, isImg, imgUrl },
  } = feedData;
  const user = useSelector((state) => state.userReducer.user);
  const [intrested, setIntrested] = useState(false);
  const [feedUid, setfeedUid] = useState("");
  useEffect(() => {
    // console.log("new uid " + data.user.uid);
    setfeedUid(data.user.uid);
    if (isRequirement) {
      const currentUserExists =
        intrestedUsers &&
        intrestedUsers.findIndex((intUser) => intUser.uid === user.uid);
      if (currentUserExists >= 0) setIntrested(true);
    }
  }, []);

  const intrestedHandler = async () => {
    if (!intrested) {
      //add user to intrested list
      await FeedService.updateField({
        path: `feeds/${feedId}`,
        newData: {
          key: "intrestedUsers",
          value: [
            {
              uid: user.uid,
              username: user.username,
              designation: user.designation,
            },
            ...intrestedUsers,
          ],
        },
      });
      setIntrested(true);
    } else {
      //remove user from intrested list
      await FeedService.updateField({
        path: `feeds/${feedId}`,
        newData: {
          key: "intrestedUsers",
          value: intrestedUsers.filter((user) => user.uid !== user.uid),
        },
      });
      setIntrested(false);
    }
  };

  const likeHandler = async () => {
    await FeedService.updateField({
      path: `feeds/${feedId}`,
      newData: {
        key: "likes",
        value: data.likes + 1,
      },
    });
  };
  const dislikeHandler = async () => {
    await FeedService.updateField({
      path: `feeds/${feedId}`,
      newData: {
        key: "dislikes",
        value: data.dislikes + 1,
      },
    });
  };

  return (
    <Card className={styles.feed}>
      {/* <div className={styles.header}>
        <div className={styles.avatar}>
          <img src="/assets/images/avatar 1.png" alt="avatar" />
        </div>
        <div className={styles.userInfo}>
          <h3>{data && data.user && data.user.username}</h3>
          <p>{data && data.user && data.user.designation}</p>
        </div>
      </div> */}
      <UserHeader
        username={data && data.user && data.user.username}
        designation={data && data.user && data.user.designation}
      />
      <hr />
      <div className={styles.content}>
        <p>{data && data.content}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.imgFeed}>
          {isImg && <img src={imgUrl} alt={imgUrl} width="300"></img>}
        </div>
      </div>
      <div className={styles.skillsContainer}>
        {data &&
          data.skills &&
          data.skills.map((skill) => <Skill title={skill} disable={true} />)}
      </div>
      <div className={styles.actions}>
        <div className={styles.actionIcon}>
          <FontAwesomeIcon icon={faThumbsUp} size="xl" onClick={likeHandler} />
          <span>{data && data.likes}</span>
        </div>
        <div className={styles.actionIcon}>
          <FontAwesomeIcon
            icon={faThumbsDown}
            size="xl"
            onClick={dislikeHandler}
          />
          <span>{data && data.dislikes}</span>
        </div>
        {isRequirement && (
          <>
            <div className={styles.actionIcon}>
              <FontAwesomeIcon icon={faEnvelope} size="xl" />
              {user.uid === data.user.uid && intrestedUsers.length > 0 && (
                <span className={styles.notification}>
                  {intrestedUsers.length}
                </span>
              )}
            </div>
            {user.uid !== data.user.uid && (
              <TabButton
                content={!intrested ? "Intrested" : "Withdraw"}
                onClickHandler={() => {
                  intrestedHandler();
                }}
                selected={intrested}
                className={styles.intrested}
              />
            )}
          </>
        )}
      </div>
      <div className={styles.comment}>
        <Input placeholder="Comments" type="text" />
        <IconButton icon={faPaperPlane} size="xl" className={styles.send} />
      </div>
      {intrestedUsers.length > 0 && (
        <div className={styles.responseTileContainer}>
          {intrestedUsers
            .filter((userData) => userData.uid !== user.uid)
            .map((userData) => (
              <>
                <hr />
                <ResponseTile
                  data={userData}
                  feedData={feedData}
                  feedUid={feedUid}
                />
              </>
            ))}
        </div>
      )}
    </Card>
  );
};

export default FeedCard;
