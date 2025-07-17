import React from "react";
import { Modal, Button, Descriptions } from "antd";
import { useDispatch } from "react-redux";
import { updateAppointmentStatus } from "../../../redux/features/donationFormSlice";

const questionTitles = [
  "1. Anh/chị từng hiến máu chưa?",
  "2. Hiện tại, anh/chị có mắc bệnh lý nào không?",
  "3. Trước đây, anh/chị có từng mắc một trong các bệnh ...?",
  "4. Trong 12 tháng gần đây, anh/chị có:",
  "5. Trong 06 tháng gần đây, anh/chị có:",
  "6. Trong 01 tháng gần đây, anh/chị có:",
  "7. Trong 14 ngày gần đây, anh/chị có:",
  "8. Trong 07 ngày gần đây, anh/chị có:",
  "9. Câu hỏi dành cho phụ nữ:",
];

const AppointmentFormModal = ({ visible, onClose, data }) => {
  const dispatch = useDispatch();

  const handleUpdate = (status) => {
    dispatch(updateAppointmentStatus({ id: data.id, status }));
    onClose(); // optional: close modal after update
  };

  return (
    <Modal
      title={`Phiếu khảo sát của lịch hẹn #${data?.id}`}
      open={visible}
      onCancel={onClose}
      footer={
        data.status === "PENDING" && (
          <>
            <Button danger onClick={() => handleUpdate("REJECTED")}>
              Từ chối
            </Button>
            <Button type="primary" onClick={() => handleUpdate("APPROVED")}>
              Phê duyệt
            </Button>
          </>
        )
      }
    >
      <Descriptions column={1} size="small" bordered>
        {questionTitles.map((title, index) => {
          const key = `answer${index + 1}`;
          return (
            <Descriptions.Item label={title} key={key}>
              {data[key] || "Không có câu trả lời"}
            </Descriptions.Item>
          );
        })}
      </Descriptions>
    </Modal>
  );
};

export default AppointmentFormModal;
