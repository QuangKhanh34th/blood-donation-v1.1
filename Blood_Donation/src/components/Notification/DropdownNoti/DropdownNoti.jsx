import styles from "./styles.module.scss";

const DropdownNoti = ({ notifications = [], onClose }) => {
  return (
    <div className={styles.dropdownNoti}>
      <div className={styles.dropdownHeader}>
        <span>Thông báo</span>
        <button onClick={onClose}>Đóng</button>
      </div>
      <div className={styles.dropdownBody}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>Không có thông báo</div>
        ) : (
          notifications.map((noti, index) => (
            <div key={index} className={styles.notificationItem}>
              <p>{noti.message}</p>
              <small>{noti.time}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DropdownNoti;
