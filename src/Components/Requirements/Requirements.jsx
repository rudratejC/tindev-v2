import React from "react";
import styles from "./Requirements.module.css";

const Requirements = () => {
  return (
    <div className={styles.page2}>
      <div className={styles.posts}>
        {feeds
          .filter((feed) => feed.data.isRequirement === true)
          .map((feedData) => (
            <>
              <FeedCard data={feedData.data} />
              <hr />
            </>
          ))}
      </div>
      <Rightbar className={styles.profileRight} />
    </div>
  );
};

export default Requirements;
