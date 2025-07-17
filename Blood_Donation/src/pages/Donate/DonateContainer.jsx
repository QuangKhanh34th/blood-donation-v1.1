import { NavLink, Outlet } from "react-router-dom";
import styles from "../Donate/styles.module.scss";

const DonateContainer = () => {
  return (
    <div className={styles.container}>
      <h2>Đặt lịch hiến máu</h2>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <NavLink
            to="schedule"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            🗓️ Thời gian & địa điểm
          </NavLink>
          <NavLink
            to="checkup"
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            📋 Phiếu đăng ký hiến máu
          </NavLink>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DonateContainer;
