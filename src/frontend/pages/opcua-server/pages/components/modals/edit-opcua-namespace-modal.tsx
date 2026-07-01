import { useNotifycationStore } from "../../../../../../frontend/components/notification/notifycationt-service";
import { OpcuaServerNamespaceDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-namespace.dto";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useOpcuaServerBound } from "../../../services/opcua-server.service";
import { DeleteOpcuaItemModal } from "./delete-opcua-item-modal";
import { UpdateOpcuaServerNamespaceDto } from "src/backend/models/opcua-server/dtos/update-opcua-server-namespace.dto";

type Props = {
  data: OpcuaServerNamespaceDto;
  onClose: () => void;
  onUpdate: (dto: OpcuaServerNamespaceDto) => void;
};

export function EditOpcuaNamespaceModal({ data, onClose, onUpdate }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UpdateOpcuaServerNamespaceDto>({
    defaultValues: { name: data.name, url: data.url },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateOpcuaServerNamespaceDto> = (subDto) =>
    updateNamespace(subDto);

  function updateNamespace(subDto: UpdateOpcuaServerNamespaceDto) {
    const dto = (
      Object.keys(dirtyFields) as Array<keyof UpdateOpcuaServerNamespaceDto>
    ).reduce<UpdateOpcuaServerNamespaceDto>((acc, key) => {
      acc[key] = subDto[key];

      return acc;
    }, {});

    window.api.updateOpcuaServerNamespace(data.id, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Namespace ${v.name} updated!`, "success");
        onUpdate(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Namespace ${data.name} can not be updated!`);
      }
    });
  }

  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const { removeNamespace } = useOpcuaServerBound();

  function deleteNamespace() {
    window.api.deleteOpcuaServerNamespace(data.id).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Namespace ${data.name} deleted!`, "success");
        removeNamespace(data.id);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Namespace ${data.name} can not be deleted!`);
      }
    });
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
              <span className="modal-title fs-5">Edit Namespace</span>
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
                  <label className="form-label">Url</label>
                  <input
                    className={`form-control ${errors.url ? "is-invalid" : ""}`}
                    {...register("url", {
                      required: true,
                      pattern: {
                        value:
                          // eslint-disable-next-line no-useless-escape
                          /^https?\:\/\/[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)+(\/[0-9a-zA-Z-.]+)*(\?[0-9a-zA-Z-.]+\=\w+)*$/,
                        message: "no valid url",
                      },
                    })}
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.url ? "" : "d-none"}`}
                  >
                    Not valid url! It schould look like: https://log4plc.com/UA/
                  </div>
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
          type="Namespace"
          onClose={() => {
            setDeleteModal(false);
          }}
          onDelete={() => {
            deleteNamespace();
          }}
        ></DeleteOpcuaItemModal>
      )}
    </>
  );
}
