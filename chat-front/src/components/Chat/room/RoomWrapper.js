import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
export const RoomWrapper = ({ children, room, selectedRoomId }) => {
  const [unreadCount, setUndreadCount] = useState(0);
  const user_email = useSelector((state) => state.auth.userInfo.email);
  // useEffect(() => {
  //   // setUndreadCount(10);
  //   console.log(room);
  //   for (let i = room.history.length - 1; i >= 0; i--) {
  //     if (i - 1 >= 0 && room.history[i].peer_email === user_email) {
  //       setUndreadCount(room.history.length - i - 1);
  //       return;
  //     }
  //   }

  //   console.log(room.history.length);
  //   setUndreadCount(room.history.length);
  // }, [room.unread_count]);
  // console.log(selectedRoomId === room.chat_id);
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      chat_id: room?.chat_id,
      history: room?.history,
      peers: room?.peers,
      unreadCount: room?.unread_count,
      room_name: room?.room_name,
      room_info: room?.room_info,
      room_email: room?.room_email,
      avatar: room?.avatar,
      is_selected: selectedRoomId === room?.chat_id ? true : false,
      is_temp: room?.is_temp ? true : false,
      room_created: room?.room_created ? true : false,
    })
  );

  return <>{childrenWithProps}</>;
};
