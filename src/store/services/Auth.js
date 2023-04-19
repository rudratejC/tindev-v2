import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import UserService from "./User";

class AuthService {
  async signIn(data) {
    try {
      const { email, password } = data;
      if (!email && !password) return;
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) {
        const user = await UserService.getUser(response.user.uid);
        if (user) return user;
      }
    } catch (e) {
      console.log(e);
    }
  }

  //   try {
  //     const response = await setDoc(doc(db, "users", user.uid), user);
  //     return response;
  //   } catch (e) {
  //     throw e;
  //   }

  async signUp(data) {
    try {
      const { email, password, name } = data;
      if (!email && !password && !name) return;
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        await UserService.saveUser(response.user);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async signOut() {
    try {
      const response = await signOut(auth);
      if (response) {
        console.log(response + "Signed Out");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new AuthService();
