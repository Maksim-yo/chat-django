import { RoomInfo } from "../room/RoomInfo";
import React, { useEffect, useState } from "react";

import { useGetFileQuery } from "../../../app/services/api/apiService";
import { convertBase64ToBlob } from "../../../utils/message";
export default function ChatHeader({
  room_name,
  room_info,
  room_email,
  avatar,
  chat_id,
}) {
  const [image, setImage] = useState(null);
  console.log(chat_id);
  const modal_id = `createModel_${chat_id}`;
  const bs_target = `#${modal_id}`;
  const { data, error, isError, isSuccess, isLoading } =
    useGetFileQuery(avatar);

  useEffect(() => {
    if (data) {
      try {
        const json_data = JSON.parse(data);

        const file = convertBase64ToBlob(json_data.data, "image/jpeg");
        setImage(URL.createObjectURL(file));
      } catch (error) {
        setImage("");
      }
    }
  }, [data]);
  return (
    <>
      <div
        className=""
        type="button"
        data-bs-toggle="modal"
        data-bs-target={bs_target}
        onClick={console.log(room_name)}
      >
        <div className="row no-gutters g-0">
          <div className="d-flex flex-row align-items-center">
            <img
              className="rounded-circle  shadow-1-strong ms-3"
              width="40"
              height="40"
              src={image}
            />
            <div className="left-chat-info col ms-3">
              <div className="chat-name">{room_name}</div>
              <div className="chat-info">{room_info}</div>
            </div>
          </div>
        </div>
      </div>
      <RoomInfo
        title={"Информация о пользователе"}
        user_email={room_email}
        user_info={room_info}
        user_name={room_name}
        image={image}
        chat_id={chat_id}
        modal_id={modal_id}
      />
    </>
  );
}
