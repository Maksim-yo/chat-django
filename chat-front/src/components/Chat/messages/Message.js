import React, { useState, useEffect, useContext } from "react";
import SocketContext from "../socketContext";
import { getMessageStringDate } from "../../../utils/message";
import { v1 as uuidv1 } from "uuid";

import { ReadStatus } from "./ReadStatus";
export default function Message({ children, message }) {
  const [spacing, setSpacing] = useState(true);
  const [hover, setHover] = useState(false);
  const [messageToSend, setMessageToSend] = useState(null);
  const { sendMessage, lastJsonMessage, readyState } =
    useContext(SocketContext);
  useEffect(() => {
    if (messageToSend && messageToSend.status === "pending") {
      console.log("SENDING");
      sendMessage(
        JSON.stringify({
          ...messageToSend,
          message_id: uuidv1(),

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
  return (
    <li className="chat-message d-flex mb-4">
      <div className="card" style={{ "border-radius": "10px" }}>
        <div
          className={"card-body " + (spacing ? "py-2" : "py-0 px-0")}
          style={{
            "max-width": "400px",
            borderRadius: "inherit",
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
                "font-weight": 300,
              }}
            >
              <div className="d-flex align-items-center">
                <div className="ms-2 ">12:44</div>
                <div className={"ms-2" + (hover ? " me-2" : "")}>
                  <ReadStatus
                    read_status={message.status}
                    is_read={message.is_read}
                    color_white={message.type !== "Text"}
                  ></ReadStatus>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
