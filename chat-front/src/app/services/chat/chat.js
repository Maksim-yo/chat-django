import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFindRoomsToRooms } from "../../../features/chat/chatSlice";
import {
  setInitialRooms,
  changeMessageStatus,
  changeChatId,
  peerMessage,
} from "../../../features/chat/chatSlice";
import store from "../../store";
import SocketContext from "../../../components/Chat/socketContext";
import HomePage from "../../../components/Home/HomePage";
import { markMessagesAsRead } from "../../../features/chat/chatSlice";
import Header from "../../../components/Header/Header";
import { useGetUserDetailsQuery } from "../api/apiService";
import { setCredentials, setAuthError } from "../../../features/auth/authSlice";
let CODE_PEER_MESSAGE = 1;
let CODE_INFO = 2;
let CODE_MESSAGE_ACK = 3;
let CODE_ROOM_CREATED = 4;
// let CODE_PEER_ONLINE = 3;
// let CODE_PEER_OFFLINE = 4;
// let CODE_PEER_IS_TYPING = 5;
let CODE_PEER_READ = 5;
// let CODE_PEER_DELIVERED = 7;
export const Chat = () => {
  const dispatch = useDispatch();

  const [socketUrl, setSocketUrl] = useState("ws://localhost:8000/ws/");
  const [messageToSend, setMessageToSend] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userToken);
  const [waitingRoomId, setWaitingRoomId] = useState("");

  const room = useSelector((state) =>
    state.chat.rooms?.filter((room) => room.chat_id === waitingRoomId)
  );
  // useEffect(() => {

  // }, [token])
  const { sendMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    protocols: ["auth_protocol", "Token_" + token],
    onError: (event) => {
      dispatch(
        setAuthError({
          status: 401,
          data: {
            message: "Unauthorize ",
          },
        })
      );
      navigate("login");
    },
  });
  useEffect(() => {
    if (room && waitingRoomId) {
      console.log(room[0]);
      setWaitingRoomId("");
      for (const message of room[0].history) {
        if (message.status === "pending")
          sendMessage(JSON.stringify({ ...message, type: "peer_message" }));
      }
    }
  }, [room]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    console.log(lastJsonMessage);
    const state = store.getState();
    const user = state.auth.userInfo;

    switch (lastJsonMessage.type) {
      case CODE_INFO:
        console.log("settings");
        console.log(user);
        dispatch(setInitialRooms({ message: lastJsonMessage, user: user }));
        break;
      case CODE_PEER_MESSAGE:
        if (lastJsonMessage.peerName === user.email) break;
        dispatch(
          peerMessage({
            ...lastJsonMessage.message,
          })
        );

        break;
      case CODE_PEER_READ:
        if (lastJsonMessage.peerName === user.email) break;

        dispatch(markMessagesAsRead({ ...lastJsonMessage }));
        break;
      case CODE_MESSAGE_ACK:
        dispatch(changeMessageStatus({ ...lastJsonMessage, status: "unread" }));
        break;
      case CODE_ROOM_CREATED:
        console.log("CREATED");
        console.log(lastJsonMessage);
        dispatch(changeChatId({ ...lastJsonMessage }));
        setWaitingRoomId(lastJsonMessage.chat_id);

        break;

      default:
        break;
    }
  }, [lastJsonMessage, dispatch]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      <HomePage />
    </SocketContext.Provider>
  );
};
