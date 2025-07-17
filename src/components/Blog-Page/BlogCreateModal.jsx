import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../redux/features/blogSlice";
import { Modal, Form, Input, Button } from "antd";

export default function BlogCreateButton() {
  const dispatch = useDispatch();
  const { createLoading } = useSelector((state) => state.blog);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      await dispatch(createBlog(values)).unwrap();
      form.resetFields();
      setOpen(false);
    } catch (err) {
      console.error("Đăng blog thất bại:", err);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tạo bài viết mới
      </Button>

      <Modal
        title="Tạo bài viết mới"
        open={open}
        onOk={handleCreate}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        okText="Đăng bài"
        cancelText="Hủy"
        confirmLoading={createLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tiêu đề"
            name="contTitle"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại bài viết"
            name="contType"
            rules={[{ required: true, message: "Vui lòng nhập loại bài viết" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nội dung"
            name="contBody"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
