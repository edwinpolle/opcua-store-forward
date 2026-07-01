import { useState } from "react";
import { CreateOpcuaServerObjectDto } from "../../../../../../backend/models/opcua-server/dtos/create-opcua-server-object.dto";
import { useNotifycationStore } from "../../../../../../frontend/components/notification/notifycationt-service";
import { OpcuaServerObjectDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-object.dto";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  namespaceId: string;
  order: number;
  onClose: () => void;
  onSave: (dto: OpcuaServerObjectDto) => void;
};

export function NewOpcuaObjectModal({
  namespaceId,
  order,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOpcuaServerObjectDto>({
    defaultValues: { name: "Name", object: "Object", order: order },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CreateOpcuaServerObjectDto> = (dto) =>
    createObject(dto);

  function createObject(dto: CreateOpcuaServerObjectDto) {
    window.api.createOpcuaServerObject(namespaceId, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show("OPC UA Server", `New object ${dto.name} created!`, "success");
        onSave(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New object ${dto.name} can not be created!`,
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
              <span className="modal-title fs-5">New Object</span>
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
                    placeholder="Object name"
                  ></input>
                  <div
                    className={`invalid-feedback ${errors.name ? "" : "d-none"}`}
                  >
                    Required
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Object</label>
                  <input
                    className={`form-control ${errors.object ? "is-invalid" : ""}`}
                    {...register("object", { required: true })}
                    placeholder="Description"
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
