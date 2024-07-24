import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { Button } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Toast } from "../Toast";
import { useNavigate } from "react-router-dom";
import { getRoleId } from "@/services";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadPics = ({ onChange = () => {}, orderID }) => {
  const [cookies] = useCookies(["user", "token"]);
  const [roleID, setRoleID] = useState(null);
  const navigate = useNavigate();
  const API_SUBMIT_DESIGN = import.meta.env.VITE_API_DESIGN_SUBMIT_ENDPOINT;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log(roleIDFromAPI);
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange(newFileList);
  };

  useEffect(() => {
    fetchRoleID();
  }, []);

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
      <span className="dark:text-white">
        <PlusOutlined />
      </span>
      <div
        style={{
          marginTop: 8,
        }}
      >
        <span className="dark:text-white">Upload</span>
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
      {roleID != 1 && (
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
      )}

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
