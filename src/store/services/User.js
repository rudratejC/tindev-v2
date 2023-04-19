import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

class UserService {
  async saveUser(user) {
    try {
      const newUser = {
        uid: user.uid,
        email: user.email,
        username: "",
        pfp: "",
        activated: false,
        info: {
          links: {
            Contact: "",
            Email: "",
            GitHub: "",
            LinkedIn: "",
            Hackerrank: "",
            Other: "",
          },
          education: "",
          experience: "",
          skills: "",
        },
      };
      await setDoc(doc(db, "users", user.uid), newUser);
    } catch (e) {
      throw e;
    }
  }

  async getUser(id) {
    try {
      const q = query(collection(db, "users"), where("uid", "==", id));
      const querySnapshot = await getDocs(q);
      let data = null;
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          data = doc.data();
        });
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers() {
    try {
      const q = query(collection(db, "users"), limit(10));
      const querySnapshot = await getDocs(q);
      let data = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          data.push({
            username: doc.data().username,
            designation: doc.data().designation,
            uid: doc.data().uid,
          });
        });
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async saveUserData(user) {
    try {
      await setDoc(doc(db, "users", user.uid), user);
    } catch (e) {
      throw e;
    }
  }
  async setActivated(user, activated) {
    try {
      await setDoc(doc(db, "users", user.uid), { ...user, activated });
    } catch (e) {
      throw e;
    }
  }
}

export default new UserService();
