import React, { useState, useEffect, useContext } from "react";
import SocketContext from "../socketContext";
import { v1 as uuidv1 } from "uuid";
import { useMemo } from "react";
import roomContext from "../roomContext";
import { setFindRoomsToRooms } from "../../../features/chat/chatSlice";
import ReadStatus from "./ReadStatus";
import { getMessageStringDate } from "../../../utils/message";
import { useDispatch, useSelector } from "react-redux";
const Message = ({ children, message }) => {
  const [spacing, setSpacing] = useState(true);
  const [hover, setHover] = useState(false);
  const [messageToSend, setMessageToSend] = useState(null);
  const { sendMessage, lastJsonMessage, readyState } =
    useContext(SocketContext);

  const user = useSelector((state) => state.auth.userInfo);
  const { chat_id, peers, avatar, is_temp, room_created } =
    useContext(roomContext);
  const dispatch = useDispatch();
  const createRoom = () => {
    sendMessage(
      JSON.stringify({
        type: "create_room",
        chat_id: chat_id,
        peers: peers,
        avatar: avatar,
      })
    );
  };

  useEffect(() => {
    if (messageToSend && messageToSend.status === "pending") {
      console.log("aaa");
      console.log(is_temp);
      console.log(messageToSend);

      if (is_temp && !room_created) {
        createRoom();
        dispatch(setFindRoomsToRooms());
      } else if (!is_temp && room_created)
        sendMessage(
          JSON.stringify({
            ...messageToSend,

            // message_id: uuidv1(),
            // chat_id: message.chat_id,
            // timestamp: message.timestamp,
            // line_text: message.line_text,
            // type: "peer_message",
            // file: message.file
            //   ? {
            //       id: message.file.id,
            //       name: message.file.name,
            //       size: message.file.size,
            //       type: message.file.type,
            //     }
            //   : null,
          })
        );
    }
  }, [messageToSend]);

  // console.log("MESSAGE RERENDERS");
  // useEffect(() => {
  //   // setTime(getMessageStringDate(message.timestamp));
  //   // console.log(message);
  //   // console.log(user);
  // }, []);

  const [test, setTest] = useState("WORK");
  useEffect(() => {
    console.log(test);
  }, [test]);
  return React.useMemo(() => {
    console.log("MESSAGE NOT CACHE");

    return (
      <li
        className={
          "chat-message d-flex mb-4 " +
          (user.email !== message.peer_email
            ? "justify-content-end me-2"
            : "justify-content-start")
        }
      >
        <div
          className="card"
          style={{
            borderRadius: "10px",
          }}
        >
          <div
            className={"card-body " + (spacing ? "py-2" : "py-0 px-0")}
            style={{
              maxWidth: "400px",
              borderRadius: "inherit",
              backgroundColor:
                user.email === message.peer_email ? "#89CFF0" : "",
            }}
          >
            <div
              className="d-inline-block  flex-column"
              style={{
                height: "100%",
                position: "relative",
                borderRadius: "inherit",
              }}
            >
              {React.cloneElement(children, {
                setSpacing: setSpacing,
                setHover: setHover,
                setMessageToSend: setMessageToSend,
                message: message,
                test: test,
              })}
              <div
                className={
                  "d-inline-block  align-self-end" + (hover ? " mb-2" : "")
                }
                style={{
                  float: "right",
                  position: hover ? "absolute" : "",
                  bottom: 0,
                  color: hover ? "white" : "",
                  right: 10,
                  backgroundColor: hover ? "rgba(0, 0, 0, 0.3)" : "",

                  borderRadius: "10px",
                  fontWeight: 300,
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="ms-2 ">{message.time}</div>
                  <div className={"ms-2" + (hover ? " me-2" : "")}>
                    {user.email === message.peer_email && (
                      <ReadStatus
                        read_status={message.status}
                        is_read={message.is_read}
                        color_white={message.type === "Image"}
                      ></ReadStatus>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }, [message, spacing, hover, setMessageToSend, test, children]);
};

export default Message;
