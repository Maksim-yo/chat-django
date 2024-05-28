export const RoomInfo = ({
  title,
  user_name,
  user_email,
  user_info,
  image,
  chat_id,
  modal_id,
}) => {
  return (
    <div
      className="modal fade in"
      id={modal_id}
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
      // data-bs-backdrop=""
    >
      <div className="modal-dialog " style={{ width: "400px" }}>
        <div className="modal-content ">
          <div className="modal-header">
            <h5 className="modal-title me-2">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="modal-body px-0 "
            style={{
              height: "400px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            // onClick={(e) => e.preventDefault()}
          >
            <div className="row ms-2">
              <div className="col-3 ms-1">
                <img
                  className="rounded-circle  shadow-1-strong ms-3"
                  width="58"
                  src={image}
                />
              </div>
              <div className="col px-0">
                <div className="chat-name">{user_name}</div>
                <div className="chat-info">{user_info}</div>
              </div>
            </div>
            <div className="col ms-3 mt-4 px-0">
              <div className="row" style={{ marginLeft: "0px" }}>
                <div className="col-2 d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="30px"
                    height="30px"
                  >
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
                  </svg>
                </div>
                <div className="col-3 px-0 ms-1">
                  <a className="chat-email">{user_email}</a>
                  <div className="chat-info">Почта</div>
                </div>
              </div>
            </div>
            {/* <div className="col mt-4 py-2  info-room-btn " type="button">
              <div className="row px-0 gap-0 ms-3">
                <div className="col-2 d-flex ">
                  <svg
                    fill="#000000"
                    height="30px"
                    width="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path
                        d="M449.28,170.613H328.96c-45.973,0-51.52,29.013-51.627,42.133c-0.107,5.547,3.84,10.453,9.28,11.093
				c6.507,0.747,12.053-4.267,12.053-10.56c0-6.4,0-21.227,30.293-21.227h120.32c22.827,0,41.387,17.28,41.387,38.613v50.88
				c0,21.227-18.56,38.613-41.387,38.613H328.96c-30.293,0-30.293-14.827-30.293-21.227c0-6.293-5.547-11.413-12.053-10.56
				c-5.44,0.64-9.387,5.547-9.28,11.093c0.107,13.013,5.653,42.133,51.627,42.133h120.32c34.56,0,62.72-26.88,62.72-59.947v-50.88
				C512,197.493,483.84,170.613,449.28,170.613z"
                      />
                      <path
                        d="M225.387,288.053c-6.507-0.747-12.053,4.267-12.053,10.56c0,6.4,0,21.227-30.72,21.227h-121.6
				c-22.613,0.107-39.68-16.427-39.68-38.507v-50.88c0-21.973,17.067-38.613,39.68-38.613h121.6c30.72,0,30.72,14.827,30.72,21.227
				c0,6.293,5.547,11.413,12.053,10.56c5.44-0.64,9.387-5.547,9.28-11.093c-0.107-13.013-5.653-42.133-52.053-42.133h-121.6
				C26.773,170.613,0,196.96,0,230.56v50.88c0,33.493,26.773,59.84,61.013,59.84h121.6c46.4,0,51.947-29.013,52.053-42.133
				C234.773,293.707,230.827,288.8,225.387,288.053z"
                      />
                      <path
                        d="M128,255.947c0,5.867,4.8,10.667,10.667,10.667h234.667c5.867,0,10.667-4.8,10.667-10.667
				c0-5.867-4.8-10.667-10.667-10.667H138.667C132.8,245.28,128,250.08,128,255.947z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="chat-info ">Shared links</div>
                </div>
              </div>
            </div>
            <div className="col py-2 info-room-btn" type="button">
              <div className="row" style={{ paddingLeft: "1.5rem" }}>
                <div className="col-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                  >
                    <path d="M 14.738281 1.9902344 A 0.750075 0.750075 0 0 0 14.638672 2 L 6.25 2 C 5.0162029 2 4 3.0162029 4 4.25 L 4 19.75 C 4 20.983797 5.0162029 22 6.25 22 L 17.75 22 C 18.983797 22 20 20.983797 20 19.75 L 20 7.3730469 A 0.750075 0.750075 0 0 0 20 7.1269531 L 20 6.75 A 0.750075 0.750075 0 0 0 19.78125 6.21875 L 15.78125 2.21875 A 0.750075 0.750075 0 0 0 15.25 2 L 14.871094 2 A 0.750075 0.750075 0 0 0 14.738281 1.9902344 z M 6.25 3.5 L 14 3.5 L 14 7.25 A 0.750075 0.750075 0 0 0 14.75 8 L 18.5 8 L 18.5 19.75 C 18.5 20.172203 18.172203 20.5 17.75 20.5 L 6.25 20.5 C 5.8277971 20.5 5.5 20.172203 5.5 19.75 L 5.5 4.25 C 5.5 3.8277971 5.8277971 3.5 6.25 3.5 z M 15.5 4.0605469 L 17.939453 6.5 L 15.5 6.5 L 15.5 4.0605469 z" />
                  </svg>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="chat-info ms-1">Files</div>
                </div>
              </div>
            </div>
            <div className="col py-2 info-room-btn" type="button">
              <div className="row ms-3 ">
                <div className="col-2 d-flex">
                  <svg
                    fill="#000000"
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 489.4 489.4"
                  >
                    <g>
                      <path
                        d="M0,437.8c0,28.5,23.2,51.6,51.6,51.6h386.2c28.5,0,51.6-23.2,51.6-51.6V51.6c0-28.5-23.2-51.6-51.6-51.6H51.6
			C23.1,0,0,23.2,0,51.6C0,51.6,0,437.8,0,437.8z M437.8,464.9H51.6c-14.9,0-27.1-12.2-27.1-27.1v-64.5l92.8-92.8l79.3,79.3
			c4.8,4.8,12.5,4.8,17.3,0l143.2-143.2l107.8,107.8v113.4C464.9,452.7,452.7,464.9,437.8,464.9z M51.6,24.5h386.2
			c14.9,0,27.1,12.2,27.1,27.1v238.1l-99.2-99.1c-4.8-4.8-12.5-4.8-17.3,0L205.2,333.8l-79.3-79.3c-4.8-4.8-12.5-4.8-17.3,0
			l-84.1,84.1v-287C24.5,36.7,36.7,24.5,51.6,24.5z"
                      />
                      <path
                        d="M151.7,196.1c34.4,0,62.3-28,62.3-62.3s-28-62.3-62.3-62.3s-62.3,28-62.3,62.3S117.3,196.1,151.7,196.1z M151.7,96
			c20.9,0,37.8,17,37.8,37.8s-17,37.8-37.8,37.8s-37.8-17-37.8-37.8S130.8,96,151.7,96z"
                      />
                    </g>
                  </svg>
                </div>
                <div className="col d-flex align-items-center">
                  <div className="chat-info ">Photos</div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};
