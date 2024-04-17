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

  return (
    <div
      class="text-box container-fluid  overflow-hidden my-0"
      style={{
        "background-color": "white",
        "max-height": "300px",
      }}
    >
      <div class="d-flex flex-row align-items-end justify-content-center pb-3 h-100">
        <BrowseFilesButton handleFile={handleFile} />
        <TextBox handleSubmit={handleSubmit} ref={boxRef} />
        <SendButton handleInputTextButton={handleInputTextButton} />
      </div>
    </div>
  );
};
