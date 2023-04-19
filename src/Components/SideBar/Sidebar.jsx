import React from "react";
import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import Button from "../Shared/Button/Button";
import AuthService from "../../store/services/Auth";
import { useSelector } from "react-redux";
import { faWa } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.userReducer.user);
  const logout = async () => {
    await AuthService.signOut();
  };
  return (
    <div className={styles.sidebar}>
      <div>
        <Link
          to="/feeds"
          className={
            location.pathname === "/feeds"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/feeds.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Feeds</p>
        </Link>
        <Link
          to={`/profile/${user.uid}`}
          className={
            location.pathname === "/profile"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/idCard.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Setup Profile</p>
        </Link>
        <Link
          to="/chats"
          className={
            location.pathname === "/chats"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/chats.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Chats</p>
        </Link>
        <Link
          to="/wallet"
          className={
            location.pathname === "/wallet"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/chats.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Wallet</p>
        </Link>
        <Link
          to="/devs"
          className={
            location.pathname === "/devs"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/github.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Search Devs</p>
        </Link>
        <Link
          to="/editor"
          className={
            location.pathname === "/editor"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/code-editor.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Editor</p>
        </Link>
      </div>
      <Button className={styles.logout} text="Logout" onClick={logout} />
    </div>
  );
};

export default Sidebar;
