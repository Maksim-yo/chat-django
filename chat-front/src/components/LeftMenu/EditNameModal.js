import { useState, useEffect, useRef } from "react";
import { useUpdateUserDetailsMutation } from "../../app/services/api/apiService";
export const EditNameModal = ({ isVisible, setIsVisible, username }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [
    postProfile,
    { data: profileResult, isLoading, error, isError, isSuccess },
  ] = useUpdateUserDetailsMutation();

  const handleSubmit = () => {
    var formData = new FormData();
    formData.append("nickname", inputRef.current.value);

    var res = postProfile(formData);
    res.then((e) => {
      setIsVisible(false);
    });
  };

  useEffect(() => {
    if (username) setValue(username);
  }, [username]);

  const handleChange = (event) => {
    if ("/^[0-9a-zA-Z_-]+$/".test(event.target.value))
      setValue(event.target.value);
  };
  return (
    <div
      className="modal bg-dark bg-opacity-50 "
      id="exampleModal"
      tabIndex="-1"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div
        className="modal-dialog"
        style={{ width: "300px", marginTop: "10%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Изменить никнейм
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setIsVisible(false)}
            ></button>
          </div>
          <div className="modal-body">
            <input
              ref={inputRef}
              type="text"
              className="form-control"
              onChange={handleChange}
              value={value}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setIsVisible(false)}
            >
              Закрыть
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSubmit()}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-3"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="">Сохранение...</span>
                </>
              ) : (
                "Сохранить"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
