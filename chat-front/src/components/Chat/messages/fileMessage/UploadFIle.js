import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React from "react";
import { usePostFileMutation } from "../../../../app/services/api/apiService";
import { changeFileStatus } from "../../../../features/chat/chatSlice";
// import { upload } from "../../../../features/upload/upload";
export const UploadFile = ({
  children,
  message,
  setSpacing,
  setHover,
  setMessageToSend,
}) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const [postFile, { data, error, isLoading }] = usePostFileMutation();

  const dispatch = useDispatch();

  const onLoaded = (data) => {
    console.log("DATA CHAGEN");
    console.log(data);
    console.log(data.data);
    dispatch(
      changeFileStatus({
        chat_id: message.chat_id,
        file_id: message.file.id,
        file_hash: data.data.file_hash,
      })
    );
    let new_message = JSON.parse(JSON.stringify(message));

    new_message.file.hash = data.data.file_hash;
    delete new_message.file.id;
    delete new_message.file.file_status;
    delete new_message.file.data;
    setLoading(false);
    setMessageToSend({ ...new_message, type: "peer_message" });
  };

  const upload = (file, chat_id) => {
    console.log(file.data);
    console.log(message);
    var formData = new FormData();
    formData.append("data", file.data);
    formData.append("name", file.name);
    formData.append("file_type", file.type);
    formData.append("file_size", file.size);

    formData.append("chat_id", message.chat_id);
    postFile(formData)
      .then((data) => {
        onLoaded(data);
      })
      .catch((exc) => console.log(exc));
  };

  useEffect(() => {
    console.log(message);
    setLoading(true);
    setProgress(1);
    upload(message.file, message.chat_id);
  }, []);

  const handleCancel = () => {};

  return React.Children.map(children, (element) => {
    return React.cloneElement(element, {
      handleClick: handleCancel,
      loading: loading,
      progress: progress,
      file_name: message.file.name,
      file_size: message.file.size,
      image_file: message.file.data,
      setSpacing: setSpacing,
      setHover: setHover,
    });
  });
};
