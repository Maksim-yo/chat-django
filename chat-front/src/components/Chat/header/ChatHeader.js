import { RoomInfo } from "../room/RoomInfo";
import React, { useEffect, useState } from "react";

import { useGetFileQuery } from "../../../app/services/api/apiService";
import { convertBase64ToBlob } from "../../../utils/message";
export default React.memo(function ChatHeader({
  room_name,
  room_info,
  room_email,
  avatar,
}) {
  const [image, setImage] = useState(null);
  console.log("HEADER");
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
        data-bs-target="#createModel"
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
        title={"User Info"}
        user_email={room_email}
        user_info={room_info}
        user_name={room_name}
        image={image}
      />
    </>
  );
});
