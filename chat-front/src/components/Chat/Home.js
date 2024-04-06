import Room from "./Room";
import { useSelector, shallowEqual } from "react-redux";
import Chat from "./Chat";
import "./chat.css";

const Home = () => {
  const isInit = useSelector((state) => state.chat.is_init);
  const rooms = useSelector(
    (state) => state.chat?.rooms?.map((room) => room.chat_id),
    shallowEqual
  );
  return (
    <>
      {isInit && (
        <div class="row g-0" style={{ height: "100%" }}>
          <div class="col-md-3 mb-4 mb-md-0 border boder-2">
            <div class="chatHistory">
              {rooms?.map((room_id) => {
                return <Room chat_id={room_id} />;
              })}
            </div>
          </div>

          <Chat />
        </div>
      )}
    </>
  );
};

// <div class="row g-0" style={{ height: "100%" }}>
//   <div class="col-md-3 mb-4 mb-md-0 border boder-2">
// <Chat />
//   </div>
// </div>

export default Home;
