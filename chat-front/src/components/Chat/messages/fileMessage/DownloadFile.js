import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeFileStatus } from "../../../../features/chat/chatSlice";
import { useGetFileQuery } from "../../../../app/services/api/apiService";

export const DownloadFile = ({ children, message, setSpacing, setHover }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState("");
  const { data, error, isLoading } = useGetFileQuery(message.file.file_hash);
  const [isChildReady, setIsChildReady] = useState(false);

  const onLoaded = () => {
    // dispatch(
    //   changeFileStatus({
    //     chat_id: message.chat_id,
    //     file_id: message.file_id,
    //     file_status: "loaded",
    //   })
    // );
  };

  const toBinary = (string) => {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
  };

  function decodeBase64(base64) {
    const text = atob(base64);
    const length = text.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = text.charCodeAt(i);
    }
    return bytes;
  }

  const convertBase64ToBlob = (data, type) => {
    const result_binary = decodeBase64(data);
    return new Blob([result_binary], { type: type });
  };

  console.log("init");
  const donwload = () => {};

  useEffect(() => {
    console.log("DOWNLOADING");
    if (data) {
      const json_data = JSON.parse(data);

      const image = convertBase64ToBlob(json_data.data, message.file.file_type);
      console.log(image.size);
      console.log(image);
      console.log(message);

      setFileData(image);
      setLoading(false);
    }
    if (error) console.log(error);
  }, [data, error]);

  useEffect(() => {
    // setFileData(new Blob(message.file.data));
    const preview_image = convertBase64ToBlob(
      message.file.preview,
      message.file.type
    );
    console.log("BASE");
    console.log(preview_image.size);
    setFileData(preview_image);
    setIsChildReady(true);
  }, []);
  const handleFile = (file_hash) => {
    // if (!isLoading && !error) {
    //   getFile();
    // }
    // setLoading(true);
    // const uploading = upload(file, { onProgress: setProgress });
    // uploading.catch((e) => {}).finally(onLoaded);
  };

  return React.Children.map(children, (element) => {
    if (!isChildReady) return;
    return React.cloneElement(element, {
      handleClick: handleFile(message.file_hash),
      loading: loading,
      progress: 1,
      file_name: message.file.file_name,
      file_size: message.file.file_size,
      image_file: fileData,
      setSpacing: setSpacing,
      setHover: setHover,
    });
  });
};
