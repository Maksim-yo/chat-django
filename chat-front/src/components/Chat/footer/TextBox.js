import { useRef, useState, forwardRef, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

export const TextBox = forwardRef(function (
  { handleSubmit, handleResizing },
  ref
) {
  const [boxHegiht, setBoxHeight] = useState(0);
  const boxRef = useRef(null);

  function handler(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      handleSubmit(e.target.value);
      e.target.value = "";
      e.preventDefault();
    }
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
        onChange={handleBox}
        className="default-text my-3"
        id="chatTextArea"
        rows="1"
        placeholder="Write a message..."
        style={{
          "overflow-y": "scroll",
          "max-height": "100%",
          scrollbarWidth: "none",
        }}
      ></textarea>
    </div>
  );
});
