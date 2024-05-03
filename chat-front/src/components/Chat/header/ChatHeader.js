import { RoomInfo } from "../room/RoomInfo";
export default function ChatHeader({ room_name, room_info }) {
  return (
    <div
      className="chat-header"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#createModel"
    >
      <div className="row no-gutters g-0">
        <div className="left-chat-info col ms-3">
          <div className="chat-name">room_name</div>
          <div className="chat-info">room_info</div>
        </div>
      </div>
      <RoomInfo title={"User Info"} user_email={"lyzlov023@gmail.com"} />
    </div>
  );
}
