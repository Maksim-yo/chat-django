import { getMessageStringDate } from "../../utils/message";

export default function Message({ data }) {
  const message = data;

  return (
    <li class="chat-message d-flex mb-4">
      {message?.is_date && (
        <div class="chat-message-date card">
          <div class="card-body mx-0 px-3 py-0 my-0">
            <div class="d-flex">
              <div
                class="d-inline-block"
                style={{ "max-width": "150px", "word-wrap": "break-word" }}
              >
                <div class="span" x-text="item.message"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {true && (
        <div class="card" style={{ "border-radius": "20px" }}>
          <div class="card-body rounded-2 mx-0 px-2 py-2 my-0 ms-1">
            <div class="d-flex">
              <div
                class="d-inline-block"
                style={{ "max-width": "150px", "word-wrap": "break-word" }}
              >
                <div class="span">{message.line_text}</div>
              </div>
              <div class="d-inline-block ms-2 mt-1 text-secondary">
                <div class="span">
                  {getMessageStringDate(message.timestamp)}
                </div>
              </div>
              <template x-if="isPeerIdCurrentUser(item)">
                <div class="mt-1">
                  <template x-if="item.is_read">
                    <div class="d-inline-block ms-2 mt-auto">
                      <img
                        src="assets/double-check-blue.png"
                        class="mb-1"
                        width="15"
                        height="15"
                      />
                    </div>
                  </template>
                  {!message.is_read && (
                    <div class="d-inline-block ms-2 mt-auto">
                      <img
                        src="assets/check-black.png"
                        class="mb-1"
                        width="15"
                        height="15"
                      />
                    </div>
                  )}
                </div>
              </template>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
