function EditPasswordModal() {
  return (
    <div
      className="modal fade"
      id="editPasswordModal"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content"
          style={{ borderRadius: "15px" }}
        >
        
          <div
            className="modal-header"
            style={{ borderBottom: "1px solid #dee2e6" }}
          >
            <h5 className="modal-title">Update Password</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span>&times;</span>
            </button>
          </div>

    
          <div className="modal-body p-4">
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm new password"
              />
            </div>

            <button className="btn btn-primary w-100">Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPasswordModal;
