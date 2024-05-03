import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";

import { useEffect, useState, useRef, useContext } from "react";
import { v1 as uuidv1 } from "uuid";
import { peerMessage } from "../../features/chat/chatSlice";
import slides from "./temp";
import ImageViewerContext from "./ImageViewerContext";
import { useGetUserDetailsQuery } from "../../app/services/api/apiService";
import ChatHeader from "./header/ChatHeader";
import { Upload } from "./Upload";
import { Footer } from "./footer/Footer";
import { DefaultPage } from "./DefaultPage";
import { MessageFactory } from "./messages/MessageFactory";

import SocketContext from "./socketContext";
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
  room_info,
}) {
  const [imageViewerState, setImageViewerState] = useState({
    isOpen: false,
    currentImage: 0,
    imagesCount: -1,
    images: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);

  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  const [messageHistory, setMessageHistory] = useState([]);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPosition, setScrollPosition] = useState({
    scrollTop: 0,
    scrollLeft: 0,
  });

  useEffect(() => {
    console.log(history);
    if (chat_id) {
      const scrollMax =
        scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

      scrollRef.current.scrollTop = scrollMax;
      setMaxScroll(scrollMax);
    }
  }, [history, scrollRef, setMaxScroll, chat_id]);

  useEffect(() => {
    console.log("IMAGE STATE");
    console.log(imageViewerState);
  }, [imageViewerState]);

  const handleSubmitText = (text) => {
    dispatch(
      peerMessage({
        chat_id: chat_id,
        line_text: text,
        timestamp: Math.floor(new Date() / 1000),
        type: "Text",
        status: "pending",
      })
    );
  };

  const handleSubmitFile = (e) => {
    const type = SUPPORTED_IMAGE_FORMATS.includes(
      get_url_extension(e.target.files[0].name)
    )
      ? "Image"
      : "File";
    const file = e.target.files[0];
    const fileReader = new FileReader();
    console.log(file);

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
          timestamp: Math.floor(new Date() / 1000),
          type: type,
          status: "pending",
        })
      );
    };
  };

  const scrollHandler = (e) => {
    if (scrollRef.current) {
      const { scrollTop, scrollLeft } = scrollRef.current;
    }
  };
  return (
    <div className="col vh-100 no-gutters " style={{ width: "100%" }}>
      <Lightbox
        slides={imageViewerState.images}
        index={imageViewerState.currentImage}
        open={imageViewerState.isOpen}
        close={(e) =>
          setImageViewerState((prevState) => ({ ...prevState, isOpen: false }))
        }
        plugins={[Download]}
      />
      {chat_id && (
        <Upload>
          {chat_id && (
            <div
              className="d-flex flex-column h-100 "
              style={{ "max-width": "100%" }}
            >
              <div
                className="d-flex"
                style={{ minHeight: "8%", maxHeight: "8%" }}
              >
                <div className="col">
                  <ChatHeader room_info={room_info} room_name={room_name} />
                </div>
              </div>
              <div className="col h-100 overflow-hidden ms-2">
                <ul
                  className="h-100 chat-scroller list-unstyled d-flex flex-column ms-1 mt-1 align-items-start"
                  id="chat-scroller"
                  style={{ overflowY: "scroll" }}
                  onScroll={scrollHandler}
                  ref={scrollRef}
                >
                  <div className="mt-auto">
                    {history.map((message, index) => {
                      console.log(message);
                      if (!message?.type) {
                        const message_type = get_message_type(message);
                        message = Object.assign(
                          { type: message_type },
                          message
                        );
                      }
                      return (
                        <ImageViewerContext.Provider
                          value={{ imageViewerState, setImageViewerState }}
                          key={index}
                        >
                          <MessageFactory message={message} index={index} />
                        </ImageViewerContext.Provider>
                      );
                    })}
                  </div>
                </ul>
              </div>
              <Footer
                handleSubmit={handleSubmitText}
                handleFile={handleSubmitFile}
              />
            </div>
          )}
        </Upload>
      )}
      {!chat_id && <DefaultPage />}
    </div>
  );
}
