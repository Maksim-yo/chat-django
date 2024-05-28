import { useContext } from "react";
import Message from "./Message";
import { DownloadFile } from "./fileMessage/DownloadFile";
import { UploadFile } from "./fileMessage/UploadFIle";
import { FileMessage } from "./fileMessage/FileMessage";
import { TextMessage } from "./TextMessage";
import { UnreadMessageNotifaction } from "./UnreadMessageNotification";
import ImageMessage from "./ImageMessage";
import React from "react";

export default React.memo(function MessageFactory({ message, index }) {
  if (message.type === "Text") {
    return (
      <Message key={index} message={message}>
        <TextMessage />
      </Message>
    );
  } else if (message.type === "File") {
    if (message?.file?.file_status === "unloaded")
      return (
        <Message key={index} message={message}>
          <UploadFile>
            <FileMessage />
          </UploadFile>
        </Message>
      );
    else
      return (
        <Message key={index} message={message}>
          <DownloadFile>
            <FileMessage />
          </DownloadFile>
        </Message>
      );
  } else if (message.type === "Image") {
    if (message?.file?.file_status === "unloaded") {
      return (
        <Message key={index} message={message}>
          <UploadFile>
            <ImageMessage />
          </UploadFile>
        </Message>
      );
    } else
      return (
        <Message key={index} message={message}>
          <DownloadFile>
            <ImageMessage />
          </DownloadFile>
        </Message>
      );
  } else if (message.type === "UnreadNotifaction") {
    return <UnreadMessageNotifaction />;
  }

  return null;
});
