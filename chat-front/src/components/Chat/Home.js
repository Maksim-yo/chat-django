import Room from "./Room";
import { useSelector, shallowEqual } from "react-redux";
import Chat from "./Chat";
import "./chat.css";
import LeftMenu from "./LeftMenu";
import { useEffect } from "react";
import { RoomWrapper } from "./RoomWrapper";
import { RoomWidget } from "./RoomWidget";
const Home = () => {
  const isInit = useSelector((state) => state.chat.is_init);
  const rooms = useSelector(
    (state) => state.chat?.rooms?.map((room) => room.chat_id),
    shallowEqual
  );

  const roomSelectedId = useSelector((state) => state.chat.selectedRoomId);

  return (
    <>
      {isInit && (
        <div class="row g-0" style={{ height: "100%" }}>
          <div class="col-md-3 mb-4 mb-md-0 border boder-2">
            <LeftMenu />

            <div class="chatHistory">
              {rooms?.map((room_id) => {
                return (
                  <RoomWrapper chat_id={room_id}>
                    <RoomWidget />
                  </RoomWrapper>
                );
              })}
            </div>
          </div>

          <RoomWrapper chat_id={roomSelectedId}>
            <Chat />
          </RoomWrapper>
        </div>
      )}
    </>
  );
};

export default Home;
