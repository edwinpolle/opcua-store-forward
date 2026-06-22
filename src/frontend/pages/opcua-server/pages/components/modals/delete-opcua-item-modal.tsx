type Props = {
  type: string;
  data: string;
  onClose: () => void;
  onDelete: () => void;
};

export function DeleteOpcuaItemModal({ type, data, onClose, onDelete }: Props) {
  return (
    <>
      <div className="modal-backdrop fade show d-block"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fs-5">Delete {data}</span>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <span>
                Are you sure to delete {type} {data}?
              </span>
            </div>

            <div className="modal-footer">
              <button className="btn btn-danger" onClick={onDelete}>
                Delete
              </button>
              <button className="btn btn-success" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
