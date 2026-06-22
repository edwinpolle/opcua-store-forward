import { useEffect, useRef, useState } from "react";
import { useNotifycationStore } from "../../../../../../frontend/components/notification/notifycationt-service";
import { CreateOpcuaServerInputArgumentDto } from "../../../../../../backend/models/opcua-server/dtos/create-opcua-server-input-argument.dto";
import { OpcuaServerInputArgumentDto } from "../../../../../../backend/models/opcua-server/dtos/opcua-server-input-argument.dto";
import { SubmitHandler, useForm } from "react-hook-form";
import { DATA_TYPE_OPTIONS } from "./types/data-types-options.types";

type Props = {
  methodId: string;
  order: number;
  onClose: () => void;
  onSave: (dto: OpcuaServerInputArgumentDto) => void;
};

export function NewOpcuaInputArgumentModal({
  methodId,
  order,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateOpcuaServerInputArgumentDto>({
    defaultValues: {
      methodId: methodId,
      name: "New input Argument",
      dataType: DATA_TYPE_OPTIONS[0].label,
      order: order,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<CreateOpcuaServerInputArgumentDto> = (data) => {
    createInputArgument(data);
  };

  function createInputArgument(dto: CreateOpcuaServerInputArgumentDto) {
    window.api.createOpcuaServerInputArgument(dto).then((v) => {
      if (v) {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New Input Argument ${dto.name} created!`,
            "success",
          );
        onSave(v);
        onClose();
      } else {
        useNotifycationStore
          .getState()
          .show(
            "OPC UA Server",
            `New Input Argument ${dto.name} can not be created!`,
            "danger",
          );
      }
    });

    return;
  }

  const dropdownElement = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(DATA_TYPE_OPTIONS[0].label);

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
      <div className="modal-backdrop fade show d-block"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title">New Input Arugment</span>
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
