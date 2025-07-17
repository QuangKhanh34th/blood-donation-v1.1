// src/components/Schedule/LocationSelector.jsx
import React from "react";
import styles from './styles.module.scss';

export const LocationSelector = ({ location, onChange }) => {
  const { locationContainer, label, select } = styles;

  return (
    <div className={locationContainer}>
      <label className={label} htmlFor="location">Tỉnh/Thành phố</label>
      <select
        id="location"
        className={select}
        value={location}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        <option value="Hà Nội">Hà Nội</option>
        <option value="Đà Nẵng">Đà Nẵng</option>
        {/* Add more locations here */}
      </select>
    </div>
  );
};
