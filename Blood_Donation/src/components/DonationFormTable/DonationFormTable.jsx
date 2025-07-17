import React, { useState, useEffect } from "react";
import { parseISO, isBefore } from "date-fns";
import {
  Table,
  Tag,
  Button,
  Modal,
  Tabs,
  Tooltip,
  message,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllAppointments,
  updateAppointmentStatus,
  createDonationDetail,
  updateDonationDetail,
  fetchDonationDetailByAppointmentId,
} from "../../redux/features/donationFormSlice";
import styles from "./styles.module.scss";

const { TabPane } = Tabs;
const { Option } = Select;

function DonationFormTable() {
  const dispatch = useDispatch();
  const { appointments, loading } = useSelector((state) => state.donationForm);
  const user = useSelector((state) => state.user);

  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const [donationForm] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("status");

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const statusColors = {
    PENDING: "gold",
    APPROVED: "blue",
    REJECTED: "red",
    FULFILLED: "green",
  };

  const handleViewForm = (record) => {
    setSelectedForm(record);
    setModalVisible(true);
  };

  const handleStatusUpdate = (id, newStatus) => {
    dispatch(updateAppointmentStatus({ id, status: newStatus }))
      .unwrap()
      .then(() => {
        message.success(`Cập nhật trạng thái thành công: ${newStatus}`);
        setModalVisible(false);
      })
      .catch(() => {
        message.error("Có lỗi xảy ra khi cập nhật trạng thái");
      });
  };

  const handleSubmitDonation = (values) => {
    const payload = {
      ...values,
      appointmentId: selectedForm.id,
      staffId: user.userID,
      memberId: selectedForm.userId,
    };

    const isEdit = selectedForm.status === "FULFILLED";

    const thunk = isEdit
      ? updateDonationDetail({ id: selectedForm.id, payload })
      : createDonationDetail(payload);

    dispatch(thunk)
      .unwrap()
      .then(() => {
        message.success(
          isEdit ? "Cập nhật thành công!" : "Lưu thông tin hiến máu thành công!"
        );
        dispatch(
          updateAppointmentStatus({ id: selectedForm.id, status: "FULFILLED" })
        );
        setDonationModalVisible(false);
        donationForm.resetFields();
        setEditMode(false);
      })
      .catch(() => {
        message.error(isEdit ? "Lỗi khi cập nhật" : "Lỗi khi lưu thông tin hiến máu");
      });
  };

  const handleOpenDonationModal = async (record) => {
    setSelectedForm(record); // Set appointment info immediately
    setDonationModalVisible(true); // ✅ Open modal first

    try {
      const donationDetail = await dispatch(
        fetchDonationDetailByAppointmentId(record.id)
      ).unwrap();

      // Fill form if donation exists
      if (donationDetail) {
        donationForm.setFieldsValue({
          donationId: donationDetail.donationId,
          donDate: donationDetail.donDate ? parseISO(donationDetail.donDate) : null,
          location: donationDetail.location,
          bloodType: donationDetail.bloodType,
          donAmount: donationDetail.donAmount,
          userId: donationDetail.userId,
          notes: donationDetail.notes,
        });
      } else {
        donationForm.resetFields(); // If no data, start fresh
      }

      setEditMode(false);
    } catch (error) {
      console.warn("No donation detail found or error:", error);
      donationForm.resetFields(); // Still allow user to input new data
      setEditMode(false);
      // Don't block modal from opening
    }
  };

  const isReadOnly = selectedForm?.status === "FULFILLED" && !editMode;

  const appointmentColumns = [
    {
      title: "Mã Lịch Hẹn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
    },
    {
      title: "Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Hành Động",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            <Button
              type="default"
              onClick={() => handleViewForm(record)}
              size="small"
            >
              Xem phiếu
            </Button>
            <Button
              type="primary"
              size="small"
              disabled={record.status !== "APPROVED" && record.status !== "FULFILLED"}
              onClick={() => handleOpenDonationModal(record)}
              style={
                record.status === "FULFILLED"
                  ? { backgroundColor: 'green', borderColor: 'green' }
                  : {}
              }
            >
              {record.status === "FULFILLED"
                ? "Xem thông tin hiến máu"
                : "Nhập thông tin hiến máu"}
            </Button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12 }}>Thay đổi trạng thái:</span>
            <Select
              size="small"
              defaultValue={record.status}
              style={{ width: 140 }}
              onChange={(newStatus) => handleStatusUpdate(record.id, newStatus)}
            >
              <Select.Option value="PENDING">PENDING</Select.Option>
              <Select.Option value="APPROVED">APPROVED</Select.Option>
              <Select.Option value="REJECTED">REJECTED</Select.Option>
              <Select.Option value="FULFILLED">FULFILLED</Select.Option>
              <Select.Option value="CANCELLED">CANCELLED</Select.Option>
            </Select>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <h3 className={styles.title}>Quản lý Lịch Hẹn Hiến Máu</h3>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm theo Mã Lịch Hẹn"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 240 }}
        />

        <Select value={sortKey} onChange={setSortKey} style={{ width: 180 }}>
          <Option value="status">Sắp xếp theo trạng thái</Option>
          <Option value="date">Sắp xếp theo ngày</Option>
        </Select>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Lịch hẹn" key="1">
          <Table
            columns={appointmentColumns}
            dataSource={
              [...(appointments || [])]
                .filter((a) =>
                  String(a.id).toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort((a, b) => {
                  if (sortKey === "status") {
                    const statusPriority = {
                      PENDING: 1,
                      APPROVED: 2,
                      FULFILLED: 3,
                      REJECTED: 4,
                      CANCELLED: 5,
                    };
                    return (
                      (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99)
                    );
                  } else {
                    // sortKey === "date"
                    return new Date(b.date) - new Date(a.date);
                  }
                })
            }
            rowKey="id"
            loading={loading}
            bordered
            pagination={{ pageSize: 10 }}
          />
        </TabPane>

        {/* <TabPane tab="Chi tiết hiến máu" key="2">
          <p>Chưa có dữ liệu.</p>
        </TabPane> */}
      </Tabs>

      {/* Modal for viewing appointment survey */}
      <Modal
        title={`Phiếu khảo sát - Mã lịch hẹn #${selectedForm?.id}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={
          selectedForm?.status === "PENDING" && [
            <Button
              key="reject"
              danger
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn từ chối phiếu này?")) {
                  handleStatusUpdate(selectedForm.id, "REJECTED");
                }
              }}
            >
              Từ chối
            </Button>,
            <Button
              key="approve"
              type="primary"
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn phê duyệt phiếu này?")) {
                  handleStatusUpdate(selectedForm.id, "APPROVED");
                }
              }}
            >
              Phê duyệt
            </Button>,
          ]
        }
      >
        {selectedForm ? (
          <div>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <b>{`${i + 1}. Câu hỏi khảo sát`}</b>
                <p style={{ margin: "4px 0 0 12px" }}>
                  {selectedForm[`answer${i + 1}`] || "Không có câu trả lời"}
                </p>
              </div>
            ))}
            <hr style={{ margin: "16px 0" }} />
            <p><b>Địa chỉ:</b> {selectedForm.address || "Không rõ"}</p>
            <p><b>Khung giờ:</b> {selectedForm.timeRange || "Không rõ"}</p>
          </div>
        ) : (
          <p>Không có dữ liệu phiếu.</p>
        )}
      </Modal>

      {/* Modal for donation input or view */}
      <Modal
        title={`${selectedForm?.status === "FULFILLED"
          ? "Thông tin hiến máu"
          : "Nhập thông tin hiến máu"
          } - Mã lịch hẹn #${selectedForm?.id}`}
        open={donationModalVisible}
        onCancel={() => {
          setDonationModalVisible(false);
          donationForm.resetFields();
          setEditMode(false);
        }}
        footer={[
          selectedForm?.status === "FULFILLED" && (
            <Button
              key="toggle"
              onClick={() => setEditMode((prev) => !prev)}
              type={editMode ? "default" : "primary"}
            >
              {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
            </Button>
          ),
          <Button key="cancel" onClick={() => setDonationModalVisible(false)}>
            Đóng
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => donationForm.submit()}
            disabled={selectedForm?.status === "FULFILLED" && !editMode}
          >
            Lưu
          </Button>,
        ]}
      >
        <Form layout="vertical" form={donationForm} onFinish={handleSubmitDonation}>
          <Form.Item
            label="Số lượng (ml)"
            name="donAmount"
            rules={[{ required: true, message: "Nhập số lượng hiến máu" }]}
          >
            <Select placeholder="Chọn đơn vị (ml)" disabled={isReadOnly}>
              <Option value={200}>200ml</Option>
              <Option value={350}>350ml</Option>
              <Option value={500}>500ml</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày hiến máu"
            name="donDate"
            rules={[
              { required: true, message: "Chọn ngày hiến máu" },
              () => ({
                validator(_, value) {
                  if (!value) return Promise.resolve();

                  const appointmentDate = selectedForm?.date
                    ? parseISO(selectedForm.date)
                    : null;

                  if (appointmentDate && isBefore(value.toDate(), appointmentDate)) {
                    return Promise.reject(
                      new Error("Ngày hiến máu không được trước ngày lịch hẹn!")
                    );
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
              disabled={isReadOnly}
              disabledDate={(current) => {
                if (!selectedForm?.date) return false;
                const appointmentDate = parseISO(selectedForm.date);
                return current && isBefore(current.toDate(), appointmentDate);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Nhóm máu"
            name="bloodType"
            rules={[{ required: true, message: "Chọn nhóm máu" }]}
          >
            <Select placeholder="Nhóm máu" disabled={isReadOnly}>
              <Option value={1}>A</Option>
              <Option value={2}>B</Option>
              <Option value={3}>AB</Option>
              <Option value={4}>O</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DonationFormTable;
