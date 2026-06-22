import { useState } from "react";
import { CreateOpcuaServerMethodDto } from "../../../../../../backend/models/opcua-server/dtos/create-opcua-server-method.dto";
import { useNotifycationStore } from "../../../../../../frontend/components/notification/notifycationt-service";
import { OpcuaServerMethodDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-method.dto";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  objectId: string;
  onClose: () => void;
  onSave: (dto: OpcuaServerMethodDto) => void;
};

export function NewOpcuaMethodModal({ objectId, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOpcuaServerMethodDto>({
    defaultValues: { objectId: objectId },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CreateOpcuaServerMethodDto> = (dto) =>
    createMethod(dto);

  function createMethod(dto: CreateOpcuaServerMethodDto) {
    window.api.createOpcuaServerMethod(dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `New Method ${dto.name} created!`, "success");
        onSave(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New Method ${dto.name} can not be created!`,
            "danger",
          );
      }
    });

    return;
  }

  return (
    <>
      <div className="modal-backdrop fade show d-block"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">New Method</span>
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
                  <label className="form-label">Description</label>
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
    </>
  );
}
