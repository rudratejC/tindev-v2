import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Shared/Card/Card";
import Button from "../../Components/Shared/Button/Button";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const navigate = useNavigate();

  const registerHandler = () => {
    navigate("/authenticate");
  };

  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    fontSize: "medium",
    textDecoration: "none",
    marginLeft: "10px",
  };

  return (
    <div className={styles.cardWrapper}>
      <Card className={styles.welcomeCard}>
        <div className={styles.headingWrapper}>
          <img src="/assets/images/hand.png" alt="logo" />
          <h3>Welcome to Tindev</h3>
        </div>
        <p className={styles.text}>
          We're working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we're adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={registerHandler} text="Create new account" />
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite text ?</span>
          <Link style={signInLinkStyle} to="/login">
            SignIn
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Welcome;
