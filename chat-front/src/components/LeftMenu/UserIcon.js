import { useState, useRef, useEffect } from "react";
import { useUpdateUserDetailsMutation } from "../../app/services/api/apiService";

import "./style.css";
export const UserIcon = ({ image }) => {
  const inputFile = useRef(null);
  const [hover, setHover] = useState(false);
  const [
    postImageProfile,
    { data: imageData, isLoading, error, isError, isSuccess },
  ] = useUpdateUserDetailsMutation();

  const handleFile = (e) => {
    console.log("CHANGE!");
    var formData = new FormData();
    const file = e.target.files[0];
    formData.append("avatar", file);
    postImageProfile(formData)
      .then((data) => console.log("LOADED SUCCS"))
      .catch((exc) => console.log(exc));
  };
  const handle = (e) => {
    inputFile.current.click();
  };
  // useEffect(() => {}, [data]);
  return (
    <div
      onMouseOver={(e) => setHover(true)}
      onMouseLeave={(e) => setHover(false)}
      onClick={handle}
      className="icon-container d-flex justify-content-center align-items-center ms-3"
      style={{ overflow: "hidden" }}
    >
      <input
        type="file"
        className="d-none"
        ref={inputFile}
        onChange={handleFile}
      />
      {hover && (
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="60%"
          height="60%"
          style={{ position: "absolute", "z-index": "1" }}
          viewBox="0 0 45.402 45.402"
        >
          <g>
            <path
              d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
		c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
		c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
		c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
            />
          </g>
        </svg>
      )}
      <img
        src={image}
        alt="avatar"
        className="rounded-circle  shadow-1-strong "
        width="58"
        height="58"
        style={{
          filter: hover ? " blur(2px)" : "",
        }}
      />
    </div>
  );
};
