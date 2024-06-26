export const SendButton = ({ handleInputTextButton }) => {
  return (
    <div className="d-flex">
      <div className="btn me-2" onClick={handleInputTextButton}>
        <svg width="30px" height="30px" viewBox="0 0 19 20" version="1.1">
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              id="24-px-Icons"
              transform="translate(-219.000000, -122.000000)"
              stroke="#000000"
            >
              <g id="ic_send" transform="translate(216.000000, 120.000000)">
                <g transform="translate(4.000000, 3.000000)" strokeWidth="2">
                  <polygon id="Path-32" points="0 0 17 9 0 18 5 9"></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
