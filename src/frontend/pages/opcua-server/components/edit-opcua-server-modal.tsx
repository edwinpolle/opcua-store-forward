import { SubmitHandler, useForm } from "react-hook-form";
import { OpcuaServerDto } from "../../../../backend/models/opcua-server/dtos/opcua-server.dto";
import { UpdateOpcuaServerDto } from "../../../../backend/models/opcua-server/dtos/update-opcua-server.dto";
import { useState } from "react";
import { useOpcuaServerBound } from "../services/opcua-server.service";
import { DeleteOpcuaItemModal } from "../pages/components/modals/delete-opcua-item-modal";
import { useNotifycationStore } from "../../../components/notification/notifycationt-service";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../../../components/dropdown/dropdown";

type Props = {
  data: OpcuaServerDto;
  onClose: () => void;
  onUpdate: (dto: OpcuaServerDto) => void;
};

export function EditOpcuaServerModal({ data, onClose, onUpdate }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateOpcuaServerDto>({
    defaultValues: {
      name: data.name,
      port: data.port,
      runOnStartup: data.runOnStartup,
      securityMode: data.securityMode,
      securityPolicy: data.securityPolicy,
    },
    mode: "onBlur",
  });

  const { updateOpcuaServer } = useOpcuaServerBound();

  const onSubmit: SubmitHandler<UpdateOpcuaServerDto> = (data) =>
    updateOpcuaServerConfig(data);

  function updateOpcuaServerConfig(dto: UpdateOpcuaServerDto) {
    window.api.updateOpcuaServer(data.id, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Server ${data.name} updated!`, "success");
        updateOpcuaServer(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Server ${data.name} can not be updated!`);
      }
    });
  }

  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const navigate = useNavigate();

  function deleteServer() {
    window.api.deleteOpcuaServer(data.id).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Server ${data.name} deleted!`, "success");
        navigate("/opcua-server");
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Server ${data.name} can not be deleted!`);
      }
    });
    return;
  }

  return (
    <>
      <div
        className={`modal-backdrop fade show d-block ${showDeleteModal ? "d-none" : ""}`}
      ></div>

      <div
        className={`modal fade show d-block ${showDeleteModal ? "d-none" : ""}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">Edit OPC UA Server</span>
              <button className="btn-close" onClick={() => onClose()}></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    autoFocus
                    {...register("name", { required: true })}
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.name ? "" : "d-none"}`}
                  >
                    Required
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Port</label>
                  <input
                    type="number"
                    className={`form-control ${errors.port ? "is-invalid" : ""}`}
                    {...register("port", { required: true })}
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.port ? "" : "d-none"}`}
                  >
                    Required
                  </div>
                </div>

                <div className="form-check mb-2">
                  <label className="form-check-label">Run on Startup</label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    {...register("runOnStartup")}
                  ></input>
                </div>

                <div className="mb-2 d-flex flex-column">
                  <Dropdown
                    title="Security Mode"
                    value={data.securityMode}
                    values={["None", "Sign", "SignAndEncrypt"]}
                    onChange={(v) => {
                      setValue("securityMode", v);
                    }}
                  ></Dropdown>

                  <Dropdown
                    title="Security Policy"
                    value={data.securityPolicy}
                    values={["None", "Basic256", "Basic256Sha256"]}
                    onChange={(v) => setValue("securityPolicy", v)}
                  ></Dropdown>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={() => setDeleteModal(true)}
              >
                <i className="bi bi-trash"></i>
              </button>

              <div className="flex-grow-1"></div>

              <button
                className="btn btn-success"
                onClick={handleSubmit(onSubmit)}
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

      {showDeleteModal && (
        <DeleteOpcuaItemModal
          data={data.name}
          type="OPC UA Server"
          onClose={() => setDeleteModal(false)}
          onDelete={() => deleteServer()}
        ></DeleteOpcuaItemModal>
      )}
    </>
  );
}
