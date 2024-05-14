import React, { useRef } from "react";
import { SendButton } from "./SendButton";
import { BrowseFilesButton } from "./BrowseFilesButton";
import { TextBox } from "./TextBox";
const Footer = ({ handleSubmit, handleFile, chat_id }) => {
  const boxRef = useRef(null);
  const handleInputTextButton = () => {
    handleSubmit(boxRef.current.value);
    boxRef.current.value = "";
  };

  const handleResize = () => {
    if (boxRef?.current) {
      boxRef.current.style.height = "0px";
      boxRef.current.style.height = boxRef.current.scrollHeight + "px";
    }
  };
  const textBox = React.useMemo(() => {
    return (
      <TextBox
        handleSubmit={handleInputTextButton}
        handleResizing={handleResize}
        ref={boxRef}
        chat_id={chat_id}
      />
    );
  }, [chat_id, handleInputTextButton, handleResize]);
  return (
    <div
      className="text-box container-fluid  overflow-hidden my-0"
      style={{
        backgroundColor: "white",
        maxHeight: "300px",
      }}
    >
      <div className="d-flex flex-row align-items-end justify-content-center pb-3 h-100">
        <BrowseFilesButton handleFile={handleFile} />
        <TextBox
          handleSubmit={handleInputTextButton}
          handleResizing={handleResize}
          ref={boxRef}
          chat_id={chat_id}
        />
        <SendButton handleInputTextButton={handleInputTextButton} />
      </div>
    </div>
  );
};

export default Footer;
