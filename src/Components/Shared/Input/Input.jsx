import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;
