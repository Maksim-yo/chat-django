import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import fileDownload from "js-file-download";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetFileQuery } from "../../../../app/services/api/apiService";
import { convertBase64ToBlob } from "../../../../utils/message";
export const DownloadFile = ({ children, message, setSpacing, setHover }) => {
  const dispatch = useDispatch();
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState();
  const [time, setTime] = useState();
  const [queryData, setQueryData] = useState(skipToken); // initialize with skipToken to skip at first
  const { data, error, isError, isSuccess, isLoading } =
    useGetFileQuery(queryData);
  const [isChildReady, setIsChildReady] = useState(false);

  useEffect(() => {
    if (data) {
      const json_data = JSON.parse(data);

      const file = convertBase64ToBlob(json_data.data, message.file.file_type);
      const image_file = file;

      if (message.type === "Image") {
        setFileData({ data: image_file, preview: false });
      } else if (message.type === "File") {
        const a = document.createElement("a");
        a.download = message.file.file_name;

        a.href = URL.createObjectURL(file);
        a.addEventListener("click", (e) => {
          setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
        });
        a.click();
      }
      setLoading(false);
    }
    if (error) console.log(error);
  }, [data, error]);

  useEffect(() => {
    // setFileData(new Blob(message.file.data));
    console.log(message.file.file_hash);
    if (message.type === "Image") {
      setTime(new Date().getTime() / 1000);
      setQueryData(message.file.file_hash);

      // const preview_image = convertBase64ToBlob(
      //   message.file.preview,
      //   message.file.type
      // );

      // setFileData({ data: preview_image, preview: true });
    } else if (message.type === "File") setLoading(false);
    setIsChildReady(true);
  }, []);
  const handleFile = () => {
    setQueryData(message.file.file_hash);
  };

  return React.Children.map(children, (element) => {
    if (!isChildReady) return;
    return React.cloneElement(element, {
      handleClick: handleFile,
      loading: loading,
      progress: 1,
      message: message,
      file_name: message.file.file_name,
      file_size: message.file.file_size,
      image_height: message.file?.height,
      image_file: fileData,
      setSpacing: setSpacing,
      setHover: setHover,
      time: time,
    });
  });
};
