// Component for handling program image upload to Firebase
/*
  Used in:
  + CreateProgramRefactored.jsx: Image upload functionality for program creation
  
  Purpose:
  - Provides image selection and preview functionality
  - Handles file upload to Firebase Storage
  - Shows upload progress with progress bar
  - Manages image URL state (local preview and Firebase URL)
  - Validates image file types and sizes
*/

import { useState } from "react";
import { Upload, Button, Progress, message, Spin } from "antd";
import { PlusOutlined, CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../../firebase";
import { toast } from "react-toastify";

const ImageUpload = ({ onFirebaseUpload, onFileListChange }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [firebaseUrl, setFirebaseUrl] = useState(null);
  const [firebaseStorageRef, setFirebaseStorageRef] = useState(null);

  const handleImageUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Reset Firebase upload state when file selection changes
    setFirebaseUrl(null);
    setFirebaseStorageRef(null);
    setUploadProgress(0);

    // Notify parent about file list changes
    // this will set the boolean to be true since an image has been upload
    if (onFileListChange) {
      onFileListChange(newFileList.length > 0);
    }
  };

  const handleFirebaseUpload = async () => {
    const file = fileList[0].originFileObj;
    if (!file) {
      toast.error("Không tìm thấy file để tải lên!");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create unique filename with timestamp
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `images/donation-programs/${fileName}`);

      // Store the storage reference for potential deletion
      setFirebaseStorageRef(storageRef);

      // Create upload task for progress tracking (from your experimental uploader)
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Handle upload progress and completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Update progress
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          // Handle error
          setUploading(false);
          toast.error("Lỗi khi tải ảnh lên Firebase: " + error.message);
        },
        () => {
          // Handle successful completion
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFirebaseUrl(url);
            setUploading(false);

            // Notify parent component about the Firebase URL
            if (onFirebaseUpload) {
              onFirebaseUpload(url);
            }

          });
        }
      );
    } catch (error) {
      setUploading(false);
      message.error("Lỗi khi tải ảnh lên Firebase: " + error.message);
    }
  };

  const handleRemove = async () => {
    // If there's a Firebase URL and storage reference, delete the file from Firebase
    if (firebaseUrl && firebaseStorageRef) {
      setDeleting(true); 
      try {
        await deleteObject(firebaseStorageRef);
        toast.success("Ảnh đã được xóa khỏi Firebase thành công!", {
          autoClose: 3000
        });

        // Notify parent component that the Firebase URL is no longer valid
        if (onFirebaseUpload) {
          onFirebaseUpload(null);
        }
      } catch (error) {
        console.error("Error deleting file from Firebase:", error);
        toast.error("Lỗi khi xóa ảnh khỏi Firebase: " + error.message);
        // Don't prevent UI removal even if Firebase deletion fails
      }
      setDeleting(false);
    }

    // Reset all states
    setFirebaseUrl(null);
    setFirebaseStorageRef(null);
    setUploadProgress(0);
    setFileList([]);

    // Notify parent about file list changes
    if (onFileListChange) {
      onFileListChange(false);
    }

    return true; // allow removal from UI
  };

  const uploadButton = (
    <div>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </div>
  );

  return (
    <div>
      <Spin spinning={uploading || deleting}>
        <Upload
          accept="image/*" //restrict upload to images
          listType="picture"
          fileList={fileList}
          onChange={handleImageUpload}
          onRemove={handleRemove}
          beforeUpload={() => false} // Prevent auto upload
          showUploadList={{
            showPreviewIcon: false // disable the "eye" icon in the default component look
          }}
          maxCount={1}
        >
          {/* Render upload button only when no file are selected */}
          {fileList.length === 0 && uploadButton}
        </Upload>
      </Spin>

      {fileList.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {/* Upload to Firebase Button */}
          <div style={{ marginTop: 12 }}>
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              onClick={handleFirebaseUpload}
              loading={uploading}
              disabled={uploading || firebaseUrl}
              style={{ width: '100%' }}
            >
              {uploading ? 'Đang tải lên...' : firebaseUrl ? 'Đã tải lên Firebase' : 'Tải ảnh lên Firebase'}
            </Button>

            {uploading && (
              <Progress
                percent={uploadProgress}
                size="small"
                style={{ marginTop: 8 }}
                status="active"
              />
            )}

            {firebaseUrl && (
              <div style={{ marginTop: 8, padding: 8, backgroundColor: '#f6ffed', borderRadius: 4 }}>
                <div style={{ fontSize: '12px', color: '#52c41a', fontWeight: 'bold' }}>
                  ✅ Ảnh đã được lưu trên Firebase
                </div>
                <div style={{ fontSize: '11px', color: '#666', wordBreak: 'break-all' }}>
                  URL: {firebaseUrl.substring(0, 50)}...
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
