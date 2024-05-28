import { UserIcon } from "./UserIcon";
import { useEffect, useState } from "react";
import { EditNameModal } from "./EditNameModal";
import React from "react";
const SettingsModal = ({ data, image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (data) {
      setUsername(data.nickname);
      setEmail(data.email);
    }
  }, [data]);
  return (
    <div
      className="modal fade "
      id="settingsModel"
      tabIndex="-1"
      //   aria-labelledby="createModalLabel"
      //   aria-hidden="true"
      //   data-backdrop="true"
      //   data-bs-backdrop="static"
      //   data-bs-toggle="modal"
      //   data-bs-target="#exampleModal"
    >
      <div className="modal-dialog " style={{ width: "400px" }}>
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title me-2">Settings</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body px-0 "
            style={{
              height: "400px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            // onClick={(e) => e.preventDefault()}
          >
            <div className="row">
              <div className="col-3">
                <div
                  className="d-flex ms-1"
                  style={{ position: "relative", display: "block" }}
                >
                  <UserIcon image={image} />
                </div>
              </div>
              <div className="col px-0 ms-2">
                <div className="chat-name">{username}</div>
                <div className="chat-info"> </div>
              </div>
            </div>
            <div className="col mt-4 py-3 info-room-btn " type="button">
              <div className="row ms-3" style={{ marginLeft: "0px" }}>
                <div className="col-2 d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="30px"
                    height="30px"
                  >
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
                  </svg>
                </div>
                <div className="col px-0 me-4">
                  <div className="d-flex justify-content-between">
                    <div className="chat-email">Почта</div>
                    <div className="chat-info text-secondary">{email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col py-3  info-room-btn "
              type="button"
              onClick={() => setIsVisible(true)}
              //   data-bs-toggle="modal"
              //   href="#exampleModal"
              //   data-bs-target="#exampleModal"
            >
              <div className="row ms-3" style={{ marginLeft: "0px" }}>
                <div className="col-2 d-flex align-items-center">
                  <svg
                    className="feather feather-user"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="col px-0 ">
                  <div className="d-flex justify-content-between">
                    <div className="chat-email">Название</div>
                    <div className="chat-info me-4 text-secondary">
                      {username}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
      {isVisible && (
        <EditNameModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          username={username}
        />
      )}
    </div>
  );
};

export default React.memo(SettingsModal);
