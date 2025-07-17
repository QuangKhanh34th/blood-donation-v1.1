import React from "react";
import styles from "./styles.module.scss";

const SearchBarV2 = ({
  roles = [],
  selectedRole = "All",
  onRoleChange,
  searchText = "",
  onSearchChange,
}) => {
  return (
    <div className={styles.filterBar}>
      <select
        className={styles.selectBox}
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
      >
        <option value="All">Tất cả</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBarV2;
