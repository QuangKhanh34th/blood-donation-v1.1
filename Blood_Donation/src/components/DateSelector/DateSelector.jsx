import React from "react";
import styles from "./styles.module.scss";

const isPast = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate < today;
};

const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const generateDates = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const DateSelector = ({ selectedDate, onChange }) => {
  const { dateSelector, header, dayList, dayButton, active, disabled } = styles;
  const dates = generateDates();

  return (
    <div className={dateSelector}>
      <div className={header}>
        <span>
          🗓️ Chọn ngày -
          {selectedDate
            ? " " + selectedDate.toLocaleDateString("vi-VN")
            : " Chưa chọn"}
        </span>
        <a href="#">Xem lịch</a>
      </div>

      <div className={dayList}>
        {dates.map((date) => {
          const label = `${weekdays[date.getDay()]}`;
          const isSelected =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          const isDisabled = isPast(date);

          return (
            <button
              key={date.toISOString()}
              className={`${dayButton} ${isSelected ? active : ""} ${
                isDisabled ? disabled : ""
              }`}
              onClick={() => !isDisabled && onChange(date)}
              disabled={isDisabled}
            >
              <div>{label}</div>
              <div>{date.getDate()}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
