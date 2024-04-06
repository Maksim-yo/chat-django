import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { peerMessage } from "../../features/chat/chatSlice";
import { useGetUserDetailsQuery } from "../../app/services/api/apiService";

export default function Chat() {
  const dispatch = useDispatch();
  const room = useSelector(
    (state) =>
      state.chat.rooms.find((room) => room.chat_id === state.chat.selectedRoom),
    shallowEqual
  );

  const scrollRef = useRef(null);

  const [messageHistory, setMessageHistory] = useState([]);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });

  //   const {
  //     data: user,
  //     isLoading,
  //     isSuccess,
  //     isError,
  //     error,
  //   } = useGetUserDetailsQuery();

  useEffect(() => {
    console.log("chat");
    const scrollMax =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

    scrollRef.current.scrollTop = scrollMax;
    setMaxScroll(scrollMax);
    // console.log(user);
    // console.log(error);
  }, [room, scrollRef, setMaxScroll]);

  const handleSubmit = (e) => {
    dispatch(
      peerMessage({
        chat_id: 1,
        line_text: e.target.value,
        timestamp: Math.floor(new Date() / 1000),
      })
    );
  };

  const scrollHandler = (e) => {
    if (scrollRef.current) {
      const { scrollTop, scrollLeft } = scrollRef.current;
      console.log(scrollRef.current.scrollTop);
    }
  };
  return (
    <div class="col h-100 no-gutters ">
      <div class="d-flex flex-column h-100">
        <ul
          class="chat-scroller list-unstyled d-flex flex-column ms-1 mt-1"
          id="chat-scroller"
          style={{ height: "90%", "overflow-y": "scroll" }}
          onScroll={scrollHandler}
          ref={scrollRef}
        >
          <div class="mt-auto">
            {room.history.map((message, index) => {
              return <Message key={index} data={message} />;
            })}

            <div>
              <template x-if="$store.scrollChatButton.visible">
                <a
                  type="button"
                  class="rounded-circle"
                  id="scroll-chat-btn-bottom"
                  // style="position: absolute; left: 94%; bottom: 15%; background-color: gainsboro; animation-duration: 3s;"
                >
                  <div
                    class="d-flex container justify-content-center align-items-center rounded-circle"
                    // style="position: relative; height: 50px; width: 50px;"
                  >
                    <img class="" src="assets/down-arrow-chat.png" width="25" />
                    <template x-if="getChatUnreadMessagesCount() !== -1">
                      <div
                        class="d-flex rounded-circle align-items-center justify-content-center"
                        // style="color: white; background-color: rgb(88, 139, 175); width: 30px; height: 30px; margin-left: 65%; margin-bottom: 65%; position: absolute;"
                      >
                        <span x-text="getChatUnreadMessagesCount()"></span>
                      </div>
                    </template>
                  </div>
                </a>
              </template>
            </div>
          </div>
          {false && (
            <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
              <div
                class="rounded-5 p-1"
                style={{ "background-color": "#ced4da" }}
              >
                Select a chat to start start messaging
              </div>
            </div>
          )}
        </ul>

        <textarea
          class="form-control mb-1"
          id="chatTextArea"
          rows="3"
          onKeyDown={handleSubmit}
        >
          d
        </textarea>
      </div>
      {/* </template> */}
    </div>
  );
}
