import { RoomInfo } from "../room/RoomInfo";
export default function ChatHeader({ room_name, room_info }) {
  return (
    <div
      class="chat-header"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#createModel"
    >
      <div class="row no-gutters g-0">
        <div class="left-chat-info col ms-3">
          <div class="chat-name">{room_name}</div>
          <div class="chat-info">{room_info}</div>
        </div>
      </div>
      <RoomInfo title={"User Info"} user_email={"lyzlov023@gmail.com"} />
    </div>
  );
}
