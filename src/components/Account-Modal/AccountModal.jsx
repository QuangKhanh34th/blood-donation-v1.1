import React from "react";
import { Modal, Form, Input, Select } from "antd";
import styles from "./styles.module.scss";

const { Option } = Select;

const AccountModal = ({ visible, mode, onClose, onSave, user }) => {
  const [form] = Form.useForm();
  const isViewMode = mode === "view";
  const { formContainer, formItem, inputField, selectField } = styles;

  React.useEffect(() => {
    if (visible && user) {
      form.setFieldsValue(user);
    }
  }, [user, visible, form]);

  return (
    <Modal
      open={visible}
      title={isViewMode ? "Xem Thông Tin Tài Khoản" : "Chỉnh Sửa Tài Khoản"}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => {
        if (isViewMode) {
          onClose();
        } else {
          form
            .validateFields()
            .then((values) => {
              onSave({ id: user.id, ...values });
              form.resetFields();
            })
            .catch((info) => console.log("Validate Failed:", info));
        }
      }}
      okText={isViewMode ? "Đóng" : "Lưu"}
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical" className={formContainer}>
        <Form.Item name="id" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          className={formItem}
        >
          <Input className={inputField} disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          label="Năm sinh"
          name="birthYear"
          rules={[{ required: true, message: "Vui lòng nhập năm sinh" }]}
          className={formItem}
        >
          <Input className={inputField} disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          className={formItem}
        >
          <Select className={selectField} disabled={isViewMode}>
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          className={formItem}
        >
          <Select className={selectField} disabled={isViewMode}>
            <Option value="User">User</Option>
            <Option value="Staff">Staff</Option>
            <Option value="Staff Hospital">Staff Hospital</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountModal;
