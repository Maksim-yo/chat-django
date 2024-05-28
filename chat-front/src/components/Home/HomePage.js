import { useSelector, shallowEqual } from "react-redux";

import "./chat.css";
import { RoomWidget } from "../Chat/room/RoomWidget";
import React from "react";
import { RoomWrapper } from "../Chat/room/RoomWrapper";
import { User } from "../Chat/room/User";
import LeftMenu from "../LeftMenu/LeftMenu";
import Chat from "../Chat/Chat";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { combineSlices } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { DefaultPage } from "../Chat/DefaultPage";
const HomePage = () => {
  const [room, setRoom] = useState(null);

  const isInit = useSelector((state) => state.chat.is_init);
  const rooms = useSelector((state) => state.chat.rooms);
  const findResults = useSelector((state) => state.chat.findResult);
  const roomSelectedId = useSelector((state) => state.chat.selectedRoomId);
  const selectedFindRoom = useSelector((state) => state.chat.selectedFindRoom);
  useEffect(() => {
    if (selectedFindRoom) setRoom(selectedFindRoom);
    else if (rooms) {
      const obj = rooms.find((room) => room.chat_id === roomSelectedId);
      setRoom(obj);
      console.log(obj);
    }
  }, [rooms, roomSelectedId, selectedFindRoom]);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const roomWidgets = useMemo(
    () =>
      rooms?.map((item, key) => {
        return (
          <RoomWrapper room={item} key={key} selectedRoomId={roomSelectedId}>
            <RoomWidget />
          </RoomWrapper>
        );
      }),
    [rooms]
  );

  const leftMenuMemo = useMemo(() => <LeftMenu />, [userInfo]);
  const roomChats = useMemo(() => {
    if (selectedFindRoom) {
      return (
        <RoomWrapper
          room={selectedFindRoom}
          selectedRoomId={selectedFindRoom.chat_id}
        >
          <Chat />
        </RoomWrapper>
      );
    }

    return rooms?.map((room, key) => {
      return (
        <RoomWrapper
          key={room.chat_id}
          room={room}
          selectedRoomId={roomSelectedId}
        >
          <Chat />
        </RoomWrapper>
      );
    });
  }, [roomSelectedId, rooms, selectedFindRoom]);

  return (
    <div className="col vh-100">
      {isInit && (
        <div className="row g-0 vh-100">
          <div className="col-md-3  mb-md-0 border boder-2 vh-100 ">
            <div
              className="d-flex flex-column h-100 "
              style={{ maxWidth: "100%" }}
            >
              {leftMenuMemo}

              <div
                className="chatHistory h-100 "
                style={{ overflowY: "scroll" }}
              >
                {!findResults && roomWidgets}
                {findResults &&
                  findResults?.map((room, key) => {
                    return <User user={room} />;
                  })}
              </div>
            </div>
          </div>
          {roomSelectedId === null && (
            <div
              className={"col vh-100 no-gutters chat-window "}
              style={{ width: "100%" }}
            >
              <DefaultPage />
            </div>
          )}
          {roomChats};
        </div>
      )}
    </div>
  );
};

export default React.memo(HomePage);
