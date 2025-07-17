// src/components/EventDetail/EventDetail.jsx
import React from "react";
import { Modal, message } from "antd";
import styles from "./styles.module.scss";
import { IoMdTime } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineDescription } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedProgram } from "../../redux/features/bloodHistorySlice";
import api from "../../configs/axios";
import dayjs from "dayjs";

export const EventDetail = ({ open, onClose, event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Lấy chi tiết chương trình
      const programRes = await api.get(`/programs/${event.id}`);
      const programDetail = programRes.data;

      // Lấy danh sách slotIds từ chi tiết chương trình
      const slotIds = programDetail.slotIds || [];

      // Gọi từng slot theo ID (giống bên Schedule)
      const slots = await Promise.all(
        slotIds.map(async (slotId) => {
          try {
            const slotRes = await api.get(`/slots/${slotId}`);
            return slotRes.data;
          } catch {
            return null;
          }
        })
      );

      // Lọc ra những slot hợp lệ
      const validSlots = slots.filter((slot) => slot);

      // Lấy địa chỉ
      let addressName = "Không rõ";
      try {
        const addressRes = await api.get(
          `/addresses/${programDetail.addressId}`
        );
        addressName = addressRes.data.name || "Không rõ";
      } catch (err) {
        console.log(err);
      }

      // Gửi dữ liệu sang Redux
      dispatch(
        setSelectedProgram({
          ...programDetail,
          slots: validSlots,
          slotIds,
          addressName,
          fromEventDetail: true,
        })
      );

      // Điều hướng sang schedule
      navigate("/user/donate/schedule", {
        state: {
          fromEventDetail: true,
          selectedDate: event.selectedDate || programDetail.startDate,
        },
      });
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết chương trình:", error);
      message.error("Không thể tải thông tin chi tiết chương trình.");
    }
  };

  if (!event) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={event.proName || "Thông tin chương trình"}
      className={styles.modal}
    >
      <div className={styles.detailItem}>
        <FaCalendarAlt className={styles.icon} />
        <strong>Ngày tổ chức:</strong>{" "}
        <span>
          {event.startDate
            ? dayjs(event.startDate).format("DD/MM/YYYY")
            : "Chưa rõ"}
        </span>
      </div>

      <div className={styles.detailItem}>
        <IoMdTime className={styles.icon} />
        <strong>Thời gian:</strong>{" "}
        <span>
          {event.slots && event.slots.length > 0
            ? event.slots
                .map((slot) => `${slot.start} - ${slot.end}`)
                .join(", ")
            : "Chưa có thông tin"}
        </span>
      </div>

      <div className={styles.detailItem}>
        <CiLocationOn className={styles.icon} />
        <strong>Địa điểm:</strong>{" "}
        <span>{event.address || "Không rõ địa điểm"}</span>
      </div>

      <div className={styles.detailItem}>
        <BsDropletHalf className={styles.icon} />
        <strong>Loại máu:</strong>{" "}
        <span>{event.typeBlood || "Không giới hạn"}</span>
      </div>

      <div className={styles.detailItem}>
        <MdOutlineDescription className={styles.icon} />
        <strong>Mô tả:</strong>{" "}
        <span>{event.description || "Không có mô tả"}</span>
      </div>

      <div className={styles.detailItem}>
        <FiPhone className={styles.icon} />
        <strong>Liên hệ:</strong>{" "}
        <span>{event.contact || "Chưa có thông tin"}</span>
      </div>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Button content="Đăng ký ngay" onClick={handleRegister} />
      </div>
    </Modal>
  );
};
