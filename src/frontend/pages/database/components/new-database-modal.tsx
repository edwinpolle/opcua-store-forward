import { useState } from "react";
import { MySQLBody } from "./mysql-body";
import { MSSQLBody } from "./mssql-body";
import { Dropdown } from "../../../../frontend/components/dropdown/dropdown";

type Props = {
  onClose: () => void;
};

export function NewDatabaseModal({ onClose }: Props) {
  const [showDropdown, setShowDropDown] = useState(false);
  const [connectionType, setConnectionType] = useState("MySQL");

  function dialogSetConnectionType(type: string) {
    setConnectionType(type);
    setShowDropDown(false);
  }

  function testConnection() {
    console.log("TestConnection");
  }

  return (
    <>
      <div className="modal-backdrop fade show d-block"></div>
      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">New Database connection</span>
              <button className="btn-close" onClick={() => onClose()}></button>
            </div>
            <div className="modal-body d-flex flex-column gap-2">
              <label className="form-label">Name</label>
              <input className="form-control" autoFocus></input>
              <div>
                <Dropdown
                  title="Database Type"
                  value="MySQL"
                  values={["MySQL", "MSSql"]}
                  onChange={(v) => setConnectionType(v)}
                ></Dropdown>
              </div>

              {connectionType === "MySQL" && <MySQLBody></MySQLBody>}
              {connectionType === "MSSql" && <MSSQLBody></MSSQLBody>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-info">Test</button>
              <button
                className="btn btn-success"
                onClick={() => testConnection()}
              >
                Save
              </button>
              <button className="btn btn-danger" onClick={() => onClose()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
