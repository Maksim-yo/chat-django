export default function ChatHeader({ room_name, room_info }) {
  return (
    <div class="chat-header">
      <div class="row no-gutters g-0">
        <div class="left-chat-info col ms-3">
          <div class="chat-name">{room_name}</div>
          <div class="chat-info">{room_info}</div>
        </div>
        <div class="col d-flex justify-content-end align-items-center">
          <a class="search-btn" href="#">
            <div class="me-3" style={{ width: "30px", height: "30px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
              </svg>
            </div>
          </a>
          <div class="dropdown">
            <a
              href="#"
              class=""
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="me-3" style={{ width: "30px", height: "30px" }}>
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                  class="bi bi-three-dots-vertical"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
              </div>
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <a class="dropdown-item custom-dropdown-item" href="#">
                Delete histoy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
