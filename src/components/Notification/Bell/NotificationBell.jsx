import { useState, useRef, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import DropdownNoti from "../DropdownNoti/DropdownNoti";
import styles from "../Bell/styles.module.scss";
import api from "../../../configs/axios";

const NotificationBell = ({ className = "" }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notiRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = async () => {
    try {
      const res = await api.get("notification/me");
      setNotifications(res.data); // cập nhật luôn danh sách mỗi lần fetch
    } catch (error) {
      console.error("Lỗi khi fetch thông báo:", error);
    }
  };

  // Gọi API mỗi khi người dùng bấm chuông để mở dropdown
  const handleToggleDropdown = () => {
    const nextShow = !showDropdown;
    setShowDropdown(nextShow);
    if (nextShow) {
      fetchNotifications(); // gọi API mỗi lần mở dropdown
    }
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notiRef.current && !notiRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={notiRef} className={className} style={{ position: "relative" }}>
      <IoNotifications
        className={styles.notificationIcon}
        onClick={handleToggleDropdown}
      />
      {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      {showDropdown && (
        <DropdownNoti
          notifications={notifications}
          onClose={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
