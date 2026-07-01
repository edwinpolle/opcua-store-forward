import { OpcuaInputArgumentListItem } from "./opcua-input-argument-list-item";
import { useRef, useState } from "react";
import { NewOpcuaInputArgumentModal } from "./modals/new-opcua-input-argument-modal";
import { useOpcuaServerBound } from "../../services/opcua-server.service";
import { useTooltip } from "../../../../helper/tooltip-helper";
import { EditOpcuaMethodModal } from "./modals/edit-opcua-method-modal";
import { OrderOpcuaInputArgumentModal } from "./modals/order-opcua-input-argument-modal";

type Props = {
  id: string;
};

export function OpcuaMethodListItem({ id }: Props) {
  const [showNewModal, setNewModal] = useState<boolean>(false);
  const [showEditModal, setEditModal] = useState<boolean>(false);
  const [showReorderInputArgumentsModal, setReorderInputArgumentsModal] =
    useState<boolean>(false);

  const newButtonRef = useRef<HTMLButtonElement | null>(null);
  const newInlineButtonRef = useRef<HTMLButtonElement | null>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);
  const orderButtonRef = useRef<HTMLButtonElement | null>(null);

  [newButtonRef, newInlineButtonRef, editButtonRef, orderButtonRef].forEach(
    useTooltip,
  );

  const {
    getInputArgumetsByMethodId,
    setMethod,
    setInputArgument,
    updateInputArgument,
  } = useOpcuaServerBound();

  const method = useOpcuaServerBound((s) => s.getMethodById(id));

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pt-2 ps-2 pb-2">
        <span className="d-flex gap-2 align-items-center">
          <button
            ref={editButtonRef}
            className="btn btn-sm btn-warning"
            onClick={() => setEditModal(true)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit Method"
          >
            <i className="bi bi-pencil"></i>
          </button>
          Method: <strong className="text-dark-emphasis">{method?.name}</strong>
        </span>

        <div className="d-flex align-items-center justify-content-center gap-2">
          <span className="badge text-bg-info rounded-pill">
            {getInputArgumetsByMethodId(id).length !== 1
              ? `${getInputArgumetsByMethodId(id).length} Inputs`
              : `1 Input`}
          </span>

          <button
            ref={newButtonRef}
            className="btn btn-info"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="New Input Argument"
            onClick={() => {
              setNewModal(true);
            }}
          >
            <i className="bi bi-plus"></i>
          </button>

          <button
            ref={orderButtonRef}
            className={`btn btn-info ${getInputArgumetsByMethodId(id).length === 0 ? "disabled" : ""}`}
            data-bs-toogle="tooltip"
            data-bs-placement="top"
            title="Order Input Argument"
            onClick={() => setReorderInputArgumentsModal(true)}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>

      <hr className="divider mt-2 mb-2"></hr>

      {getInputArgumetsByMethodId(id).length === 0 ? (
        <ul className="list-group">
          <li className="list-group-item d-flex gap-2 align-items-center">
            No Input Argument! Add one
            <button
              ref={newInlineButtonRef}
              className="btn btn-info"
              data-bs-toogle="tooltip"
              data-bs-placement="right"
              title="New Input Argument"
              onClick={() => setNewModal(true)}
            >
              <i className="bi bi-plus"></i>
            </button>
          </li>
        </ul>
      ) : (
        <>
          <ul className="list-group">
            {getInputArgumetsByMethodId(id)
              .sort((a, b) => a.order - b.order)
              .map((v) => (
                <li
                  key={v.id}
                  className="list-group-item list-group-item-info d-flex flex-column pt-2 pb-2 ps-2"
                >
                  <OpcuaInputArgumentListItem
                    id={v.id}
                  ></OpcuaInputArgumentListItem>
                </li>
              ))}
          </ul>
        </>
      )}

      {showNewModal && (
        <NewOpcuaInputArgumentModal
          methodId={id}
          order={getInputArgumetsByMethodId(id).length + 1}
          onClose={() => {
            setNewModal(false);
          }}
          onSave={setInputArgument}
        ></NewOpcuaInputArgumentModal>
      )}

      {showEditModal && method && (
        <EditOpcuaMethodModal
          data={method}
          onClose={() => setEditModal(false)}
          onUpdate={setMethod}
        ></EditOpcuaMethodModal>
      )}

      {showReorderInputArgumentsModal && method && (
        <OrderOpcuaInputArgumentModal
          data={getInputArgumetsByMethodId(id)}
          onClose={() => setReorderInputArgumentsModal(false)}
          onUpdate={(dto) => {
            updateInputArgument(dto);
          }}
        ></OrderOpcuaInputArgumentModal>
      )}
    </>
  );
}
