import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Spin, Button } from "antd";
import api from "../../../configs/axios";
import styles from "../AppointmentDetails/styles.module.scss";

const statusColor = {
  PENDING: "orange",
  APPROVED: "green",
  FULFILLED: "blue",
  CANCELLED: "red",
  REJECTED: "volcano",
};

const statusLabel = {
  PENDING: "Đang chờ",
  APPROVED: "Đã duyệt",
  FULFILLED: "Đã hiến",
  CANCELLED: "Đã hủy",
  REJECTED: "Bị từ chối",
};

const AppointmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/appointments/${id}`);
        setAppointment(res.data);
      } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <Spin />;

  if (!appointment)
    return (
      <p style={{ textAlign: "center", marginTop: 40 }}>
        Không tìm thấy lịch hẹn
      </p>
    );

  return (
    <div className={styles.container}>
      <h1>Chi tiết lịch hẹn</h1>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Ngày hẹn">
          {appointment.date}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian">
          {appointment.timeRange}
        </Descriptions.Item>
        <Descriptions.Item label="Địa điểm">
          {appointment.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          {appointment.note || "Không có"}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={statusColor[appointment.status]}>
            {statusLabel[appointment.status]}
          </Tag>
        </Descriptions.Item>
        {appointment.updatedBy && (
          <Descriptions.Item label="Người xác nhận">
            {appointment.updatedBy}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Button style={{ marginTop: 24 }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default AppointmentDetail;
