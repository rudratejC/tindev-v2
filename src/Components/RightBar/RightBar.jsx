import React, { useEffect } from "react";
import styles from "./RightBar.module.css";
import Input from "../Shared/Input/Input";
import UserService from "../../store/services/User";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import UserHeader from "../Shared/UserHeader/UserHeader";
import { Link } from "react-router-dom";

const Rightbar = ({ className }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await UserService.getAllUsers();
        if (users) {
          dispatch(userActions.setAllUsers({ users }));
        }
      } catch (e) {
        dispatch(userActions.setError({ error: e.message }));
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className={`${className} ${styles.rightbarContent}`}>
      <Input
        type="text"
        placeholder="Search Devs"
        className={styles.searchInput}
      />
      <p>Developers</p>
      <div className={styles.usersList}>
        {users &&
          users.map((user) => (
            <li>
              <hr />
              <Link
                to={`/profile/${user.uid}`}
                className={styles.link}
                state={{ diffUser: true }}
              >
                <UserHeader
                  username={user.username}
                  designation={user.designation}
                />
              </Link>
            </li>
          ))}
      </div>
    </div>
  );
};

export default Rightbar;
