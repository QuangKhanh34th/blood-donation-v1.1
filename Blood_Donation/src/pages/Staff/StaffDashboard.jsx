import React, { useState } from "react";
import BloodRequestTable from "./BloodRequestTable";
import {
  DashboardOutlined,
  FormOutlined,
  FileTextOutlined,
  DropboxOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import DonationFormTable from "../../components/DonationFormTable/DonationFormTable";
import BlogList from "../../components/Blog-Page/BlogList";
import BlogCreateModal from "../../components/Blog-Page/BlogCreateModal";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const StaffDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    getItem("Dashboard", "dashboard", <DashboardOutlined />),

    getItem("Blog Management", "blog", <FileTextOutlined />),

    getItem("Blood Requests", "blood-requests", <FormOutlined />),

    getItem("Donation Forms", "donation-forms", <FormOutlined />),

    getItem("Blood Inventory", "blood-inventory", <DropboxOutlined />),

    getItem("Logout", "logout", <LoginOutlined />),
  ];
  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      // Xử lý logout
      toast.success("Logged out successfully");
      dispatch(logout());
      navigate("/login");
    } else {
      setSelectedMenuItem(key);
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
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
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              { title: "Staff" },
              {
                title:
                  items.find((item) => item.key === selectedMenuItem)?.label ||
                  "Dashboard",
              },
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
            {selectedMenuItem === "dashboard" && (
              <div className={styles.dashboardCenterWrapper}>
                <h2>Welcome to Staff Dashboard</h2>
                <p>
                  Please choose one of the following functions on the sidebar to
                  start
                </p>
              </div>
            )}
            {selectedMenuItem === "blog" && (
              <>
                <BlogCreateModal />
                <BlogList />
              </>
            )}
            {selectedMenuItem === "blood-requests" && (
              <>
                <BloodRequestTable />
              </>
            )}
            {selectedMenuItem === "donation-forms" && (
              <>
                <DonationFormTable />
              </>
            )}
            {selectedMenuItem === "blood-inventory" && (
              <h2>Welcome to Blood Inventory</h2>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Blood Bank Management System ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default StaffDashboard;
