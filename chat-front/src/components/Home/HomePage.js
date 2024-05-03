import { useSelector, shallowEqual } from "react-redux";

import "./chat.css";
import { RoomWidget } from "../Chat/room/RoomWidget";
import { RoomWrapper } from "../Chat/room/RoomWrapper";
import LeftMenu from "../LeftMenu/LeftMenu";
import Chat from "../Chat/Chat";

const HomePage = () => {
  const isInit = useSelector((state) => state.chat.is_init);
  const rooms = useSelector(
    (state) => state.chat?.rooms?.map((room) => room.chat_id),
    shallowEqual
  );

  const roomSelectedId = useSelector((state) => state.chat.selectedRoomId);

  return (
    <>
      {isInit && (
        <div className="row g-0" style={{ height: "100%" }}>
          <div className="col-md-3 mb-4 mb-md-0 border boder-2">
            <LeftMenu />

            <div className="chatHistory">
              {rooms?.map((room_id, key) => {
                return (
                  <RoomWrapper chat_id={room_id} key={key}>
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

export default HomePage;
