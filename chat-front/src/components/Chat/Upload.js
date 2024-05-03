import { useState, useId, useEffect } from "react";
export const Upload = ({ children }) => {
  const [drop, setDrop] = useState(false);

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDrop(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDrop(true);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDrop(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDrop(false);
    console.log(e.dataTransfer.files[0]);
    // const droppedFile = e.dataTransfer.files[0];
  };

  const handleFileChange = (event) => {};
  const id = useId();
  useEffect(() => {}, []);
  return (
    <
      //   className="h-100"
      //   onDrop={handleDrop}
      //   onDragOver={onDragOver}
      //   onDragLeave={onDragLeave}
    >
      <>
        <div
          className={
            "d-flex justify-content-center me-4" + (drop ? "" : " d-none")
          }
          style={{ pointerEvents: "none" }}
          id="deb"
        >
          <div className="drop d-flex align-items-center justify-content-center">
            <div className="drop-text">Drop files to send them</div>
            <label htmlFor={id}>
              <input
                type="file"
                className="drop-input"
                onChange={handleFileChange}
                id={id}
              />
            </label>
          </div>
        </div>
        {children}
      </>
    </>
  );
};
