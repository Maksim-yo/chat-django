import { useRef } from "react";

export const BrowseFilesButton = ({ handleFile }) => {
  const inputFile = useRef(null);

  return (
    <div className="d-flex">
      <input
        type="file"
        className="d-none"
        ref={inputFile}
        multiple
        onChange={handleFile}
      />

      <div
        className="btn"
        type="button"
        onClick={() => inputFile.current.click()}
      >
        <svg width="30px" height="30px" viewBox="0 0 408.318 408.318">
          <g>
            <path
              fill="#AB7C94"
              d="M265.48,134.831l-13.388-13.388L89.531,284.006c-15.3,15.3-15.3,38.25,0,53.55c15.3,15.3,38.25,15.3,53.55,0
          l223.762-223.762c26.775-26.775,26.775-68.85,0-93.712c-26.774-26.775-68.85-26.775-95.625,0L49.369,243.843
          c-38.25,38.25-36.338,97.538,0,135.788c38.25,38.25,97.537,38.25,135.787,0l162.562-162.562l-15.3-15.3L169.856,364.33
          c-30.6,30.601-78.413,30.601-109.013,0c-30.6-30.6-30.6-78.412,0-109.012l223.762-221.85c19.125-19.125,49.725-19.125,66.938,0
          c19.125,19.125,19.125,49.725,0,66.938l-221.85,223.762c-7.65,7.65-19.125,7.65-26.775,0s-7.65-19.125,0-26.775L265.48,134.831z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
