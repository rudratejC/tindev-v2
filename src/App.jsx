import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Sidebar from "./Components/SideBar/Sidebar.jsx";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Authenticate from "./pages/Register/Authenticate";
import "./App.css";
import Public from "./Routes/Public";
import Feeds from "./Components/Feeds/Feeds";
import Rightbar from "./Components/RightBar/RightBar.jsx";
import Protected from "./Routes/Protected";
import { useMoralis } from "react-moralis";
import UserService from "./store/services/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/reducers/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthService from "./store/services/Auth";
import Chats from "./Components/Chats/Chats";
import Wallet from "./Components/Wallet/Wallet";
import Devs from "./Components/Devs/Devs";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        UserService.getUser(user.uid).then((user) => {
          dispatch(userActions.setUser({ user }));
        });
      } else {
        dispatch(userActions.setUser({ user: null }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Public path="/" exact>
        <Authenticate />
      </Public>
      <Protected path="/feeds">
        <div className="page">
          <Sidebar />
          <Feeds />
          <Rightbar />
        </div>
      </Protected>
      <Protected path={"/profile/:userId"}>
        <div className="page">
          <Sidebar />
          <Profile />
        </div>
      </Protected>
      <Protected path={"/chats"}>
        <div className="page">
          <Chats />
        </div>
      </Protected>
      <Protected path={"/wallet"}>
        <div className="page">
          <Sidebar />
          <Wallet />
        </div>
      </Protected>
      <Protected path={"/devs"}>
        <div className="page">
          <Sidebar />
          <Devs />
        </div>
      </Protected>
      <Protected path={"/editor"}>
        <div className="page">
          <Sidebar />
        </div>
      </Protected>
    </>
  );
};

export default App;
