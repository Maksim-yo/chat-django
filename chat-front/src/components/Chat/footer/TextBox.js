import { useState, forwardRef, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

export const TextBox = forwardRef(function (
  { handleSubmit, handleResizing },
  ref
) {
  const [boxHegiht, setBoxHeight] = useState(0);
  function handler(e) {
    if (e.keyCode === 13 && !e.shiftKey && e.target.value) {
      console.log(e.target.value);

      if (e.target.value.trim()) handleSubmit();
      e.target.value = "";
      e.preventDefault();
    } else if (e.keyCode == 13) e.preventDefault();

    handleResizing();
  }

  useEventListener("keydown", handler);

  const handleBox = (e) => {
    setBoxHeight(0);
    setBoxHeight(e.target.scrollHeight);
    handleResizing();
  };

  useEffect(() => {
    handleResizing();
  }, [boxHegiht]);

  return (
    <div className="col h-100">
      <textarea
        ref={ref}
        onChange={handler}
        className="default-text my-3"
        id="chatTextArea"
        placeholder="Write a message..."
        style={{
          overflowY: "scroll",
          maxHeight: "100%",
          scrollbarWidth: "none",
        }}
      ></textarea>
    </div>
  );
});
