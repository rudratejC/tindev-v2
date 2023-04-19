import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

class FeedService {
  getAllFeeds(callback) {
    return new Promise((resolve, reject) => {
      const feedsRef = collection(db, "feeds");
      onSnapshot(
        feedsRef,
        (snapshot) => {
          const feeds = [];
          if (snapshot) {
            snapshot.forEach((doc) => {
              feeds.push({ id: doc.id, data: doc.data() });
            });
          }
          resolve();
          callback(feeds, null);
        },
        (e) => {
          reject();
          callback(null, e);
        }
      );
    });
  }
  async addFeed(feed) {
    try {
      const feedRef = collection(db, "feeds");
      await addDoc(feedRef, feed);
    } catch (e) {
      throw e;
    }
  }

  async updateField(data) {
    try {
      const { path, newData } = data;
      const docRef = doc(db, `${path}`);
      const dataObj = {
        [newData.key]: newData.value,
      };
      await updateDoc(docRef, dataObj);
    } catch (e) {
      throw e;
    }
  }
}

export default new FeedService();
