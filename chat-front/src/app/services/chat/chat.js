import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { setInitialRooms } from "../../../features/chat/chatSlice";

import Room from "../../../components/Chat/Room";
import Home from "../../../components/Chat/Home";

let CODE_PEER_MESSAGE = 1;
let CODE_INFO = 2;
let CODE_PEER_ONLINE = 3;
let CODE_PEER_OFFLINE = 4;
let CODE_PEER_IS_TYPING = 5;
let CODE_PEER_READ = 6;
let CODE_PEER_DELIVERED = 7;

export const Chat = () => {
  const dispatch = useDispatch();

  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws/");
  const [messageHistory, setMessageHistory] = useState([]);

  const token = useSelector((state) => state.auth.userToken);

  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    protocols: ["auth_protocol", "Token_" + token],
    onError: (event) => console.log(event),
  });

  const rooms = useSelector((state) => {
    if ("rooms" in state.chat && state.chat.rooms) {
      return state.chat.rooms;
    }
  }, shallowEqual);

  useEffect(() => {
    console.log(lastJsonMessage);
    if (!lastJsonMessage) return;
    switch (lastJsonMessage.type) {
      case CODE_INFO:
        dispatch(setInitialRooms(lastJsonMessage));
        break;
      case CODE_PEER_MESSAGE:
        break;
      default:
        break;
    }
    // if (lastJsonMessage !== null) {
    //   setMessageHistory((prev) => prev.concat(lastJsonMessage));
    // }
  }, [lastJsonMessage, dispatch]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return <Home />;
};
