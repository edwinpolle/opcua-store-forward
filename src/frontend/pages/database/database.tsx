import { useState } from "react";
import { NewDatabaseModal } from "./components/new-database-modal";

export function Database() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex-grow-1 d-flex flex-column">
        <div className="d-flex flex-row gap-2 p-2 align-items-center">
          <span className="fs-5 fw-bold me-auto">Database connections</span>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowModal(true);
              console.log(showModal);
            }}
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
        <hr className="divider m-0"></hr>
        <div className="flex-grow-1 pt-2">
          <table className="table flex-grow-1">
            <thead className="border-bottom">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Host</th>
                <th>Database</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <NewDatabaseModal
          onClose={() => {
            setShowModal(false);
          }}
        ></NewDatabaseModal>
      )}
    </>
  );
}
