export const DateMessage = ({ date }) => {
  return (
    <div className="chat-message-date card">
      <div className="card-body mx-0 px-3 py-0 my-0">
        <div className="d-flex">
          <div
            className="d-inline-block"
            style={{ "max-width": "150px", "word-wrap": "break-word" }}
          >
            <div className="span" x-text={date}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
