import Card from "../Shared/Card/Card";
import FeedCard from "../Shared/FeedCard/FeedCard";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import styles from "./Feeds.module.css";
import AddPost from "../AddPost/AddPost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FeedService from "../../store/services/Feed";
import { feedsActions } from "../../store/reducers/feedSlice";

const FeedType = {
  All: "All Posts",
  My: "My Posts",
  Req: "Requirements",
  Paid: "Urgent",
};

const Feeds = () => {
  const tabs = [
    { type: FeedType.All, text: "All Posts" },
    { type: FeedType.Paid, text: "Urgent" },
    { type: FeedType.Req, text: "Requirements" },
  ];

  const navigate = useNavigate();
  const [isAddPost, setIsAddPost] = useState(false);
  const activated = useSelector((state) => state.userReducer.user.activated);
  const [selected, setSelected] = useState(tabs[0].type);
  const { feeds, isLoading, error } = useSelector(
    (state) => state.feedsReducer
  );
  const [currFeeds, setCurrFeeds] = useState([]);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(feedsActions.setLoading(true));
    await FeedService.getAllFeeds((feedList, error) => {
      if (error) {
        dispatch(feedsActions.setError({ error: error.message }));
      } else {
        dispatch(feedsActions.setFeeds({ feeds: feedList }));
        setCurrFeeds(feedList);
      }
      dispatch(feedsActions.setLoading(false));
    });
  }, []);
  console.log(currFeeds);

  function changeToPost() {
    if (!activated) {
      return;
    }
    setIsAddPost(true);
  }

  const filterFeeds = (feedType) => {
    if (feedType === FeedType.All) {
      setCurrFeeds(feeds);
    } else if (feedType === FeedType.My) {
      setCurrFeeds(feeds.filter((feed) => feed.data.uid === user.uid));
    } else if (feedType === FeedType.Paid) {
      setCurrFeeds(feeds.filter((feed) => feed.data.isPaid === true));
    } else {
      setCurrFeeds(feeds.filter((feed) => feed.data.isRequirement === true));
    }
  };

  return (
    <div className={styles.feeds}>
      <Card className={styles.createPost}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="/assets/images/avatar 1.png" alt="avatar" />
          </div>
          <Input
            type="text"
            placeholder="What's on your mind?"
            onClick={changeToPost}
            disabled={!activated}
          />
        </div>
      </Card>
      {!activated && (
        <div className={styles.warning}>
          <Button text="Update" onClick={() => navigate("/profile")} />
          <span>
            Kindly complete your profile to access all the features of the
            portal.
          </span>
        </div>
      )}
      {isAddPost && <AddPost onCancel={() => setIsAddPost(false)} />}
      <hr />
      {isLoading && <p>Loading....</p>}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            className={`${styles.tab}  ${
              selected === tab.type && styles.selected
            }`}
            onClick={() => {
              setSelected(tab.type);
              filterFeeds(tab.type);
            }}
          >
            {tab.text}
          </div>
        ))}
      </div>
      {currFeeds &&
        currFeeds.map((feedData) => (
          <>
            <FeedCard feedData={feedData} />
            <hr />
          </>
        ))}
      {error && <p>${error}</p>}
    </div>
  );
};

export default Feeds;
