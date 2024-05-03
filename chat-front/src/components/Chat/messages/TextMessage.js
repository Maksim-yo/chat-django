import { useEffect } from "react";

export const TextMessage = ({ message, readStatus, setMessageToSend }) => {
  useEffect(() => {
    setMessageToSend({ ...message, type: "peer_message" });
  }, []);
  return <span className="text-break">{message?.line_text}</span>;

  // return (
  //   <div className="container px-2 py-2 text-break">
  //     {/* <div className="d-inline-block "> */}
  //       <span>{message?.line_text}</span>

  //       {/* <div className="d-inline-block" style={{ float: "right" }}>
  //         <div className="d-flex">
  //           <div className="ms-2 ">12:44</div>
  //           <div className="ms-2 ">{readStatus}</div>
  //         </div>
  //       </div> */}
  //     {/* </div> */}
  //     {/* {children && (
  //         <div style={{ "min-width": "300px", "max-width": "300px" }}>
  //           {children}
  //         </div>
  //       )} */}
  //   </div>
  //   // {/* <div className="d-flex align-items-end ms-3 text-secondary">
  //   //   <div className="span text-center">
  //   //     {getMessageStringDate(message?.timestamp)}
  //   //   </div>
  //   // </div> */}
  // );
};
