import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Search } from "./Search";
import { UserIcon } from "./UserIcon";
const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutClick, setLogoutClick] = useState(false);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setIsOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, [isOpen]);

  useEffect(() => {
    if (logoutClick) logoutClick = false;
  }, [logoutClick]);

  const handleLogoutClick = () => {
    setLogoutClick(true);
  };

  //   const nickaname = useSelector((state) => state.chat.userInfo?.nickaname);
  //   const nickaname = "Hello";

  return (
    <div className="menu row d-flex justify-content-center">
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
                <UserIcon />
              </div>
              <div className="pt-1 ms-3">
                <p className="fw-bold mb-0">Hello</p>
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
            <Link to="logout/">Logout</Link>
            <Link>Settings</Link>
            {/* </a> */}
          </div>
        </div>
        <Search disable={isOpen} />
      </div>
    </div>
  );
};

export default LeftMenu;
