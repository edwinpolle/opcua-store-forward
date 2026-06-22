import { CreateOpcuaServerNamespaceDto } from "../../../../../../backend/models/opcua-server/dtos/create-opcua-server-namespace.dto";
import { useNotifycationStore } from "../../../../../../frontend/components/notification/notifycationt-service";
import { OpcuaServerNamespaceDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-namespace.dto";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  serverId: string;
  onClose: () => void;
  onSave: (dto: OpcuaServerNamespaceDto) => void;
};

export function NewOpcuaNamespaceModal({ serverId, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOpcuaServerNamespaceDto>({
    defaultValues: { serverConfigId: serverId },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CreateOpcuaServerNamespaceDto> = (dto) =>
    createNamespace(dto);

  function createNamespace(dto: CreateOpcuaServerNamespaceDto) {
    window.api.createOpcuaServerNamespace(dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New namespace ${dto.name} created!`,
            "success",
          );
        onSave(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New namespace ${dto.name} can not be created!`,
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
              <span className="modal-title fs-5">New Namespace</span>
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
