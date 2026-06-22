import { SubmitHandler, useForm } from "react-hook-form";
import { useNotifycationStore } from "../../../../../components/notification/notifycationt-service";
import { OpcuaServerInputArgumentDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-input-argument.dto";
import { UpdateOpcuaServerInputArgumentDto } from "../../../../../../backend/models/opcua-server/dtos/update-opcua-server-input-argument.dto";
import { useEffect, useRef, useState } from "react";
import { DeleteOpcuaItemModal } from "./delete-opcua-item-modal";
import { useOpcuaServerBound } from "../../../services/opcua-server.service";
import { DATA_TYPE_OPTIONS } from "./types/data-types-options.types";

type Props = {
  data: OpcuaServerInputArgumentDto;
  onClose: () => void;
  onUpdate: (dto: OpcuaServerInputArgumentDto) => void;
};

export function EditOpcuaInputArgumentModal({
  data,
  onClose,
  onUpdate,
}: Props) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OpcuaServerInputArgumentDto>({
    defaultValues: {
      name: data.name,
      dataType: data.dataType,
      order: data.order,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<UpdateOpcuaServerInputArgumentDto> = (data) =>
    updateInputArgument(data);

  function updateInputArgument(dto: UpdateOpcuaServerInputArgumentDto) {
    window.api.updateOpcuaServerInputArgument(data.id, dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `Input Argument ${v.name} updated!`,
            "success",
          );
        onUpdate(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `Input Argument ${data.name} can not be updated!`,
          );
      }
    });
  }

  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const { removeInputArgument } = useOpcuaServerBound();

  function deleteInputArgument() {
    window.api.deleteOpcuaServerInputArgument(data.id).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `Input Argument ${data.name} deleted!`,
            "success",
          );
        removeInputArgument(data.id);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `Input Argument ${data.name} can not be deleted!`,
          );
      }
    });
  }

  const dropdownElement = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(data.dataType);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });

    function setDataType(v: string) {
      setValue("dataType", v);
    }

    return (
      <div ref={ref} className="dropdown gap-2 d-flex flex-column">
        <span>Data Type</span>
        <button
          className="btn btn-secondary dropdown-toggle"
          onClick={() => setOpen(true)}
        >
          {selected}
        </button>
        {open && (
          <ul className="dropdown-menu d-block">
            {DATA_TYPE_OPTIONS.map((v) => (
              <li
                key={v.value}
                className="dropdown-item"
                onClick={() => {
                  setSelected(v.label);
                  setOpen(false);
                  setDataType(v.label);
                }}
              >
                {v.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

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
              <span className="modal-title fs-5">Edit Input Argument</span>
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
                {dropdownElement()}
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
          type="Input Argument"
          onClose={() => {
            setDeleteModal(false);
          }}
          onDelete={() => {
            deleteInputArgument();
          }}
        ></DeleteOpcuaItemModal>
      )}
    </>
  );
}
