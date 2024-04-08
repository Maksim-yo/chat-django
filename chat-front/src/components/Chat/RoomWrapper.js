import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import { Children } from "react";

export const RoomWrapper = ({ children, chat_id }) => {
  const [unreadCount, setUndreadCount] = useState(0);

  const room = useSelector(
    (state) => state.chat.rooms?.find((room) => room.chat_id === chat_id),
    shallowEqual
  );

  useEffect(() => {
    console.log("room chahnge!");
    setUndreadCount(10);
  }, []);
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      chat_id: chat_id,
      history: room?.history,
      peers: room?.peers,
      unreadCount: unreadCount,
    })
  );

  return <>{childrenWithProps}</>;
};
