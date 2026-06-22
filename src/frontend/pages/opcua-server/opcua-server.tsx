import { useEffect, useRef, useState } from "react";
import { NewOpcuaServerModal } from "./components/new-opcua-server-modal";
import { OpcuaServerDto } from "../../../backend/models/opcua-server/dtos/opcua-server.dto";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { useTooltip } from "../../helper/tooltip-helper";
import { useOpcuaServerBound } from "./services/opcua-server.service";

export function OpcuaServer() {
  const [showNewServerModal, setNewServerModal] = useState<boolean>(false);

  const fetcher = async (): Promise<OpcuaServerDto[]> =>
    window.api.getOpcuaServers();

  const { data, mutate } = useSWR("opcuaServers", fetcher);

  const newServerButtonRef = useRef<HTMLButtonElement | null>(null);

  [newServerButtonRef].forEach(useTooltip);

  const { getStatus, getLastStatus } = useOpcuaServerBound();

  useEffect(() => {
    getLastStatus();
  }, []);

  if (!data) {
    return (
      <>
        <div className="flex-grop-1 d-flex flex-column justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex-grow-1 d-flex flex-column">
        <div className="d-flex flex-row gap-2 p-2 align-items-center">
          <span className="fs-5 me-auto">OPC UA Servers</span>
          <button
            ref={newServerButtonRef}
            className="btn btn-primary"
            onClick={() => setNewServerModal(true)}
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="New Server"
          >
            <i className="bi bi-plus"></i>
          </button>
        </div>
        <hr className="divider m-0"></hr>
        <div className="flex-grow-1 pt-2">
          <table className="table flex-grow-1">
            <thead className="border-bottom">
              <tr>
                <th className="w-100">Name</th>
                <th>Port</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((s) => (
                  <tr key={s.id}>
                    <td className="me-auto">{s.name}</td>
                    <td>{s.port}</td>
                    <td>
                      {" "}
                      {(() => {
                        switch (getStatus(s.id)) {
                          case "stopped":
                            return <b className="text-warning">stopped</b>;

                          case "running":
                            return <b className="text-success">running</b>;

                          case "error":
                            return <b className="text-danger">error</b>;

                          default:
                            return <b className="text-warning">stopped</b>;
                        }
                      })()}
                    </td>
                    <td>
                      <div>
                        <Link
                          to={s.id}
                          className="ps-2 pe-2 text-decoration-none"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showNewServerModal && (
        <NewOpcuaServerModal
          onClose={() => {
            setNewServerModal(false);
            mutate();
          }}
        ></NewOpcuaServerModal>
      )}
    </>
  );
}
