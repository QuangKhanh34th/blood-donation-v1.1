import React from "react";
import styles from "./styles.module.scss";

const NewsForm = ({ image, title, summary, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
};

export default NewsForm;
