import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  FileSearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Breadcrumb, Layout, Menu, theme, message, Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import BloodReceiveForm from "../../components/Blood-Form/Blood-Receive-Form/BloodReceiveForm";
import BloodRequestTable from "../../components/BloodRequestTable/BloodRequestTable";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const HospitalStaffDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");
  const [isModalVisible, setIsModalVisible] = useState(false);

//setup test
//   const [localRequests, setLocalRequests] = useState([]);
//   const handleNewRequest = (newRequest) => {
//   const formatted = {
//     reqID: `REQ${Date.now()}`, // unique ID
//     reqCreateDate: new Date().toISOString(),
//     status: "PENDING",
//     ...newRequest,
//   };
//   setLocalRequests((prev) => [formatted, ...prev]);
//   setIsModalVisible(false); // close modal after submit
// };
//end of setup test
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const items = [
    getItem("Dashboard", "dashboard", <DashboardOutlined />),

    getItem("Blood Requisition", "create-request", <FileSearchOutlined />),

    getItem("Emergency Donors", "emergency-donors", <TeamOutlined />),

    getItem("Logout", "logout", <LoginOutlined />),
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Handle logout
      message.success("Logged out successfully");
      dispatch(logout());
      navigate("/login");
    } else {
      setSelectedMenuItem(key);
      // Here you would add navigation to other routes if needed
      // For example: navigate(`/hospital-staff/${key}`);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenuItem]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
         <Header className={styles.header}>
                  <h1 className={styles.headerTitle}>Hospital Staff Dashboard</h1>
          </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Hospital Staff" },
              { title: items.find((item) => item.key === selectedMenuItem)?.label || "Dashboard" },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedMenuItem === "dashboard" && <h2>Welcome to Hospital Staff Dashboard</h2>}

            {selectedMenuItem === "create-request" && (
              <>
                <Button type="primary" onClick={showModal}>
                  Tạo yêu cầu nhận máu
                </Button>

                <Modal
                  title="Yêu Cầu Nhận Máu"
                  open={isModalVisible}
                  onCancel={handleCancel}
                  footer={null} 
                  width={800} 
                >
                  <BloodReceiveForm onFinishSuccess={() => setIsModalVisible(false)} />
                  {/* <BloodReceiveForm onFinishSuccess={handleNewRequest} /> */}

                </Modal>
                <BloodRequestTable />
                {/* <BloodRequestTable demoData={localRequests} /> */}

              </>
            )}

            {selectedMenuItem === "emergency-donors" && (
              <div>Search Emergency Donors (coming soon...)</div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Hospital Blood Management System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HospitalStaffDashboard; 
