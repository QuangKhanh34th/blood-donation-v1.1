// CertPage.jsx
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Upload } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import api from "../../configs/axios";
import { toast } from "react-toastify";

const CertPage = () => {
  const user = useSelector((state) => state.user);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.userID) return;
    api
      .get(`/certificates`, {
        params: { userId: user.userID },
      })
      .then((res) => setCertificates(res.data || []))
      .catch(() => {
        toast.error("Không thể tải danh sách chứng nhận.");
      });
  }, [user]);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      await api.post("/certificates/upload", formData, {
        params: { userId: user.userID },
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Tải chứng nhận thành công!");
      const res = await api.get(`/certificates`, {
        params: { userId: user.userID },
      });
      setCertificates(res.data || []);
    } catch (err) {
      console.log(err);

      toast.error("Tải chứng nhận thất bại!");
    }
  };

  const checkUserProfile = () => {
    const requiredFields = [
      "fullName",
      "gender",
      "birthdate",
      "cccd",
      "address",
      "typeBlood",
      "phone",
    ];
    const missing = requiredFields.filter((field) => !user?.[field]);

    if (missing.length > 0) {
      toast.error(
        "⚠️ Vui lòng cập nhật thông tin cá nhân trước khi thêm chứng nhận."
      );
      navigate("/user/profile");
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Giấy chứng nhận hiến máu</h2>

      {certificates.length === 0 ? (
        <div className={styles.emptySection}>
          <p className={styles.emptyText}>
            Thêm giấy chứng nhận hiến máu của bạn tại đây. Nếu bạn chưa từng đặt
            lịch hiến máu trên hệ thống, hãy nhớ cập nhật thông tin cá nhân
            trước khi thao tác để quản trị viên có thể đối chiếu.
          </p>

          <Upload
            showUploadList={false}
            customRequest={handleUpload}
            beforeUpload={() => checkUserProfile()}
          >
            <button className={styles.uploadBtn}>
              <PlusCircleOutlined style={{ fontSize: 18 }} />
              Thêm chứng nhận
            </button>
          </Upload>
        </div>
      ) : (
        <>
          <div className={styles.gallery}>
            {certificates.map((cert) => (
              <div key={cert.id} className={styles.card}>
                <img src={cert.imageUrl} alt="Giấy chứng nhận" />
              </div>
            ))}
          </div>

          <div className={styles.uploadWrapper}>
            <Upload
              showUploadList={false}
              customRequest={handleUpload}
              beforeUpload={() => checkUserProfile()}
            >
              <button className={styles.uploadBtn}>
                <PlusCircleOutlined style={{ fontSize: 18 }} />
                Tải thêm chứng nhận
              </button>
            </Upload>
          </div>
        </>
      )}
    </div>
  );
};

export default CertPage;
