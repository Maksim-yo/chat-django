import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import { useMemo } from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import { peerMessage } from "../../features/chat/chatSlice";
import ImageViewerContext from "./ImageViewerContext";
import ChatHeader from "./header/ChatHeader";
import Footer from "./footer/Footer";
import { DefaultPage } from "./DefaultPage";
import MessageFactory from "./messages/MessageFactory";
import { ScrollButton } from "./ScrollButton";
import roomContext from "./roomContext";
import { useCallback } from "react";
import SocketContext from "./socketContext";
import { markMessagesAsRead } from "../../features/chat/chatSlice";
import {
  get_url_extension,
  get_message_type,
  SUPPORTED_IMAGE_FORMATS,
} from "../../utils/message";

export default function Chat({
  chat_id,
  history,
  unreadCount,
  peers,
  room_name,
  room_email,
  room_info,
  avatar,
  is_temp,
  room_created,
  is_selected,
}) {
  const [imageViewerState, setImageViewerState] = useState({
    isOpen: false,
    currentImage: 0,
    imagesCount: -1,
    images: [],
  });

  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  const [visibleScrollButton, setVisibleScrollButton] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  let first_selected = true;
  const [scrollHeight, setScrollHeight] = useState(0);
  const [firstUnreadMessageIndex, setFirstUnreadMessageIndex] = useState();
  // const { data, error, isError, isSuccess, isLoading } =
  //   useFindChatsQuery("test");

  const user = useSelector((state) => state.auth.userInfo);
  const { sendMessage, lastJsonMessage, readyState } =
    useContext(SocketContext);

  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });

  const scrollToFirstUnreadMessage = () => {
    if (unreadCount > 0) {
      let scroller = document
        .querySelector(".chat-window:not(.d-none)")
        .querySelector(".chat-scroller");
      const messages = scroller.getElementsByClassName("chat-message");
      let unraedMessageIndex = history.length - unreadCount;
      if (unraedMessageIndex > 0) unraedMessageIndex -= 1;
      let currentMessage = messages[unraedMessageIndex];
      scrollRef.current.scrollTop =
        scrollRef.current.scrollTop +
        currentMessage.getBoundingClientRect().top;
    }
  };

  const scrollToBottom = () => {
    const scrollMax =
      scrollRef.current?.scrollHeight - scrollRef.current.clientHeight;

    setMaxScroll(scrollMax);

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    setVisibleScrollButton(false);
  };

  useEffect(() => {
    setScrollHeight(scrollRef.current.scrollHeight);
    if (
      first_selected &&
      is_selected &&
      scrollRef.current.scrollHeight <= scrollRef.current.clientHeight
    )
      readMessages();
    else if (first_selected && is_selected) {
      first_selected = false;
      if (unreadCount > 0) scrollToFirstUnreadMessage();
      else scrollToBottom();
      // scrollHandler();
    }
  }, [is_selected]);

  // scrollRef?.current?.scrollHeight, chat_id
  // const handleScroller = () => {

  // }
  const handleSubmitText = useCallback(
    (text) => {
      dispatch(
        peerMessage({
          chat_id: chat_id,
          line_text: text,
          timestamp: Math.floor(new Date() / 1000),
          type: "Text",
          status: "pending",
          message_hash: uuidv1(),
          peer_email: user.email,
        })
      );
    },
    [chat_id]
  );

  // useEffect(() => {
  //   console.log(chat_id);
  // }, [chat_id]);
  const handleSubmitFile = useCallback(
    (e) => {
      if (!e.target.files[0]?.name) return;
      const type = SUPPORTED_IMAGE_FORMATS.includes(
        get_url_extension(e.target.files[0].name)
      )
        ? "Image"
        : "File";
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        var blob = new Blob([event.target.result], { type: file.type });
        dispatch(
          peerMessage({
            chat_id: chat_id,
            file: {
              id: uuidv1(),
              data: blob,
              file_status: "unloaded",
              name: file.name,
              size: file.size,
              type: file.type,
            },
            message_hash: uuidv1(),
            timestamp: Math.floor(new Date() / 1000),
            type: type,
            status: "pending",
          })
        );
      };
    },
    [chat_id]
  );
  const header = useMemo(() => {
    return (
      <ChatHeader
        room_info={room_info}
        room_email={room_email}
        room_name={room_name}
        avatar={avatar}
      />
    );
  }, [room_info, room_email, room_name, avatar]);

  const readMessages = () => {
    let scroller = document
      .querySelector(".chat-window:not(.d-none)")
      .querySelector(".chat-scroller");

    if (unreadCount === 0) return;
    const messages = scroller.getElementsByClassName("chat-message");
    let unraedMessageIndex = history.length - unreadCount;
    let currentMessage = messages[unraedMessageIndex];
    if (!currentMessage) return;
    let read_messages = [];
    let shoud_add = false;
    while (
      currentMessage &&
      currentMessage.getBoundingClientRect().top + scroller.scrollTop <=
        scroller.scrollTop + scroller.clientHeight
    ) {
      if (unraedMessageIndex >= messages.length) break;
      shoud_add = true;
      read_messages.push(history[unraedMessageIndex]);

      currentMessage = messages[++unraedMessageIndex];
    }
    if (shoud_add && unraedMessageIndex < history.length)
      read_messages.push(history[unraedMessageIndex]);

    if (read_messages.length > 0) {
      markMessagesAsRead({
        chat_id: chat_id,
        messages: read_messages,
      });
      sendMessage(
        JSON.stringify({
          messages: read_messages,
          type: "messages_read",
          chat_id: chat_id,
          peer_email: user.email,
        })
      );
    }
  };

  useEffect(() => {
    if (
      scrollRef.current.clientHeight === scrollRef.current.scrollHeight &&
      is_selected
    )
      readMessages();
    if (
      scrollRef.current.scrollTop + scrollRef.current.clientHeight + 20 >=
      scrollHeight
    )
      scrollToBottom();
  }, [history]);

  const scrollHandler = () => {
    if (
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight >
        scrollRef.current.scrollTop + scrollRef.current.clientHeight ||
      unreadCount > 0
    )
      setVisibleScrollButton(true);
    else setVisibleScrollButton(false);
    readMessages();
  };

  // useEffect(() => {
  //   if (history && scrollRef.current) {
  //     scrollToBottom();
  //   }
  // }, [history]);
  const chatHeader = useMemo(() => {
    return (
      <ChatHeader
        room_info={room_info}
        room_email={room_email}
        room_name={room_name}
        avatar={avatar}
        chat_id={chat_id}
      />
    );
  }, [chat_id]);
  const messages = useMemo(() => {
    return (
      <roomContext.Provider
        value={{
          chat_id,
          room_name,
          room_email,
          room_info,
          peers,
          is_temp,
          room_created,
          avatar,
        }}
      >
        {history?.map((message, index) => {
          const new_message = history[history.length - 1 - index];
          return (
            //
            <MessageFactory
              message={message}
              key={message.message_hash}
              index={index}
            />
          );
        })}
      </roomContext.Provider>
    );
  }, [history]);

  const test = useCallback(() => {
    let a = 5;
    console.log(chat_id);
  }, [chat_id]);

  return (
    <div
      className={
        "col vh-100 no-gutters chat-window " + (is_selected ? "" : "d-none")
      }
      style={{ width: "100%" }}
    >
      <Lightbox
        slides={imageViewerState.images}
        index={imageViewerState.currentImage}
        open={imageViewerState.isOpen}
        close={(e) =>
          setImageViewerState((prevState) => ({
            ...prevState,
            isOpen: false,
          }))
        }
        plugins={[Download]}
      />
      {chat_id &&
        // <Upload>
        chat_id && (
          <>
            {visibleScrollButton && (
              <ScrollButton
                scrollToBottom={scrollToBottom}
                unreadCount={unreadCount}
              />
            )}
            <div
              className="d-flex flex-column h-100"
              style={{ maxWidth: "100%" }}
            >
              <div className="d-flex chat-header">
                <div className="col " style={{ zIndex: 2000 }}>
                  {chatHeader}
                </div>
              </div>
              <div className="col h-100 overflow-hidden ms-2">
                <ul
                  className="h-100 chat-scroller list-unstyled d-flex flex-column ms-1 "
                  id="chat-scroller"
                  style={{ overflowY: "scroll" }}
                  onScroll={scrollHandler}
                  ref={scrollRef}
                >
                  <div className="mt-auto">
                    <ImageViewerContext.Provider
                      value={{
                        imageViewerState,
                        setImageViewerState,
                        setFirstUnreadMessageIndex,
                      }}
                    >
                      {messages}
                    </ImageViewerContext.Provider>
                  </div>
                </ul>
                {/* <div ref={scrollRef}></div> */}
              </div>
              {is_selected && (
                <Footer
                  handleSubmit={handleSubmitText}
                  handleFile={handleSubmitFile}
                />
              )}
            </div>
          </>
          // </Upload>
        )}
    </div>
  );
}
