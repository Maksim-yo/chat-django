import "./chat.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import { getMessageStringDate } from "../../utils/message";

const Room = ({ chat_id }) => {
  const [unreadCount, setUndreadCount] = useState(0);
  const [lastMessage, setLastMessage] = useState("Hello");
  const [lastMessageTimestamp, setlastMessageTimestamp] = useState("");
  const history = useSelector(
    (state) =>
      state.chat.rooms?.map((room) => {
        console.log("chat");
        if (room.chat_id === chat_id) return room.history;
      }),
    shallowEqual
  );

  useEffect(() => {
    console.log("ddd");
    console.log(history);
    if (history) {
      console.log("aaa");
      console.log(history[0]);
      const message = history[0][history[0].length - 1];
      setLastMessage(message.line_text);
      setlastMessageTimestamp(getMessageStringDate(message.timestamp));
    }
  }, [history]);

  return (
    <div role="link" class="room-container p-2 d-flex justify-content-between">
      <div class="d-flex flex-column ms-3 text-truncate">
        <p class="fw-bold mb-0 text-start " x-text="item.room_name">
          Test
        </p>
        <p class="small text-muted mt-1 text-truncate">{lastMessage}</p>
      </div>
      <div class="pt-1">
        <p class="small text-muted mb-1">{lastMessageTimestamp}</p>
        <template x-if="getChatUnreadMessagesCount(item.id) !== -1">
          <span
            class="badge   float-end"
            x-text="getChatUnreadMessagesCount(item.id)"
          ></span>
        </template>
      </div>
    </div>
  );
};

export default Room;
