import { useState, forwardRef } from "react";

export const ScrollButton = forwardRef(function (
  { scrollToBottom, unreadCount },
  ref
) {
  return (
    <a
      onClick={() => scrollToBottom()}
      type="button"
      className="rounded-circle scroll-button"
      id="scroll-chat-btn-bottom"
      style={{
        position: "absolute",
        left: "94%",
        bottom: "15%",
        backgroundColor: "gainsboro",
        zIndex: "1000",
        // transition: "0.2s",
        // transform: "translateY(100%)",
      }}
    >
      <div
        class="d-flex container justify-content-center align-items-center rounded-circle"
        style={{ position: "relative", height: "50px", width: "50px" }}
      >
        <img class="" src="assets/down-arrow-chat.png" width="25" />
        {unreadCount > 0 && (
          <div
            class="d-flex rounded-circle align-items-center justify-content-center"
            style={{
              color: "white",
              backgroundColor: "rgb(88, 139, 175)",
              width: "30px",
              height: "30px",
              marginLeft: "65%",
              marginBottom: "65%",
              position: "absolute",
            }}
          >
            <span>{unreadCount}</span>
          </div>
        )}
      </div>
    </a>
  );
});
