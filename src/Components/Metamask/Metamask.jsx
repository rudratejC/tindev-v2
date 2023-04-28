import React, { useEffect, useState } from "react";
import sharedStyles from "../../SharedStyles.module.css";
import styles from "./Metamask.module.css";
import Card from "../Shared/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Shared/Button/Button";
import { faM } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../store/services/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import Input from "../Shared//Input/Input";

const Metamask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    // const email = "bhardik786@gmail.com";
    // const password = "CortanaAndSiri@1";
    const user = await AuthService.signUp({ email, password });
  };

  const signin = async () => {
    // const email = "bhardik786@gmail.com";
    // const password = "CortanaAndSiri@1";
    const user = await AuthService.signIn({ email, password });
    if (user) dispatch(userActions.setUser({ user }));
  };

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) navigate("/feeds");
  }, [user]);

  return (
    <Card className={styles.metaCard}>
      <div className={styles.metaIcon}>
        <FontAwesomeIcon icon={faM} size="6x" />
      </div>
      Email:
      <Input
        className={styles.infoInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      Password:
      <Input
        className={styles.infoInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className={styles.button} text="Signup " onClick={signup} />
      <Button className={styles.button} text="Signin " onClick={signin} />
      <p className={`${styles.disclaimer} ${sharedStyles.subText}`}>
        Sign in through your metamask account
      </p>
    </Card>
  );
};

export default Metamask;
