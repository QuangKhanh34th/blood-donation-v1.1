// src/components/NewsDetailForm/NewsDetailForm.jsx
import React from "react";
import styles from "./styles.module.scss";

const NewsDetailForm = ({ image, title, content }) => {
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.title}>{title}</h1>
      <img src={image} alt={title} className={styles.image} />
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default NewsDetailForm;
