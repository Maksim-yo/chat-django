import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../Chat/chat.css";
import Search from "./Search";
import SettingsModal from "./SettingsIModal";
import { EditNameModal } from "./EditNameModal";
import { useGetUserDetailsQuery } from "../../app/services/api/apiService";
import { useGetFileQuery } from "../../app/services/api/apiService";
import { convertBase64ToBlob } from "../../utils/message";
import { skipToken } from "@reduxjs/toolkit/query";
import { UserIcon } from "./UserIcon.1";
import React from "react";
import { useSelector } from "react-redux";
const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutClick, setLogoutClick] = useState(false);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [image_hash, setImageHash] = useState(skipToken);

  const { data, isFetching } = useGetUserDetailsQuery();

  const {
    data: imageData,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useGetFileQuery(image_hash);
  useEffect(() => {
    if (imageData) {
      const json_data = JSON.parse(imageData);
      const file = convertBase64ToBlob(json_data.data, "image/jpeg");
      setImage(URL.createObjectURL(file));
    }
  }, [imageData]);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setIsOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, [isOpen]);
  useEffect(() => {
    if (data) {
      setUsername(data.nickname);
      setImageHash(data.avatar);
    }
  }, [data]);

  useEffect(() => {
    if (logoutClick) logoutClick = false;
  }, [logoutClick]);

  const handleLogoutClick = () => {
    setLogoutClick(true);
  };

  //   const nickaname = useSelector((state) => state.chat.userInfo?.nickaname);
  //   const nickaname = "Hello";

  return (
    <div className="d-flex menu  d-flex justify-content-center flex-grow-1">
      <div className="input-group rounded mb-2 mt-3">
        <div className="navBar">
          <button
            type="button"
            className={"btn ms-3  px-0 py-0 my-0 " + (isOpen ? "disable" : "")}
            id="menu-button"
            onClick={(e) => setIsOpen(true)}
            style={{
              visibility: isOpen ? "hidden" : "visible",
            }}
          >
            <img src="/assets/menu-icon.png" width="40" />
          </button>
          <div
            id="mySidenav"
            className="sidenav list-unstyled mb-0"
            style={{ width: (isOpen ? 250 : 0) + "px" }}
          >
            <div className="d-flex flex-row ms-3">
              <div
                className="d-flex"
                style={{ position: "relative", display: "block" }}
              >
                {/* <img
                  src={image}
                  alt="avatar"
                  className="rounded-circle  shadow-1-strong ms-3"
                  width="58"
                /> */}
                <UserIcon image={image} />
              </div>
              <div className="pt-1 ms-3">
                <p className="fw-bold mb-0">{username}</p>
              </div>
            </div>
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={(e) => setIsOpen(false)}
            >
              &times;
            </a>
            {/* <a href=" #" className="mt-4"> */}
            <Link>
              <div
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#settingsModel"
              >
                Настройки
              </div>
            </Link>
            <Link to="logout/">Выход</Link>

            {/* </a> */}
          </div>
        </div>
        <Search disable={isOpen} />
        <SettingsModal data={data} image={image} />
      </div>
    </div>
  );
};

export default React.memo(LeftMenu);
