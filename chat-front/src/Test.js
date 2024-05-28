import Message from "./components/Chat/messages/Message";
import { useState } from "react";
import { ImageMessage } from "./components/Chat/messages/ImageMessage";
import { TextMessage } from "./components/Chat/messages/TextMessage";
import { FileMessage } from "./components/Chat/messages/fileMessage/FileMessage";
export const Test = () => {
  const [file, setFile] = useState();
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="ms-3">
      <input onChange={onChange} type="file" />
      <Message>
        {/* <TextMessage message={{ line_text: "hello" }} /> */}

        {/* <ImageMessage image={file} readStatus={true} /> */}
      </Message>
    </div>
  );
};
