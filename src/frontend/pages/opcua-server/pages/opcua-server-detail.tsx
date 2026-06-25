import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { OpcuaNamespaceListItem } from "./components/opcua-namespace-list-item";
import { NewOpcuaNamespaceModal } from "./components/modals/new-opcua-namespace-modal";
import { useOpcuaServerBound } from "../services/opcua-server.service";
import { scrollToId, useTooltip } from "../../../helper/tooltip-helper";
import { EditOpcuaServerModal } from "../components/edit-opcua-server-modal";

export function OpcuaServerDetail() {
  const { opcuaServerId } = useParams<{ opcuaServerId: string }>();

  const [showNewNamespaceModal, setNewNamespaceModal] =
    useState<boolean>(false);

  const [showEditServerModal, setEditServerModal] = useState<boolean>(false);

  const {
    opcuaServer,
    namespaces,
    setNamespace,
    init,
    clear,
    getObjectsByNamespaceId,
    getMethodByObjectId,
    getStatus,
  } = useOpcuaServerBound();

  const newNamespaceButtonRef = useRef<HTMLButtonElement | null>(null);
  const startServerButtonRef = useRef<HTMLButtonElement | null>(null);
  const stopServerButtonRef = useRef<HTMLButtonElement | null>(null);
  const restartServerButtonRef = useRef<HTMLButtonElement | null>(null);
  const editServerButtonRef = useRef<HTMLButtonElement | null>(null);

  [
    newNamespaceButtonRef,
    startServerButtonRef,
    stopServerButtonRef,
    restartServerButtonRef,
    editServerButtonRef,
  ].forEach(useTooltip);

  function startServer() {
    window.api.startOpcuaServer(opcuaServerId!).then(() => {
      console.log("Server started!");
    });
  }

  function stopServer() {
    window.api.stopOpcuaServer(opcuaServerId!).then(() => {
      console.log("Server stopped");
    });
  }

  function restartServer() {
    window.api.restartOpcuaServer(opcuaServerId!).then(() => {
      console.log("Server restarted");
    });
  }

  useEffect(() => {
    if (!opcuaServerId) return;

    window.api.getOpcuaServerById(opcuaServerId).then((data) => {
      console.log(data);
      init(data);
    });
  }, [opcuaServerId, init]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <>
      <div className="flex-grow-1 d-flex">
        <div className="flex-grow-1 d-flex flex-column">
          <div className="d-flex p-2 gap-2">
            <div className="me-auto">
              <span className="fs-5">
                Status:{" "}
                {opcuaServerId &&
                  (() => {
                    switch (getStatus(opcuaServerId)) {
                      case "stopped":
                        return <b className="text-warning">stopped</b>;

                      case "running":
                        return <b className="text-success">running</b>;

                      case "error":
                        return <b className="text-danger">error</b>;

                      default:
                        return <b className="text-secondary">unknown</b>;
                    }
                  })()}
              </span>
            </div>

            <button
              ref={startServerButtonRef}
              className="btn btn-success"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Start Server"
              onClick={() => startServer()}
            >
              <i className="bi bi-play"></i>
            </button>
            <button
              ref={stopServerButtonRef}
              className="btn btn-danger"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Stop Server"
              onClick={() => stopServer()}
            >
              <i className="bi bi-stop"></i>
            </button>
            <button
              ref={restartServerButtonRef}
              className="btn btn-warning"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Restart Server"
              onClick={() => restartServer()}
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
            <button
              ref={editServerButtonRef}
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Edit Server"
              onClick={() => setEditServerModal(true)}
            >
              <i className="bi bi-pencil"></i>
            </button>
          </div>

          <hr className="divider m-0"></hr>
          <div className="d-flex flex-row gap-2 p-2 align-items-center">
            <span className="fs-5 me-auto">{opcuaServer?.name}</span>
          </div>
          <hr className="divider m-0"></hr>
          <div className="flex-grow-1 d-flex flex-column overflow-auto">
            <div className="p-2">
              <span>Port: {opcuaServer?.port}</span>
            </div>

            <div className="flex-grow-1 d-flex flex-column overflow-auto">
              <hr className="divider m-0"></hr>
              <div className="d-flex p-2 align-items-center gap-2">
                <span className="me-auto">Namespaces</span>
                <span className="badge text-bg-primary rounded-pill">
                  {namespaces.size !== 1
                    ? `${namespaces.size} Namespaces`
                    : `${namespaces.size} Namespace`}
                </span>
                <button
                  ref={newNamespaceButtonRef}
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title="New Namespace"
                  onClick={() => setNewNamespaceModal(true)}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>
              <hr className="divider m-0"></hr>
              {/** 
            <div className="p-2">
              <input
                className="form-control"
                placeholder="Type to search..."
              ></input>
            </div>
            <hr className="divider m-0"></hr>
            */}
              <div className="flex-grow-1 d-flex overflow-auto">
                <div className="flex-grow-1 d-flex flex-column gap-2 p-2 overflow-auto">
                  {namespaces &&
                    [...namespaces.values()].map((v) => (
                      <ul key={v.id} id={v.id} className="list-group gap-2">
                        <li
                          key={v.id}
                          className="list-group-item list-group-item-primary d-flex flex-column pt-2 pb-2 ps-2"
                        >
                          <OpcuaNamespaceListItem
                            id={v.id}
                          ></OpcuaNamespaceListItem>
                        </li>
                      </ul>
                    ))}
                </div>
                <div className="vr"></div>
                <div
                  className="d-none d-lg-flex d-flex flex-column overflow-auto"
                  style={{ width: "300px" }}
                >
                  <div className="p-2">
                    <input
                      className="form-control"
                      placeholder="search"
                    ></input>
                  </div>

                  <hr className="divider m-0"></hr>
                  <div className="d-flex flex-column flex-grow-1 p-2 overflow-auto">
                    <nav className="nav nav-pills flex-column">
                      {[...namespaces.values()].map((n) => (
                        <div key={n.id}>
                          <a
                            key={n.id}
                            onClick={(e) => {
                              scrollToId(e, document, n.id);
                            }}
                            href="#"
                            className="nav-link my-1 bg-primary-subtle text-primary-emphasis border border-primary-subtle"
                          >
                            {n.name}
                          </a>
                          {getObjectsByNamespaceId(n.id).length > 0 ? (
                            <nav className="nav nav-pills flex-column">
                              {getObjectsByNamespaceId(n.id).map((o) => (
                                <div key={o.id}>
                                  <a
                                    key={o.id}
                                    onClick={(e) => {
                                      scrollToId(e, document, o.id);
                                    }}
                                    href="#"
                                    className="nav-link ms-4 my-1 bg-success-subtle text-success-emphasis border border-success-subtle"
                                  >
                                    {o.name}
                                  </a>

                                  {getMethodByObjectId(o.id).length > 0 ? (
                                    <nav className="nav nav-pills flex-column">
                                      {getMethodByObjectId(o.id)
                                        .sort((a, b) => a.order - b.order)
                                        .map((m) => (
                                          <a
                                            key={m.id}
                                            onClick={(e) => {
                                              scrollToId(e, document, m.id);
                                            }}
                                            href="#"
                                            className="nav-link ms-5 my-1 bg-warning-subtle text-warning-emphasis border border-warning-subtle"
                                          >
                                            {m.name}
                                          </a>
                                        ))}
                                    </nav>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ))}
                            </nav>
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNewNamespaceModal && opcuaServerId && (
        <NewOpcuaNamespaceModal
          serverId={opcuaServerId}
          onClose={() => {
            setNewNamespaceModal(false);
          }}
          onSave={(result) => {
            if (result) {
              setNamespace(result);
            }
          }}
        ></NewOpcuaNamespaceModal>
      )}

      {showEditServerModal && opcuaServer && (
        <EditOpcuaServerModal
          data={opcuaServer}
          onClose={() => {
            setEditServerModal(false);
          }}
          onUpdate={() => {
            return;
          }}
        ></EditOpcuaServerModal>
      )}
    </>
  );
}
