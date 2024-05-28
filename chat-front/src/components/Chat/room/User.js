import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { v1 as uuidv1 } from "uuid";

import ".././chat.css";
import {
  changeselectedRoom,
  createFindRoom,
} from "../../../features/chat/chatSlice";
import { convertBase64ToBlob } from "../../../utils/message";
import { useGetFileQuery } from "../../../app/services/api/apiService";

export const User = ({ user }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const clientEmail = useSelector((state) => state.auth.userInfo.email);
  const { data, error, isError, isSuccess, isLoading } = useGetFileQuery(
    user.avatar
  );

  const selectedRoomId = useSelector((state) => state.chat.selectedRoomId);
  useEffect(() => {
    if (data) {
      try {
        const json_data = JSON.parse(data);
        const file = convertBase64ToBlob(json_data.data, "image/jpeg");
        setImage(URL.createObjectURL(file));
      } catch (Error) {}
    }
  }, [data]);
  return (
    <div
      role="link"
      className="room-container p-2 d-flex "
      onClick={() => {
        const chat_id = uuidv1();
        dispatch(changeselectedRoom(chat_id));
        dispatch(
          createFindRoom({
            chat_id: chat_id,
            peers: [clientEmail, user.email],
            room_name: user.nickname,
            room_info: "last been recently",
            room_email: user.email,
            avatar: user.avatar,
            history: [],
            is_temp: true,
            room_created: false,
          })
        );
      }}
    >
      <div>
        <img
          className="rounded-circle  shadow-1-strong "
          width="58"
          src={image}
        />
      </div>
      <div className="d-flex flex-column ms-3 text-truncate">
        <p className="fw-bold mb-0 text-start ">{user.nickname}</p>
        <p className="small  mt-1 text-truncate text-primary">{user.email}</p>
      </div>
    </div>
  );
};
