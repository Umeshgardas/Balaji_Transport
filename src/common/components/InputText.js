// components/TextInput.js
"use client";

import React from "react";
import styles from "./TextInput.module.css";

const TextInput = ({
  label,
  type,
  name,
  required,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        name={name}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
