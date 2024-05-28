import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { usePostFileMutation } from "../../../../app/services/api/apiService";
import { changeFileStatus } from "../../../../features/chat/chatSlice";
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
  const [file, setFile] = useState();
  const [image, setImage] = useState({
    data: message.file.data,
    preview: false,
  });
  const dispatch = useDispatch();

  const onLoaded = (data) => {
    console.log(data);
    console.log(message);
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
    setMessageToSend({ ...new_message, type: 1 });
  };

  const upload = (file, chat_id) => {
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
      image_file: image,
      setSpacing: setSpacing,
      setHover: setHover,
    });
  });
};
