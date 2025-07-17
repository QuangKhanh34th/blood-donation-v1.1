import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Form, Input, Space, Popconfirm } from "antd";
import {
  fetchBlogs,
  deleteBlog,
  updateBlog,
} from "../../redux/features/blogSlice";

export default function BlogList() {
  const dispatch = useDispatch();
  const { list: blogs, loading } = useSelector((state) => state.blog);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    form.setFieldsValue(blog);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(updateBlog({ id: editingBlog.contId, blogData: values }));
        setIsModalOpen(false);
        setEditingBlog(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "contTitle",
      key: "contTitle",
    },
    {
      title: "Loại",
      dataIndex: "contType",
      key: "contType",
    },
    {
      title: "Ngày đăng",
      dataIndex: "conPubDate",
      key: "conPubDate",
    },
    {
      title: "Nhân viên",
      dataIndex: ["staff", "fullName"],
      key: "staffName",
      render: (_, record) => record.staff?.fullName || record.staff?.username || "Ẩn danh",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa blog?"
            onConfirm={() => handleDelete(record.contId)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Danh sách bài viết</h2>
      <Table
        dataSource={blogs}
        columns={columns}
        loading={loading}
        rowKey="contId"
      />

      <Modal
        title="Chỉnh sửa Blog"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsModalOpen(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="contTitle"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contType"
            label="Loại"
            rules={[{ required: true, message: "Vui lòng nhập loại" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contBody"
            label="Nội dung"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
