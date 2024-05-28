import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import ".././chat.css";
import { getMessageStringDate } from "../../../utils/message";
import { changeselectedRoom } from "../../../features/chat/chatSlice";
import { useGetFileQuery } from "../../../app/services/api/apiService";
import { convertBase64ToBlob } from "../../../utils/message";
export const RoomWidget = ({
  avatar,
  chat_id,
  history,
  unreadCount,
  room_name,
}) => {
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTimestamp, setlastMessageTimestamp] = useState("");
  const [image, setImage] = useState(null);

  const { data, error, isError, isSuccess, isLoading } =
    useGetFileQuery(avatar);
  useEffect(() => {
    if (data) {
      const json_data = JSON.parse(data);
      const file = convertBase64ToBlob(json_data.data, "image/jpeg");
      setImage(URL.createObjectURL(file));
    }
  }, [data]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (history) {
      const message = history[history.length - 1];
      console.log(message);

      const last_data = message?.line_text
        ? message.line_text
        : message?.type + ": " + message?.file?.file_name;
      setLastMessage(last_data);
      setlastMessageTimestamp(getMessageStringDate(message?.timestamp));
    }
  }, [history]);

  const selectedRoomId = useSelector((state) => state.chat.selectedRoomId);

  return (
    <div
      role="link"
      className="room-container p-2 d-flex "
      onClick={() => dispatch(changeselectedRoom(chat_id))}
      style={{
        cursor: "pointer",
      }}
    >
      <div className="d-flex">
        <img
          className="rounded-circle  shadow-1-strong "
          width="58"
          height="58"
          src={image}
        />
      </div>
      <div className="d-flex flex-column ms-3 text-truncate flex-grow-1">
        <p className="fw-bold mb-0 text-start ">{room_name}</p>
        <p className="small text-muted mt-1 text-truncate">{lastMessage}</p>
      </div>
      <div className="pt-1 ">
        <p className="small text-muted my-0 py-0 ">{lastMessageTimestamp}</p>
        <p className="badge bg-info ms-2">
          {unreadCount > 0 ? unreadCount : ""}
        </p>
      </div>
    </div>
  );
};
