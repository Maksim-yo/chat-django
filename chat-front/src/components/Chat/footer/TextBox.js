import { useRef, useState, forwardRef, useEffect } from "react";
import useEventListener from "@use-it/event-listener";

export const TextBox = forwardRef(function ({ handleSubmit }, ref) {
  const [boxHegiht, setBoxHeight] = useState(0);
  const boxRef = useRef(null);

  function handler(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      handleSubmit(e.target.value);
      e.target.value = "";
      e.preventDefault();
    }
  }

  useEventListener("keydown", handler);

  const handleBox = (e) => {
    setBoxHeight(e.target.value);
  };

  useEffect(() => {
    if (boxRef?.current) {
      boxRef.current.style.height = "0px";
      boxRef.current.style.height = boxRef.current.scrollHeight + "px";
    }
  }, [boxHegiht]);
  return (
    <div class="col h-100">
      <textarea
        ref={ref}
        onChange={handleBox}
        class="default-text my-3"
        id="chatTextArea"
        rows="1"
        placeholder="Write a message..."
        style={{
          "overflow-y": "scroll",
          "max-height": "100%",
          "scrollbar-width": "none",
        }}
      ></textarea>
    </div>
  );
});
