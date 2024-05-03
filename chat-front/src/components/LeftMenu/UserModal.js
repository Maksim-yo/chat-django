export const UserModal = ({ title, user_name, user_email, user_tag }) => {
  return (
    <div
      className="modal fade"
      id="createModel"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
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

          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};
