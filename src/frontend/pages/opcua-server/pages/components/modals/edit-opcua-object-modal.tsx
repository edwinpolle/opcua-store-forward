import { SubmitHandler, useForm } from "react-hook-form";
import { OpcuaServerObjectDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-object.dto";
import { UpdateOpcuaServerObjectDto } from "../../../../../../backend/models/opcua-server/dtos/update-opcua-server-object.dto";
import { useNotifycationStore } from "../../../../../components/notification/notifycationt-service";
import { useOpcuaServerBound } from "../../../services/opcua-server.service";
import { useState } from "react";
import { DeleteOpcuaItemModal } from "./delete-opcua-item-modal";

type Props = {
  data: OpcuaServerObjectDto;
  onClose: () => void;
  onUpdate: (dto: OpcuaServerObjectDto) => void;
};

export function EditOpcuaObjectModal({ data, onClose, onUpdate }: Props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<UpdateOpcuaServerObjectDto>({
    defaultValues: { name: data.name, object: data.object },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateOpcuaServerObjectDto> = (subDto) =>
    updateObject(subDto);

  function updateObject(subDto: UpdateOpcuaServerObjectDto) {
    const dto = (
      Object.keys(dirtyFields) as Array<keyof UpdateOpcuaServerObjectDto>
    ).reduce<UpdateOpcuaServerObjectDto>((acc, key) => {
      (acc as any)[key] = subDto[key];

      return acc;
    }, {});

    window.api.updateOpcuaServerObject(data.id, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Object ${v.name} updated!`, "success");
        onUpdate(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Object ${data.name} can not be updated!`);
      }
    });
  }

  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const { removeObject } = useOpcuaServerBound();

  function deleteObject() {
    window.api.deleteOpcuaServerObject(data.id).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Object ${data.name} deleted!`, "success");
        removeObject(data.id);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `Object ${data.name} can not be deleted!`);
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
              <span className="modal-title fs-5">Edit Object</span>
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
                    className={`form-control ${errors.object ? "is-invalid" : ""}`}
                    {...register("object", { required: true })}
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.object ? "" : "d-none"}`}
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
          type="Object"
          onClose={() => {
            setDeleteModal(false);
          }}
          onDelete={() => {
            deleteObject();
          }}
        ></DeleteOpcuaItemModal>
      )}
    </>
  );
}
