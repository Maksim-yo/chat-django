import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Search } from "./Search";
const LeftMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setIsOpen(false);
    });
    return () => {
      document.removeEventListener("keydown", (e) => e);
    };
  }, [isOpen]);

  //   const nickaname = useSelector((state) => state.chat.userInfo?.nickaname);
  //   const nickaname = "Hello";

  return (
    <div class="menu row d-flex justify-content-center">
      <div class="input-group rounded mb-2 mt-3">
        <div class="navBar">
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
            class="sidenav list-unstyled mb-0"
            style={{ width: (isOpen ? 250 : 0) + "px" }}
          >
            <div class="d-flex flex-row ms-3">
              <div
                class="d-flex"
                style={{ position: "relative", display: "block" }}
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                  alt="avatar"
                  class="rounded-circle  ms-3 shadow-1-strong "
                  width="58"
                />
              </div>
              <div class="pt-1 ms-3">
                <p class="fw-bold mb-0">Hello</p>
              </div>
            </div>
            <a
              href="javascript:void(0)"
              class="closebtn"
              onClick={(e) => setIsOpen(false)}
            >
              &times;
            </a>
            <a href=" #" class="mt-4">
              Logout
            </a>
          </div>
        </div>
        <Search disable={isOpen} />
      </div>
    </div>
  );
};

export default LeftMenu;
