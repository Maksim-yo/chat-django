import { useRef, forwardRef, useState } from "react";

import { SendButton } from "./SendButton";
import { BrowseFilesButton } from "./BrowseFilesButton";
import { TextBox } from "./TextBox";

export const Footer = ({ handleSubmit, handleFile }) => {
  const boxRef = useRef(null);

  const handleInputTextButton = (e) => {
    handleSubmit(boxRef.current.value);
    boxRef.current.value = "";
  };

  const handleResize = () => {
    if (boxRef?.current) {
      boxRef.current.style.height = "0px";
      boxRef.current.style.height = boxRef.current.scrollHeight + "px";
    }
  };

  return (
    <div
      className="text-box container-fluid  overflow-hidden my-0"
      style={{
        backgroundColor: "white",
        "max-height": "300px",
      }}
    >
      <div className="d-flex flex-row align-items-end justify-content-center pb-3 h-100">
        <BrowseFilesButton handleFile={handleFile} />
        <TextBox
          handleSubmit={handleSubmit}
          handleResizing={handleResize}
          ref={boxRef}
        />
        <SendButton handleInputTextButton={handleInputTextButton} />
      </div>
    </div>
  );
};
