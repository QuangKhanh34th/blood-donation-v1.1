// Tag: for different colors of the boolean "enabled"
// fetchAccounts: THE async thunk used to fetch API data
import { Table, Space, Modal, Button } from "antd";
import {
  FileSearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccounts,
  deleteAccountById,
  addAccount,
} from "../../../redux/features/accountSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBarV2 from "../../../components/SearchBarV2/SearchBarV2";
import AddAccountForm from "./AddAccountForm";

function AccountTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // B1: declare the "state" var, assign it with state.accounts (the slice state), which returned by useSelector()
  // B2: assign the "state" var to the 3 vars (accounts, loading, error) and use it throughout this file

  // note: "data: accounts" mean take the "data" property from accounts slice and assign it to a new var called "accounts"
  // this is just for clarity
  const { data: accounts, loading, error } = useSelector((state) => state.account);

  // Local state for search/filter
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchText, setSearchText] = useState("");

  // State for delete modal and countdown
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [deleteBtnDisabled, setDeleteBtnDisabled] = useState(true);

  // Get unique roles from accounts for the filter dropdown
  const roles = Array.from(new Set(accounts.map((acc) => acc.role)));

  // State for add account modal and form
  const [addModalVisible, setAddModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

   // Countdown logic for delete button
  useEffect(() => {
    let timer;
    if (deleteModalVisible && deleteBtnDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setDeleteBtnDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [deleteModalVisible, deleteBtnDisabled]);

  const showDeleteModal = (record) => {
    setDeleteTarget(record);
    setDeleteModalVisible(true);
    setCountdown(3);
    setDeleteBtnDisabled(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) {
      console.error("Không có ID hợp lệ để xóa.");
      return;
    }

    await dispatch(deleteAccountById(deleteTarget.id));
    setDeleteModalVisible(false);
  };

  // Filter accounts based on selectedRole and searchText
  const filteredAccounts = accounts.filter((acc) => {
    const matchRole = selectedRole === "All" || acc.role === selectedRole;
    const matchName = (acc.fullName || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchRole && matchName;
  });

  const columns = [
    {
      title: "UserID",
      dataIndex: "id", 
      key: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <FileSearchOutlined
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/admin/accounts/${record.id}`)} 
          />
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => showDeleteModal(record)}
          />
        </Space>
      ),
    },
  ];

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ padding: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
            marginBottom: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <SearchBarV2
            roles={roles}
            selectedRole={selectedRole}
            onRoleChange={setSelectedRole}
            searchText={searchText}
            onSearchChange={setSearchText}
          />
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Button type="primary" onClick={() => setAddModalVisible(true)}>
              Thêm tài khoản
            </Button>
          </div>
        </div>
        <Table
          dataSource={filteredAccounts}
          columns={columns}
          loading={loading}
          rowKey="id" // ✅ thêm rowKey để tránh warning React
        />

        {/* Modals */}
        {/* Add Account Modal */}
        <Modal
          title="Thêm tài khoản mới"
          open={addModalVisible}
          onCancel={() => setAddModalVisible(false)}
          footer={null}
        >
          <AddAccountForm
            onCancel={() => setAddModalVisible(false)}
            // Ant Design Form submit button handling
            onFinish={async (values) => {
              const payload = {
                ...values,
                birthdate: values.birthdate
                  ? values.birthdate.format("YYYY-MM-DD")
                  : undefined,
              };
              await dispatch(addAccount(payload));
              setAddModalVisible(false);
              dispatch(fetchAccounts()); // Refresh list
            }}
          />
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          title="Xác nhận xóa tài khoản"
          open={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
              Hủy
            </Button>,
            <Button
              key="delete"
              type="primary"
              danger
              disabled={deleteBtnDisabled}
              onClick={handleDelete}
            >
              {deleteBtnDisabled ? `Xóa (${countdown})` : "Xóa"}
            </Button>,
          ]}
        >
          {deleteTarget && (
            <>
              Bạn có chắc chắn muốn xóa tài khoản{" "}
              <b>{deleteTarget.username}</b> (UserID: {deleteTarget.id})?
              Hành động này không thể hoàn tác.
            </>
          )}
        </Modal>
      </div>
    </>
  );
}

export default AccountTable;
