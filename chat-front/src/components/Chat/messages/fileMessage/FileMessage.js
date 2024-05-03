import "./file.css";
import { LoadingOutlined } from "../../../LoadingOutlined/LoadingOutlined";

export const FileMessage = ({
  progress,
  loading,
  file_name,
  file_size,
  handleClick,
}) => {
  return (
    <div className="d-flex px-2 py-2" style={{ width: "250px" }}>
      <div className="row align-items-center g-0">
        <div className="col">
          <div
            className="d-flex file align-items-center justify-content-center"
            onClick={() => handleClick()}
          >
            {loading ? (
              <>
                <LoadingOutlined
                  size={42}
                  progress={progress}
                  trackWidth={5}
                  indicatorWidth={5}
                  spinnerMode={true}
                />
                <svg
                  className="cancel-btn"
                  width="48"
                  height="48"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clip-rule="evenodd"
                    d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
                    fill="#000"
                    data-darkreader-inline-fill=""
                  ></path>
                </svg>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30px"
                height="30px"
              >
                <path d="M 14.738281 1.9902344 A 0.750075 0.750075 0 0 0 14.638672 2 L 6.25 2 C 5.0162029 2 4 3.0162029 4 4.25 L 4 19.75 C 4 20.983797 5.0162029 22 6.25 22 L 17.75 22 C 18.983797 22 20 20.983797 20 19.75 L 20 7.3730469 A 0.750075 0.750075 0 0 0 20 7.1269531 L 20 6.75 A 0.750075 0.750075 0 0 0 19.78125 6.21875 L 15.78125 2.21875 A 0.750075 0.750075 0 0 0 15.25 2 L 14.871094 2 A 0.750075 0.750075 0 0 0 14.738281 1.9902344 z M 6.25 3.5 L 14 3.5 L 14 7.25 A 0.750075 0.750075 0 0 0 14.75 8 L 18.5 8 L 18.5 19.75 C 18.5 20.172203 18.172203 20.5 17.75 20.5 L 6.25 20.5 C 5.8277971 20.5 5.5 20.172203 5.5 19.75 L 5.5 4.25 C 5.5 3.8277971 5.8277971 3.5 6.25 3.5 z M 15.5 4.0605469 L 17.939453 6.5 L 15.5 6.5 L 15.5 4.0605469 z" />
              </svg>
            )}
          </div>
        </div>
        <div className="col ms-3 ">
          <div clas="file-name text-truncate" style={{ overflow: "hidden" }}>
            {file_name}
          </div>
          <div className="text-black-50">
            {loading ? 0 : file_size}/{file_size}
          </div>
        </div>
      </div>
    </div>
  );
};
