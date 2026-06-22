import { useState } from "react";
import { Dropdown } from "../../../../frontend/components/dropdown/dropdown";
import { CreateOpcuaServerDto } from "../../../../backend/models/opcua-server/dtos/create-opcua-server.dto";
import { useNotifycationStore } from "../../../../frontend/components/notification/notifycationt-service";

type Props = {
  onClose: () => void;
};

export function NewOpcuaServerModal({ onClose }: Props) {
  const [config, setConfig] = useState<CreateOpcuaServerDto>({
    name: "",
    port: 4840,
    runOnStartup: true,
    securityMode: "None",
    securityPolicy: "None",
  });

  function createServer() {
    window.api.setNewOpcuaServer(config).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New Server "${config.name}" created!`,
            "success",
          );
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New Server "${config.name}" can not be created!`,
            "danger",
          );
      }
    });
  }

  return (
    <>
      <div className="modal-backdrop fade show d-block"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">New OPC UA Server</span>
              <button className="btn-close" onClick={() => onClose()}></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    autoFocus
                    value={config.name}
                    onChange={(v) =>
                      setConfig({ ...config, name: v.target.value })
                    }
                  ></input>
                </div>

                <div className="mb-2">
                  <label className="form-label">Port</label>
                  <input
                    type="number"
                    className="form-control"
                    value={config.port}
                    onChange={(v) =>
                      setConfig({ ...config, port: Number(v.target.value) })
                    }
                  ></input>
                </div>

                <div className="form-check mb-2">
                  <label className="form-check-label">Run on Startup</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={config.runOnStartup}
                    onChange={(v) =>
                      setConfig({ ...config, runOnStartup: v.target.checked })
                    }
                  ></input>
                </div>

                <div className="mb-2 d-flex flex-column">
                  <Dropdown
                    title="Security Mode"
                    value="None"
                    values={["None", "Sign", "SignAndEncrypt"]}
                    onChange={(v) => setConfig({ ...config, securityMode: v })}
                  ></Dropdown>

                  <Dropdown
                    title="Security Policy"
                    value="None"
                    values={["None", "Basic256", "Basic256Sha256"]}
                    onChange={(v) =>
                      setConfig({ ...config, securityPolicy: v })
                    }
                  ></Dropdown>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={() => createServer()}
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
