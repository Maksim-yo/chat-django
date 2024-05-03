import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import ".././chat.css";
import { getMessageStringDate } from "../../../utils/message";
import { changeselectedRoom } from "../../../features/chat/chatSlice";

export const RoomWidget = ({ chat_id, history, unreadCount }) => {
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTimestamp, setlastMessageTimestamp] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (history) {
      console.log(history);
      const message = history[history.length - 1];
      setLastMessage(message.line_text);
      setlastMessageTimestamp(getMessageStringDate(message.timestamp));
    }
  }, [history]);

  const selectedRoomId = useSelector((state) => state.chat.selectedRoomId);

  return (
    <div
      role="link"
      className="room-container p-2 d-flex justify-content-between"
      onClick={() => dispatch(changeselectedRoom(chat_id))}
    >
      <div className="d-flex flex-column ms-3 text-truncate">
        <p className="fw-bold mb-0 text-start " x-text="item.room_name">
          Test
        </p>
        <p className="small text-muted mt-1 text-truncate">{lastMessage}</p>
      </div>
      <div className="pt-1">
        <p className="small text-muted mb-1">{lastMessageTimestamp}</p>
        <template x-if="getChatUnreadMessagesCount(item.id) !== -1">
          <span
            className="badge   float-end"
            x-text="getChatUnreadMessagesCount(item.id)"
          ></span>
        </template>
      </div>
    </div>
  );
};
