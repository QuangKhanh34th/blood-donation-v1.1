import React from "react";
import { DatePicker, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import styles from "../SearchBar/SearchBar.module.scss";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const SearchBar = ({ onSearch }) => {
  const [selectedRange, setSelectedRange] = React.useState(null);
  const [formattedRange, setFormattedRange] = React.useState(null); // 🆕 Lưu dateString
  const navigate = useNavigate();

  const handleRangeChange = (value, dateString) => {
    setSelectedRange(value);
    setFormattedRange(dateString); // 🆕 Lưu chuỗi
    console.log("Formatted Selected Time: ", dateString);
  };

  const handleClick = () => {
    if (selectedRange && formattedRange) {
      onSearch?.(selectedRange);
      navigate(
        `/event?startDate=${formattedRange[0]}&endDate=${formattedRange[1]}`
      );
    } else {
      console.log("Please select a date range.");
    }
  };

  return (
    <div className={styles.searchBox}>
      <Text strong className={styles.searchTitle}>
        <CalendarOutlined style={{ marginRight: 8 }} />
        Bạn cần đặt lịch vào thời gian nào?
      </Text>

      <div className={styles.searchContainer}>
        <RangePicker
          format="YYYY-MM-DD"
          placeholder={["Từ ngày", "Đến ngày hoặc hiện tại"]}
          allowEmpty={[false, true]}
          onChange={handleRangeChange}
          className={styles.rangePicker}
        />
        <Button
          type="primary"
          className={styles.searchButton}
          onClick={handleClick}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
