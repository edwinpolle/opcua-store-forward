import { SubmitHandler, useForm } from "react-hook-form";
import { useNotifycationStore } from "../../../../../components/notification/notifycationt-service";
import { OpcuaServerMethodDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-method.dto";
import { UpdateOpcuaServerMethodDto } from "../../../../../../backend/models/opcua-server/dtos/update-opcua-server-method.dto";
import { useOpcuaServerBound } from "../../../services/opcua-server.service";
import { useState } from "react";
import { DeleteOpcuaItemModal } from "./delete-opcua-item-modal";

type Props = {
  data: OpcuaServerMethodDto;
  onClose: () => void;
  onUpdate: (dto: OpcuaServerMethodDto) => void;
};

export function EditOpcuaMethodModal({ data, onClose, onUpdate }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOpcuaServerMethodDto>({
    defaultValues: { name: data.name, description: data.description },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateOpcuaServerMethodDto> = (data) =>
    updateMethod(data);

  function updateMethod(dto: UpdateOpcuaServerMethodDto) {
    window.api.updateOpcuaServerMethod(data.id, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Method ${v.name} updated!`, "success");
        onUpdate(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Method ${data.name} can not be updated!`);
      }
    });
  }

  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const { removeMethod } = useOpcuaServerBound();

  function deleteMethod() {
    window.api.deleteOpcuaServerMethod(data.id).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Method ${data.name} deleted!`, "success");
        removeMethod(data.id);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Method ${data.name} can not be deleted!`);
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
              <span className="modal-title fs-5">Edit Method</span>
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
                  <label className="form-label">Namespace</label>
                  <input
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    {...register("description", { required: true })}
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.description ? "" : "d-none"}`}
                  >
                    Required
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
          type="Method"
          onClose={() => {
            setDeleteModal(false);
          }}
          onDelete={() => {
            deleteMethod();
          }}
        ></DeleteOpcuaItemModal>
      )}
    </>
  );
}
