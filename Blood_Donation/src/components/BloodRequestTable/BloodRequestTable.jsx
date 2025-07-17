import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table, Tag, Tooltip, Button, Popconfirm, Select, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequestsByMedId, cancelBloodRequest } from "../../redux/features/bloodRequestSlice";
import UpdateBloodRequestForm from "../BloodRequestModal/UpdateModal/UpdateModal";
import styles from "./styles.module.scss";

function BloodRequestTable() {
  const dispatch = useDispatch();

  const statusDescriptions = {
    PENDING: "PENDING: Trung tâm hiến máu đang xem xét yêu cầu của bạn. Vui lòng đợi.",
    APPROVED: "APPROVED: Yêu cầu đã được phê duyệt. Các túi máu sẽ được giao trong vòng 3–5 ngày tới. Nếu có thắc mắc, vui lòng liên hệ: 0123 456 789.",
    COMPLETED: "COMPLETED: Quá trình nhận máu đã hoàn tất. Cảm ơn bạn!",
    REJECTED: "REJECTED: Yêu cầu đã bị từ chối. Vui lòng kiểm tra lại thông tin hoặc liên hệ hỗ trợ.",
  };

  const { Option } = Select;
  const [sortMode, setSortMode] = React.useState("status");
  const handleSortChange = (value) => {
    setSortMode(value);
  };
  const getSortedRequests = () => {
    const statusOrder = {
      PENDING: 1,
      APPROVED: 2,
      REJECTED: 3,
      COMPLETED: 4,
      CANCELLED: 5,
    };

    return [...requestList].sort((a, b) => {
      if (sortMode === "status") {
        // Emergency requests within PENDING come first
        if (a.status === b.status && a.status === "PENDING") {
          const aEmergency = a.isEmergency?.toString().toLowerCase() === "yes";
          const bEmergency = b.isEmergency?.toString().toLowerCase() === "yes";
          return bEmergency - aEmergency; // EMERGENCY before NORMAL
        }
        return statusOrder[a.status] - statusOrder[b.status];
      } else if (sortMode === "date") {
        return new Date(b.reqCreateDate) - new Date(a.reqCreateDate); // latest first
      }
      return 0;
    });
  };

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { requestList, loading } = useSelector((state) => state.bloodRequest);
  const user = useSelector((state) => state.user);
  useEffect(() => {
  if (user?.userID) {
    dispatch(fetchRequestsByMedId(user.userID));
  }
}, [dispatch, user]);

  const columns = [
    {
      title: "Mã Yêu Cầu",
      dataIndex: "reqID",
      key: "reqID",
    },
    {
      title: "Khẩn Cấp",
      dataIndex: "isEmergency",
      key: "isEmergency",
      render: (value) => {
        const isTrue = typeof value === "boolean" ? value : value?.toString().toLowerCase() === "yes";
        return isTrue ? <Tag color="red">Khẩn cấp</Tag> : <Tag color="green">Thường</Tag>;
      },
    },
    {
      title: "Chi Tiết",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {Array.isArray(details) && details.length > 0 ? (
            details.map((item, index) => (
              <li key={index}>
                Nhóm máu: <b>{item.typeBlood}</b> | Số túi: {item.packCount} | Dung tích: {item.packVolume}ml
              </li>
            ))
          ) : (
            <li>Không có dữ liệu</li>
          )}
        </ul>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "PENDING") color = "gold";
        else if (status === "APPROVED") color = "blue";
        else if (status === "COMPLETED") color = "green";
        else if (status === "REJECTED") color = "red";
        return (
          <Tooltip title={statusDescriptions[status]}>
            <Tag color={color} style={{ cursor: "pointer" }}>{status}</Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Ngày Tạo",
      dataIndex: "reqCreateDate",
      key: "reqCreateDate",
      render: (value) =>
        value ? new Date(value).toLocaleString("vi-VN") : "Không rõ",
    },

    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => {
        const canChange = record.status === "PENDING";
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Cập nhật yêu cầu">
              <Button
                type="primary"
                disabled={!canChange}
                onClick={() => {
                  setSelectedRequest(record);
                  setUpdateModalVisible(true);
                }}
              >
                Cập nhật
              </Button>
            </Tooltip>

            <Tooltip title="Chỉ có thể hủy yêu cầu đang chờ xử lý (PENDING)">
              <Popconfirm
                title="Bạn có chắc muốn hủy yêu cầu này không?"
                okText="Có"
                cancelText="Không"
                onConfirm={async () => {
                  try {
                    await dispatch(cancelBloodRequest(record.reqID)).unwrap();
                    toast.success("Hủy yêu cầu thành công!");
                  } catch (err) {
                    toast.error(err || "Không thể hủy yêu cầu.");
                  }
                }}
              >
                <Button danger disabled={!canChange}>
                  Hủy
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    }


  ];

  return (
    <div className={styles.tableContainer}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 className={styles.title} style={{ margin: 0 }}>Danh sách yêu cầu máu</h3>
        <Select
          defaultValue="status"
          style={{ width: 220 }}
          onChange={handleSortChange}
        >
          <Option value="status">Sắp xếp theo Trạng thái</Option>
          <Option value="date">Sắp xếp theo Ngày tạo (mới nhất)</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={
          Array.isArray(getSortedRequests()) && getSortedRequests().length > 0
            ? getSortedRequests()
            : []
        }
        rowKey="reqID"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Cập nhật Yêu Cầu Nhận Máu"
        open={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={null}
      >
        {selectedRequest && (
          <UpdateBloodRequestForm
            initialData={selectedRequest}
            onClose={() => setUpdateModalVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
}

export default BloodRequestTable;
