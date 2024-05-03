import { useSelector } from "react-redux";
import store from "../../app/store";
import axios from "axios";

const url = "http://127.0.0.1:8000/storage/upload/";
export const upload = (file, chat_id, options) => {
  const state = store.getState();
  const token = state.auth.userToken;

  const onProgress = options?.onProgress;
  const onLoad = options?.onLoad;
  const promise = new Promise((resolve, reject) => {
    let config = {
      headers: {
        authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onDownloadProgress: (event) => {
        console.log("completed: ", event);

        onProgress?.(Math.round((event.loaded / event.total) * 100));
        onLoad(event.loaded);
        // console.log(event);
      },
    };

    // xhr.onload = () => {
    //   if (xhr.status === 200) resolve(xhr.response);
    //   else reject(xhr.response);
    // };

    const myData = new FormData();
    myData.append("file", file);
    myData.append("chat_id", chat_id);
    axios.post(url, myData, config);
  });

  promise.abort = () => axios.abort();

  return promise;
};
