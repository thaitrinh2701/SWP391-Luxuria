import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { Button } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Toast } from "../Toast";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadPics = ({ orderID }) => {
  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();
  const API_SUBMIT_DESIGN = import.meta.env.VITE_API_DESIGN_SUBMIT_ENDPOINT;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileList.length === 0) {
      console.error("No file selected");
      return;
    }

    let formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    try {
      const response = await axios.post(
        `${API_SUBMIT_DESIGN}/${orderID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Submit Design: ", response.data);
      Toast("submit_success", "success", "Gửi Design thành công");
      navigate("/yeu-cau");
    } catch (error) {
      Toast("submit_err", "error", "Gửi Design thất bại");
      console.error("Error submitting design: ", error);
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>
      <div className="flex justify-center">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{
            padding: "4px 8px",
            fontSize: "0.75rem",
            marginTop: "10px",
          }}
          onClick={handleSubmit}
        >
          Gửi ảnh
        </Button>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadPics;
