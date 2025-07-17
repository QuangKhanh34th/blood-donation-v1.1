import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Progress, message } from "antd";

// Import initialized storage from firebase.js
import { storage } from "../firebase";

const FirebaseImageUploader = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl("");
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) {
      message.error("Vui lòng chọn một file ảnh.");
      return;
    }
    setUploading(true);
    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        setUploading(false);
        message.error("Lỗi khi upload ảnh: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setUploading(false);
          message.success("Upload thành công!");
        });
      }
    );
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h3>Upload ảnh lên Firebase</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
      <Button type="primary" onClick={handleUpload} disabled={!file || uploading} style={{ marginTop: 12 }}>
        Upload
      </Button>
      {uploading && <Progress percent={progress} status="active" style={{ marginTop: 12 }} />}
      {imageUrl && (
        <div style={{ marginTop: 16 }}>
          <div>Ảnh đã upload:</div>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%", marginTop: 8 }} />
          <div style={{ wordBreak: "break-all", marginTop: 8 }}>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseImageUploader;
